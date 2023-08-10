import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TableHome from "@/components/dashboard/home/TableHome";
import BarChartNew from "@/components/datavis/BarChart";
import DonutChartNew from "@/components/datavis/DonutChartNew";
import Indicator from "@/components/datavis/Indicator";
import { maxDate } from "@/lib/date";
import { Legend, Text, Title } from "@tremor/react";
import axios from "axios";
import { getServerSession } from "next-auth";

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
    id: "ae6178c3-755f-4437-9d71-34c0b9401d2f",
    createdAt: "2023-07-29T03:08:32.855Z",
    updatedAt: "2023-07-29T03:08:32.855Z",
    status: "NOT_STARTED",
    name: "Task 4",
    description: "Descrição da Task 4",
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
    status: "NOT_STARTED",
    due: "2023-11-17T03:00:00.000Z",
  },
  {
    id: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
    name: "Certification 1",
    status: "NOT_STARTED",
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

const Page = async () => {
  // const session = await getServerSession(authOptions);

  // const req = await axios.get("http://localhost:3000/api/home", {
  //   headers: { "session-id": session?.user.id },
  // });

  // const { taskCountData, certificationData, lastTasksData } = req.data;

  console.log(lastTasksData);
  console.log(certificationData);

  const certificationCount = certificationData.length;

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
    <div className="flex w-full bg-red-50 md:ml-52 md:h-full">
      <div className="my-2 w-full px-5 md:m-8">
        <Title className="text-2xl font-bold">Bem vindo, Gustavo!</Title>
        {/* <Title className="text-2xl font-bold">Bem vindo, {session!.user!.name}!</Title> */}
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
                data={certificationCount}
              >
                <Legend
                  className="mt-3"
                  categories={["Completo", "Em andamento", "Não iniciado"]}
                  colors={["green", "yellow", "red"]}
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
          // refazer dps quando tiver comandos - transferir os <p> para config
          <div>
            <p>Você não tem nenhuma certificação ativa.</p>
            <p>Crie uma certificação.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
