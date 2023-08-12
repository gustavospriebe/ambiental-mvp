import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonNewTask from "@/components/ButtonNewTask";
import ModalCertifications from "@/components/certifications/ModalCertifications";
import TableCertification from "@/components/certifications/TableCertification";
import Indicator from "@/components/datavis/Indicator";
import { getData } from "@/lib/Queries";
import { isBeforeOrSameNow, minDate } from "@/lib/date";
import { Card, List, ListItem, Text, Title, Tracker } from "@tremor/react";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const sessionId = session!.user.id;

  const { certificationData } = await getData("certifications");

  const certificationDataFormatted = certificationData.map(
    (item: {
      id: string;
      name: string;
      _count: { tasks: number };
      status: string;
      due: string | null;
    }) => ({
      id: item.id,
      name: item.name,
      count: item._count.tasks,
      status:
        item.status === "COMPLETED"
          ? "Completo"
          : item.status === "STARTED"
          ? "Em andamento"
          : "Não iniciado",
      color:
        item.status === "COMPLETED"
          ? "emerald"
          : item.status === "STARTED"
          ? "yellow"
          : "rose",
      due: item.due,
    }),
  );

  const lateCertification = certificationDataFormatted.filter(
    (cert: { status: string; due: string }) =>
      cert.status !== "Completo" && cert.due && isBeforeOrSameNow(cert.due),
  );

  const completedCertication = certificationDataFormatted.filter(
    (cert: { status: string }) => cert.status === "Completo",
  );

  const trackerCertification = certificationDataFormatted
    .map((item: { color: string; status: string }) => ({
      color: item.color,
      tooltip: item.status,
    }))
    .sort((a: { color: string }, b: { color: string }) => {
      const colorOrder: Record<string, number> = {
        emerald: 0,
        yellow: 1,
        rose: 2,
      };

      return colorOrder[a.color] - colorOrder[b.color];
    });

  const nextCertificationDue = minDate(
    certificationDataFormatted.filter(
      (item: { due: string; status: string }) =>
        item.due && dayjs(item.due) > dayjs() && item.status !== "Completo",
    ),
  );

  return (
    <div className="flex w-full bg-red-50 md:ml-52 md:h-screen">
      <div className="my-2 w-full px-5 md:m-8">
        <Title className="text-2xl font-bold">Certificações</Title>
        <Text className="mt-2">
          Confira as atualizações das suas certificações no dashboard abaixo.
        </Text>
        <div className="mt-6 flex flex-col space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Indicator
              data={`${completedCertication.length}/${certificationDataFormatted.length} completos`}
              title="Qtd. de Certificações"
            >
              <div className=" flex justify-end">
                <Text>
                  {Math.round(
                    (completedCertication.length /
                      certificationDataFormatted.length) *
                      100,
                  )}
                  %
                </Text>
              </div>
              <Tracker data={trackerCertification} />
            </Indicator>
            <Indicator
              data={lateCertification.length}
              title="Certificações em atraso"
            >
              <List>
                {lateCertification.map((item: { name: string }) => (
                  <ListItem key={item.name}>
                    <span>{item.name}</span>
                  </ListItem>
                ))}
              </List>
            </Indicator>
            <Indicator
              className="space-y-8"
              data={nextCertificationDue}
              title="Próx. Vencimento de Certificação"
            />
          </div>
          <div className="h-full w-full space-y-6">
            <Card className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <Title>Tabela de Certificações</Title>
                <ModalCertifications sessionId={sessionId}/>
                {/* <ButtonNewTask sessionId={sessionId}>
                  Criar nova Certificação
                </ButtonNewTask> */}
              </div>
              <TableCertification
                certificationDataFormatted={certificationDataFormatted}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
