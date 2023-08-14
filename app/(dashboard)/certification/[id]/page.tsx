import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TableTask from "@/components/certifications/TableTask";
import Indicator from "@/components/datavis/Indicator";
import { getDataWithParams } from "@/lib/Queries";
import { formattedDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { STATUS } from "@prisma/client";
import { Badge, Card, Metric, ProgressBar, Text, Title } from "@tremor/react";
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
      description: string;
      due: Date;
    }) => ({
      id: item.id,
      name: item.name,
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

  console.log(taskformatted);

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
        <p>{params.id}</p>
        {certificationData.tasks.length ? (
          <div className="mt-6 flex flex-col space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Indicator
                data={`oi completos`}
                title="Qtd. de Certificações"
              ></Indicator>
              <Indicator data={`oi`} title="Certificações em atraso">
                oi
              </Indicator>
              <Indicator
                className="space-y-8"
                data={`oi`}
                title="Próx. Vencimento de Certificação"
              />
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
            <p>Você não tem nenhuma certificação ativa.</p>
            {/* <ModalCertifications sessionId={sessionId} /> */}
          </div>
        )}
      </div>
      {/* <p>Indicadores da certificação</p>
      <p>Tabela com tasks e ordenação e criação de tasks</p> */}
    </div>
  );
};

// Qtd task em atraso
// Tasks feitas / Tasks em aberto
// Prazo da Certificação
// Botão nova task
// tabela com as tarefas com exclusão   --- talvez edição
// Ordenação
// grafico de dias que as tasks foram completadas (se 5 foram completadas dias x, linha vai no 5 e por ai vai ...)

{
  /* <Indicator
                title="Vencimento próxima Certificação"
                data={maxCertificationDue}
              /> */
}

export default Certification;
