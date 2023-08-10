// card Certificações em atraso
// card Certificações tiradas / Certificações em aberto
// card vencimento mais proxima certificação
// tabela com certificações com exclusão   ---  talvez edição
// Botao nova certificação
// tabela com tasks e suas infos e botoes de update create delete

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TableCertification from "@/components/certifications/TableCertification";
import Indicator from "@/components/datavis/Indicator";
import {
  formattedDate,
  isAfterNow,
  isBeforeOrSameNow,
  maxDate,
  minDate,
} from "@/lib/date";
import { Text, Tracker, Title, List, ListItem } from "@tremor/react";
import axios from "axios";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const req = await axios.get("http://localhost:3000/api/certifications", {
    headers: { "session-id": session?.user.id },
  });

  const { certificationData } = req.data;

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
          <div className="flex gap-2">
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
            <TableCertification
              certificationDataFormatted={certificationDataFormatted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
