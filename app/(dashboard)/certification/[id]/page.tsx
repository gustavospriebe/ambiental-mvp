import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ModalTask from "@/components/certifications/ModalTask";
import TableTask from "@/components/certifications/TableTask";
import Indicator from "@/components/datavis/Indicator";
import { getDataWithParams } from "@/lib/Queries";
import { formattedDate, isBeforeOrSameNow } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Task } from "@prisma/client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AreaChart,
  BarList,
  Card,
  ListItem,
  Metric,
  ProgressBar,
  Text,
  Title,
} from "@tremor/react";
import { getServerSession } from "next-auth";

interface CertificationProps {
  params: { id: string };
}

const Certification = async ({ params }: CertificationProps) => {
  const session = await getServerSession(authOptions);

  const sessionId = session!.user.id;
  const certId = params.id;

  const { certificationData } = await getDataWithParams(
    "certification",
    sessionId,
    certId,
  );

  const completedTasks = certificationData.tasks.filter(
    (item: { status: string }) => item.status === "COMPLETED",
  );

  const progress = Math.round(
    (completedTasks.length / certificationData.tasks.length) * 100,
  );

  const taskformatted = certificationData.tasks.map(
    (item: {
      id: string;
      name: string;
      status: string;
      updatedAt: Date;
      description: string;
      due: Date;
    }) => ({
      id: item.id,
      name: item.name,
      updatedAt: item.updatedAt,
      status:
        item.status === "COMPLETED"
          ? "Completo"
          : item.status === "STARTED"
          ? "Em andamento"
          : "Não iniciado ",
      color:
        item.status === "COMPLETED"
          ? "emerald"
          : item.status === "STARTED"
          ? "yellow"
          : "rose",
      description: item.description,
      due: item.due,
    }),
  );

  const labels = [...new Set(taskformatted.map((task: Task) => task.status))];

  const countPerStatus = labels.map((status) => ({
    name: status,
    value: taskformatted.filter(
      (item: { status: string }) => item.status === status,
    ).length,
  }));

  const latePerDate = taskformatted
    .filter(
      (item: { status: string; due: string }) =>
        item.status !== "Completo" && isBeforeOrSameNow(item.due),
    )
    .map((item: { name: string; due: Date }) => ({
      name: item.name,
      due: formattedDate(item.due),
    }));

  const completedPerDate = taskformatted
    .filter((item: { status: string }) => item.status === "Completo")
    .map((item: { updatedAt: string | Date | null }) => ({
      updatedAt: formattedDate(item.updatedAt),
    }));

  // @ts-ignore
  const counts: string[string] = {};

  completedPerDate.forEach(
    ({ updatedAt }: { updatedAt: string }) =>
      (counts[updatedAt] = (counts[updatedAt] || 0) + 1),
  );

  const completedBarChart = Object.entries(counts).map(([date, value]) => ({
    date,
    value,
  }));

  console.log(completedBarChart);

  return (
    <div
      className={cn(
        "flex w-full bg-red-50 md:ml-52",
        certificationData.tasks.length ? "h-full" : "h-screen",
      )}
    >
      <div className="my-2 w-full px-5 md:m-8">
        <Title className="text-2xl font-bold">Certificação</Title>
        <Text className="mt-2">
          Confira as atualizações da sua certificação no dashboard abaixo.
        </Text>
        {certificationData.tasks.length ? (
          <div className="mt-6 flex flex-col space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Indicator
                data={certificationData.tasks.length}
                title="Qtd. de Tasks"
              >
                <Accordion className="mt-6">
                  <AccordionHeader>
                    <div className="space-y-2">
                      <Text>Qtd. por Status</Text>
                    </div>
                  </AccordionHeader>
                  <AccordionBody>
                    {/* @ts-expect-error */}
                    <BarList data={countPerStatus} />
                  </AccordionBody>
                </Accordion>
              </Indicator>
              <Indicator
                data={latePerDate.length}
                title="Certificações em atraso"
              >
                {latePerDate.map((item: { name: string; due: string }) => (
                  <ListItem className="mt-6" key={item.name}>
                    <span>{item.name}</span>
                    <span>{item.due}</span>
                  </ListItem>
                ))}
              </Indicator>
              <Card className="flex flex-col space-y-2">
                <Text>Tasks completadas por dia</Text>
                <AreaChart
                  className="mt-4 h-52"
                  data={completedBarChart}
                  index="date"
                  categories={["value"]}
                  showYAxis={false}
                  showGridLines={false}
                  colors={["indigo"]}
                />
              </Card>
            </div>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <Title>{certificationData.name}</Title>
                  <Text className="mt-2">{certificationData.description}</Text>
                </div>
                <div className="flex flex-col items-center">
                  Vencimento
                  <Metric>{formattedDate(certificationData?.due)}</Metric>
                </div>
              </div>
              <ProgressBar
                value={progress}
                color="teal"
                className="mt-3"
                label={`${String(progress)}%`}
                tooltip="Progresso da certificação"
              />
            </Card>
            <TableTask
              sessionId={sessionId}
              certId={certId}
              taskformatted={taskformatted}
            />
          </div>
        ) : (
          <div className="mt-12 flex w-full flex-col items-center justify-center space-y-6">
            <p>A certificação {certificationData.name} não tem tasks.</p>
            <ModalTask sessionId={sessionId} certId={certId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;
