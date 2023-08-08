import Greetings from "@/components/dashboard/home/Greetings";
import GreetingsSkeleton from "@/components/dashboard/home/GreetingsSkeleton";
import BarChartNew from "@/components/datavis/BarChart";
import DonutChartNew from "@/components/datavis/DonutChartNew";
import Indicator from "@/components/datavis/Indicator";
import { Separator } from "@/components/ui/separator";
import { maxDate } from "@/lib/date";
import { Grid, Title, Text, Metric, Flex } from "@tremor/react";
import { Suspense } from "react";

const taskCountData = [
  {
    _count: { name: 4 },
    status: "COMPLETED",
    certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
  },
  {
    _count: { name: 3 },
    status: "STARTED",
    certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
  },
  {
    _count: { name: 3 },
    status: "NOT_STARTED",
    certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
  },
  {
    _count: { name: 3 },
    status: "STARTED",
    certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
  },
  {
    _count: { name: 5 },
    status: "COMPLETED",
    certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
  },
  {
    _count: { name: 3 },
    status: "NOT_STARTED",
    certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
  },
  {
    _count: { name: 3 },
    status: "NOT_STARTED",
    certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
  },
  {
    _count: { name: 3 },
    status: "COMPLETED",
    certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
  },
  {
    _count: { name: 2 },
    status: "STARTED",
    certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
  },
  {
    _count: { name: 6 },
    status: "NOT_STARTED",
    certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
  },
  {
    _count: { name: 1 },
    status: "NOT_STARTED",
    certificationId: "a4e67efe-d62b-41cf-b441-cbdc0de92c38",
  },
  {
    _count: { name: 4 },
    status: "COMPLETED",
    certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
  },
  {
    _count: { name: 3 },
    status: "STARTED",
    certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
  },
  {
    _count: { name: 4 },
    status: "NOT_STARTED",
    certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
  },
  {
    _count: { name: 2 },
    status: "STARTED",
    certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
  },
  {
    _count: { name: 2 },
    status: "COMPLETED",
    certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
  },
];

const lastTasksData = [
  {
    id: "60bac779-2105-4a9b-8e8e-ba057b0b88f4",
    createdAt: "2023-08-02T05:56:28.464Z",
    updatedAt: "2023-08-02T05:56:28.464Z",
    status: "NOT_STARTED",
    name: "testamdp",
    description: null,
    due: null,
    deleted: false,
    certificationId: "a4e67efe-d62b-41cf-b441-cbdc0de92c38",
    companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
  },
  {
    id: "412df129-1b66-42fb-852f-b9840fd252d9",
    createdAt: "2023-07-29T03:08:32.855Z",
    updatedAt: "2023-07-29T03:08:32.855Z",
    status: "COMPLETED",
    name: "Task 3",
    description: "Descrição da Task 3",
    due: null,
    deleted: false,
    certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
    companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
  },
  {
    id: "c18ce7d1-053c-4354-8c55-26de054051a4",
    createdAt: "2023-07-29T03:08:32.855Z",
    updatedAt: "2023-07-29T03:08:32.855Z",
    status: "NOT_STARTED",
    name: "Task 0",
    description: "Descrição da Task 0",
    due: null,
    deleted: false,
    certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
    companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
  },
  {
    id: "b800d0e9-34a8-46fa-b627-dbfc520aac44",
    createdAt: "2023-07-29T03:08:32.855Z",
    updatedAt: "2023-07-29T03:08:32.855Z",
    status: "STARTED",
    name: "Task 1",
    description: "Descrição da Task 1",
    due: null,
    deleted: false,
    certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
    companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
  },
  {
    id: "3f63eb92-b2e4-433e-8e19-c39c604e3563",
    createdAt: "2023-07-29T03:08:32.855Z",
    updatedAt: "2023-07-29T03:08:32.855Z",
    status: "NOT_STARTED",
    name: "Task 2",
    description: "Descrição da Task 2",
    due: null,
    deleted: false,
    certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
    companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
  },
];

const certificationData = [
  {
    id: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
    name: "Certification 0",
    status: "STARTED",
    due: "2023-11-17T03:00:00.000Z",
  },
  {
    id: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
    name: "Certification 1",
    status: "COMPLETED",
    due: "2023-11-17T03:00:00.000Z",
  },
  {
    id: "1b919aea-823e-42b2-ace1-3360b41f2d52",
    name: "Certification 2",
    status: "NOT_STARTED",
    due: "2023-11-17T03:00:00.000Z",
  },
  {
    id: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
    name: "Certification 3",
    status: "NOT_STARTED",
    due: "2023-11-17T03:00:00.000Z",
  },
  {
    id: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
    name: "Certification 4",
    status: "NOT_STARTED",
    due: "2023-11-17T03:00:00.000Z",
  },
  {
    id: "94a7cb62-a399-4f24-836f-155e8634fc77",
    name: "teste",
    status: "NOT_STARTED",
    due: null,
  },
  {
    id: "a4e67efe-d62b-41cf-b441-cbdc0de92c38",
    name: "teste2",
    status: "NOT_STARTED",
    due: null,
  },
];

export default async function Page() {
  // const session = await getServerSession(authOptions);

  // const req = await axios.get("http://localhost:3000/api/home", {
  //     headers: { "session-id": session?.user.id },
  // });

  // const { taskCountData, certificationData, lastTasksData } = req.data;

  // console.log(req.data);

  const certificationCount = certificationData.length;

  const maxCertificationDue = maxDate(certificationData.map((x) => x?.due));

  const certificationGraph = certificationData.map(
    (cert: { status: string }) => ({
      ...cert,
      status:
        cert.status === "COMPLETED"
          ? "Completo"
          : cert.status === "STARTED"
          ? "Em andamento"
          : "Não iniciado",
    }),
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

  // tabela com ultimas 5 tasks e suas infos

  return (
    <div className="flex w-full bg-red-50 md:ml-52 md:h-full">
      <div className="mx-5 my-2 w-full md:m-8">
        <Title className="text-2xl font-bold">Bem vindo, Gustavo!</Title>
        {/* <Title className="text-2xl font-bold">Bem vindo, {session!.user!.name}!</Title> */}
        <Text className="mt-2">
          Confira as atualizações das suas certificações no dashboard abaixo.
        </Text>
        {certificationData.length ? (
          <div className="mt-6 space-y-4">
            <div className="w-full h-full items-stretch gap-6 space-y-6 sm:flex sm:space-y-0">
              <Indicator title="Total de Tasks" data={allTaskCount}>
                <BarChartNew taskData={taskData} />
              </Indicator>
              <Indicator
                title="Total de Certificações"
                data={certificationCount}
              >
                <DonutChartNew certificationGraph={certificationGraph} />
              </Indicator>
              {/* <Indicator
                title="Vencimento próxima Certificação"
                data={maxCertificationDue}
                certificationGraph={certificationGraph}
              /> */}
            </div>
            {/* <div className="h-full w-full items-stretch gap-6 space-y-6 sm:flex sm:space-y-0">
              <BarChartNew taskData={taskData} />
              <DonutChartNew certificationGraph={certificationGraph} />
            </div> */}
            {/* Componentizar Tabela */}
            <div className="flex flex-col">
              {lastTasksData.map((data) => (
                <p key={data.id}>{data.name}</p>
              ))}
            </div>
          </div>
        ) : (
          // refazer dps quando tiver comandos - transferir os <p> para config
          <div>
            <p>Você não tem nenhuma certificação ativa.</p>
            <p>Crie uma certificação.</p>
          </div>
        )}
      </div>
    </div>
  );
}
