import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ModalCertifications from "@/components/certifications/ModalCertifications";
import TableHome from "@/components/dashboard/home/TableHome";
import BarChartNew from "@/components/datavis/BarChart";
import DonutChartNew from "@/components/datavis/DonutChartNew";
import Indicator from "@/components/datavis/Indicator";
import { getData } from "@/lib/Queries";
import { cn } from "@/lib/utils";
import { Legend, Text, Title } from "@tremor/react";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const sessionId = session!.user.id;

  const { taskCountData, certificationData, lastTasksData } = await getData(
    "home",
  );

  const taskData = taskCountData.map(
    (task: {
      _count: { name: number };
      certificationId: string;
      status: string;
    }) => ({
      count: task._count.name,
      certification: certificationData.find(
        (cert: { id: string }) => cert.id === task.certificationId,
      )!.name,
      status:
        task.status === "COMPLETED"
          ? "Completo"
          : task.status === "STARTED"
          ? "Em andamento"
          : "Não iniciado",
    }),
  );

  const allTaskCount = taskData.reduce(
    (acc: number, task: { count: number }) => (acc += task.count),
    0,
  );

  return (
    <div
      className={cn(
        "flex w-full bg-red-50 md:ml-52",
        certificationData.length ? "h-full" : "h-screen",
      )}
    >
      <div className="my-2 w-full px-5 md:m-8">
        <Title className="text-2xl font-bold">
          Bem vindo, {session!.user!.name}!
        </Title>
        <Text className="mt-2">
          Confira as atualizações das suas certificações no dashboard abaixo.
        </Text>
        {certificationData.length ? (
          <div className="mt-6 flex flex-col space-y-6">
            <div className="h-full w-full gap-5 space-y-6 sm:flex sm:items-stretch sm:space-y-0">
              <Indicator
                className="md:w-2/3"
                title="Total de Tasks"
                data={allTaskCount}
              >
                <BarChartNew taskData={taskData} />
              </Indicator>
              <Indicator
                className="sm:flex sm:flex-col md:w-1/3"
                title="Total de Certificações"
                data={certificationData.length}
              >
                <Legend
                  className="mt-3"
                  categories={["Completo", "Em andamento", "Não iniciado"]}
                  colors={["emerald", "yellow", "rose"]}
                />
                <DonutChartNew certificationData={certificationData} />
              </Indicator>
            </div>
            <TableHome
              lastTasksData={lastTasksData}
              certificationData={certificationData}
            />
          </div>
        ) : (
          <div className="mt-12 flex w-full flex-col items-center justify-center space-y-6">
            <p>Você não tem nenhuma certificação ativa.</p>
            <ModalCertifications sessionId={sessionId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
