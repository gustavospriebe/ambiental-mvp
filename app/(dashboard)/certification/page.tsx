// card Certificações em atraso
// card Certificações tiradas / Certificações em aberto
// card vencimento mais proxima certificação
// tabela com certificações com exclusão   ---  talvez edição
// Botao nova certificação
// tabela com tasks e suas infos e botoes de update create delete

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { formattedDate } from "@/lib/date";
import { Text, Title } from "@tremor/react";
import axios from "axios";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const req = await axios.get("http://localhost:3000/api/certifications", {
    headers: { "session-id": session?.user.id },
  });

  const { certificationData } = req.data;

  const certificationDataFormatted = certificationData.map(
    (item: {
      name: string;
      description: string;
      _count: { tasks: number };
      status: string;
      createdAt: string;
      due: string | null;
    }) => ({
      name: item.name,
      description: item.description,
      count: item._count.tasks,
      status:
        item.status === "COMPLETED"
          ? "Completo"
          : item.status === "STARTED"
          ? "Em andamento"
          : "Não iniciado",
      createdAt: formattedDate(item.createdAt),
      due: item.due !== null ? formattedDate(item.due) : "Sem data",
    }),
  );

  console.log(certificationDataFormatted);

  return (
    <div className="flex w-full bg-red-50 md:ml-52 md:h-screen">
      <div className="my-2 w-full px-5 md:m-8">
        <Title className="text-2xl font-bold">Certificações</Title>
        <Text className="mt-2">
          Confira as atualizações das suas certificações no dashboard abaixo.
        </Text>
        <div className="mt-6 flex flex-col space-y-6">
          <div className="h-full w-full gap-5 space-y-6 sm:flex sm:items-stretch sm:space-y-0">
            oi
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

// const maxCertificationDue = maxDate(
//   certificationData.map((x: { due: string }) => x?.due),
// );
