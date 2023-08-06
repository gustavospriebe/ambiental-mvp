import Greetings from "@/components/dashboard/home/Greetings";
import GreetingsSkeleton from "@/components/dashboard/home/GreetingsSkeleton";
import BarChart from "@/components/datavis/BarChart";
import DonutChart from "@/components/datavis/DonutChart";
import Indicator from "@/components/datavis/Indicator";
import { maxDate } from "@/lib/date";
import { Suspense } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
        })
    );

    const taskData = taskCountData.map(
        (task: {
            _count: { name: any };
            certificationId: string;
            status: string;
        }) => ({
            count: task._count.name,
            certification: certificationData.find(
                (cert: { id: string }) => cert.id === task.certificationId
            )!.name,
            status:
                task.status === "COMPLETED"
                    ? "Completo"
                    : task.status === "STARTED"
                    ? "Em andamento"
                    : "Não iniciado",
        })
    );

    const allTaskCount = taskData.reduce(
        (acc: number, task: { count: number }) => (acc += task.count),
        0
    );

    // tabela com ultimas 5 tasks e suas infos

    return (
        <div className="flex md:h-full w-full md:ml-56 bg-red-50">
            <div className="md:m-10 m-5 w-full">
                <Suspense fallback={<GreetingsSkeleton />}>
                    {/* <Greetings name={session!.user!.name} /> */}
                    <Greetings name="Gustavo" />
                </Suspense>
                {certificationData.length ? (
                    <div className="space-y-4">
                        <div className="sm:flex space-y-4 sm:space-y-0 sm:gap-2">
                            <Indicator
                                title="Total de Tasks"
                                data={allTaskCount}
                            />
                            <Indicator
                                title="Total de Certificações"
                                data={certificationCount}
                            />
                            <Indicator
                                title="Vencimento próxima Certificação"
                                data={maxCertificationDue}
                            />
                        </div>
                        <div className="w-full items-center sm:flex gap-4 space-y-4 sm:space-y-0">
                            <BarChart className="" taskData={taskData} />
                            <DonutChart
                                className=""
                                certificationGraph={certificationGraph}
                            />
                        </div>
                        {/* Componentizar Tabela */}
                        <div className="flex flex-col">
                            {/* @ts-ignore */}
                            {lastTasksData.map((data) => (
                                <p key={data.id}>{data.name}</p>
                            ))}
                        </div>
                    </div>
                ) : (
                    // refazer dps quando tiver comandos
                    <div>
                        <p>Você não tem nenhuma certificação ativa.</p>
                        <p>Crie uma certificação.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
