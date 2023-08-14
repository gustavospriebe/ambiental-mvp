import { cn } from "@/lib/utils";
import { Title, Text } from "@tremor/react";

interface CertificationProps {
  params: { id: string };
}

const Certification = ({ params }: CertificationProps) => {
  return (
    <div
      className={cn(
        "flex w-full bg-red-50 md:ml-52",
        // certificationData.length ? "h-full" : "h-screen",
      )}
    >
      <div className="my-2 w-full px-5 md:m-8">
        <Title className="text-2xl font-bold">Nome da Certificação x</Title>
        <Text className="mt-2">
          Confira as atualizações da sua certificação no dashboard abaixo.
        </Text>
        <p>{params.id}</p>
      </div>
      {/* <p>Intro que tem em todas as paginas</p>
      <p>Indicadores da certificação</p>
      <p>
        Detalhes da certificação = Descrição / Quando foi criado / Vencimento /
        afins
      </p>
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
