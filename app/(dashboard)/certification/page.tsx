// card Certificações em atraso
// card Certificações tiradas / Certificações em aberto
// card vencimento mais proxima certificação
// tabela com certificações com exclusão   ---  talvez edição
// Botao nova certificação

import { Title, Text } from "@tremor/react";

// tabela com tasks e suas infos e botoes de update create delete

const Page = () => {
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
