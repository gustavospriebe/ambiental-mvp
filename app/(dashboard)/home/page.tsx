import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Certification } from "@prisma/client";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import axios from "axios";
import BarChart from "@/components/BarChart";

const mockCertificationData = [
    {
        id: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        createdAt: "2023-07-29T03:08:29.047Z",
        updatedAt: "2023-07-29T03:08:29.047Z",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
        name: "Certification 0",
        description: "Descrição da Certificação 0",
        due: "2023-11-17T03:00:00.000Z",
        deleted: false,
        status: "NOT_STARTED",
    },
    {
        id: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        createdAt: "2023-07-29T03:08:29.047Z",
        updatedAt: "2023-07-29T03:08:29.047Z",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
        name: "Certification 1",
        description: "Descrição da Certificação 1",
        due: "2023-11-17T03:00:00.000Z",
        deleted: false,
        status: "NOT_STARTED",
    },
    {
        id: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        createdAt: "2023-07-29T03:08:29.047Z",
        updatedAt: "2023-07-29T03:08:29.047Z",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
        name: "Certification 2",
        description: "Descrição da Certificação 2",
        due: "2023-11-17T03:00:00.000Z",
        deleted: false,
        status: "NOT_STARTED",
    },
    {
        id: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        createdAt: "2023-07-29T03:08:29.047Z",
        updatedAt: "2023-07-29T03:08:29.047Z",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
        name: "Certification 3",
        description: "Descrição da Certificação 3",
        due: "2023-11-17T03:00:00.000Z",
        deleted: false,
        status: "NOT_STARTED",
    },
    {
        id: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
        createdAt: "2023-07-29T03:08:29.047Z",
        updatedAt: "2023-07-29T03:08:29.047Z",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
        name: "Certification 4",
        description: "Descrição da Certificação 4",
        due: "2023-11-17T03:00:00.000Z",
        deleted: false,
        status: "NOT_STARTED",
    },
    {
        id: "94a7cb62-a399-4f24-836f-155e8634fc77",
        createdAt: "2023-08-02T05:54:08.160Z",
        updatedAt: "2023-08-02T05:54:08.160Z",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
        name: "teste",
        description: "teste2313123",
        due: null,
        deleted: false,
        status: "NOT_STARTED",
    },
    {
        id: "a4e67efe-d62b-41cf-b441-cbdc0de92c38",
        createdAt: "2023-08-02T05:56:28.464Z",
        updatedAt: "2023-08-02T05:56:28.464Z",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
        name: "teste2",
        description: "teste231sdf3123",
        due: null,
        deleted: false,
        status: "NOT_STARTED",
    },
];

const mockCompanyData = {
    id: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    createdAt: "2023-07-29T03:08:29.047Z",
    updatedAt: "2023-07-29T03:32:42.893Z",
    name: "Tinturaria",
    sector: "Têxtil",
    email: "user@email.com",
    password: "$2b$10$2lF0pxubvSj2RZixu95NA.0/6i1Wm.DjoVSse1GfX/TZ8voE6cbPO",
};

const mockTaskData = [
    {
        id: "febc6846-a30b-415b-8c8d-f9fd1402d366",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 0",
        description: "Descrição da Task 0",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "3bf21786-61ac-45ad-8f04-6151ee63c584",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 1",
        description: "Descrição da Task 1",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "fdb39b18-8351-42ab-b52b-b4148dd1ac61",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 2",
        description: "Descrição da Task 2",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "e9977520-f9d0-4f25-b5a0-23a4d8c7fe5d",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 3",
        description: "Descrição da Task 3",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "90a69ed0-8f4a-4935-8dcd-72ebfee05396",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 4",
        description: "Descrição da Task 4",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "4afc38bd-330b-4b64-9bf3-3c6625390538",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 5",
        description: "Descrição da Task 5",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "384407c2-38fb-4258-9a1b-a578c9b5caee",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 6",
        description: "Descrição da Task 6",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "896dbdaa-19d1-405f-b292-6d3e4ea71c06",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 7",
        description: "Descrição da Task 7",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "5eb0d6b6-0c65-4268-ad70-4bfaddb8209a",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 8",
        description: "Descrição da Task 8",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "48cb7cbd-bc7f-4d26-81e1-20581db5e6a1",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 9",
        description: "Descrição da Task 9",
        due: null,
        deleted: false,
        certificationId: "e7b8a1cd-678d-450f-b5eb-2297ca4b0c49",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "232ae02f-357e-4e98-aefe-4fc97bd098a7",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 0",
        description: "Descrição da Task 0",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "33ed5bf1-a22e-4c22-997f-86af0f8ed85e",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 1",
        description: "Descrição da Task 1",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "d576f571-f5e5-4cb2-88de-0e56f022609a",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 2",
        description: "Descrição da Task 2",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "b1291c5d-a8ff-4a8d-a4a3-f94a33f78055",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 3",
        description: "Descrição da Task 3",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "43974027-590b-4074-978d-801dc8668811",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 4",
        description: "Descrição da Task 4",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "a576dd48-7814-4fb2-b8fc-2716fcba7148",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 5",
        description: "Descrição da Task 5",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "a7c3926e-c205-4742-946d-80be849e5a6f",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 6",
        description: "Descrição da Task 6",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "b9bcc7aa-dab1-4c8d-96cc-ecbd093f9af1",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 7",
        description: "Descrição da Task 7",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "4710fa87-73d1-4a4b-8e18-e494752b6d27",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 8",
        description: "Descrição da Task 8",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "0eb98891-7d44-4741-be92-49fada47c88f",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 9",
        description: "Descrição da Task 9",
        due: null,
        deleted: false,
        certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "c28f248e-f39b-45ad-83c4-735fc90747a9",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 0",
        description: "Descrição da Task 0",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "721aceed-0f08-4701-97de-3d53ae37b257",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 1",
        description: "Descrição da Task 1",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "704200c4-b879-4608-bd39-b339064942fd",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 2",
        description: "Descrição da Task 2",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "3d76e37d-73bc-49ab-a702-d91c7fe797db",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 3",
        description: "Descrição da Task 3",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "1faa3d25-0500-4564-a939-8df2605ae7b5",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 4",
        description: "Descrição da Task 4",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "9799055e-1dc9-4fe2-92fa-d8f432fe4338",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 5",
        description: "Descrição da Task 5",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "1077760d-58ab-480e-ab9d-878544298828",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 6",
        description: "Descrição da Task 6",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "ace607b6-3e15-44ea-b7ca-d0b2a773834c",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 7",
        description: "Descrição da Task 7",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "0b2e25b1-afd3-484e-9ed9-d94cc6eb498b",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 8",
        description: "Descrição da Task 8",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "b1596abf-9807-4b91-8a09-832e4b9599a5",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 9",
        description: "Descrição da Task 9",
        due: null,
        deleted: false,
        certificationId: "f4348674-6fcc-479b-b374-bdd3cd94ddad",
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
    {
        id: "021a39db-896d-48ee-a841-871fdac06c96",
        createdAt: "2023-07-29T03:08:32.855Z",
        updatedAt: "2023-07-29T03:08:32.855Z",
        status: "NOT_STARTED",
        name: "Task 5",
        description: "Descrição da Task 5",
        due: null,
        deleted: false,
        certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "a5c65808-6b9b-4319-8fb6-50fa6ec680bd",
        createdAt: "2023-07-29T03:08:32.855Z",
        updatedAt: "2023-07-29T03:08:32.855Z",
        status: "STARTED",
        name: "Task 6",
        description: "Descrição da Task 6",
        due: null,
        deleted: false,
        certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "73ff9683-cdd7-4bd7-939d-60541f1ec2c5",
        createdAt: "2023-07-29T03:08:32.855Z",
        updatedAt: "2023-07-29T03:08:32.855Z",
        status: "COMPLETED",
        name: "Task 7",
        description: "Descrição da Task 7",
        due: null,
        deleted: false,
        certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "1d8ab37a-d969-45f0-ad9b-ad80da5d0feb",
        createdAt: "2023-07-29T03:08:32.855Z",
        updatedAt: "2023-07-29T03:08:32.855Z",
        status: "COMPLETED",
        name: "Task 8",
        description: "Descrição da Task 8",
        due: null,
        deleted: false,
        certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "83cd6e20-3e8c-4405-9ed4-cfb00f5e4b0d",
        createdAt: "2023-07-29T03:08:32.855Z",
        updatedAt: "2023-07-29T03:08:32.855Z",
        status: "STARTED",
        name: "Task 9",
        description: "Descrição da Task 9",
        due: null,
        deleted: false,
        certificationId: "a29b4e53-05dd-4e6a-910c-16f19158ced0",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "a94f08e5-761c-49a9-a9d8-f9445f9ae341",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 0",
        description: "Descrição da Task 0",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "6415c5f9-6c80-46c4-a061-dc0b0aaa2059",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 1",
        description: "Descrição da Task 1",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "88ba5f30-2ab3-4235-9977-12c3ac9fd406",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 2",
        description: "Descrição da Task 2",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "6d2bb36e-c63f-4e1b-a223-239f88dbbf00",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 3",
        description: "Descrição da Task 3",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "9a91065f-9803-4663-8792-3326d725312b",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 4",
        description: "Descrição da Task 4",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "fd7870aa-3d7e-4a61-934c-b0a88591206f",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 5",
        description: "Descrição da Task 5",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "2c329eab-6658-4a24-b3d8-68dabf0c522e",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 6",
        description: "Descrição da Task 6",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "4f0c9d67-cd79-4495-92d3-ca0f98728c4b",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "NOT_STARTED",
        name: "Task 7",
        description: "Descrição da Task 7",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "cdc8d485-2670-467f-946d-5c3fbda56c01",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "COMPLETED",
        name: "Task 8",
        description: "Descrição da Task 8",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
    {
        id: "5d6b7017-c5cd-48a5-89ba-ed3fa05a9ee8",
        createdAt: "2023-07-29T03:08:32.854Z",
        updatedAt: "2023-07-29T03:08:32.854Z",
        status: "STARTED",
        name: "Task 9",
        description: "Descrição da Task 9",
        due: null,
        deleted: false,
        certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3",
        companyId: "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
    },
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
];

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

const certificationCountData = 5;

export default async function Page() {
    // const session = await getServerSession(authOptions);

    // const req = await axios.get("http://localhost:3000/api/home", {
    //     headers: { "session-id": session?.user.id },
    // });

    // const data: Certification[] = req.data.data;

    // const { taskCountData, certificationCountData, lastTasksData } = req.data;

    const taskCount = taskCountData.map((data) => ({
        ...data,
        _count: data._count.name,
    }));

    const allTaskCount = taskCount.reduce(
        (acc, task) => (acc += task._count),
        0
    );

    // Deletar dps, nao precisa dessa variavel se ja tem
    // const allCertificationCount = certificationCountData

    // console.log(taskCount);
    // console.log(allTaskCount);
    // console.log(lastTasksData);

    // card total de certificações
    // card total de tasks
    // card
    // grafico de barra agregado de tasks por status e certificação
    // um grafico de pizza das certificações por status
    // tabela com ultimas 5 tasks e suas infos

    // const createdData = data.map((data) => data.createdAt);
    // const certificationData = data.map((data) => data.createdAt);

    // const numCertifications = mockCertificationData.length;

    // const numTasks = mockTaskData.length;

    // const numTasksCompleted = mockTaskData.filter(
    //     (data) => data.status === "COMPLETED"
    // ).length;

    // const teste = mockTaskData.map((data) => [
    //     data.status,
    //     data.certificationId,
    // ]);

    // console.log(teste);

    return (
        <div className="flex h-screen w-full bg-red-50">
            <div className="m-10 w-full">
                <Suspense fallback={<GreetingsSkeleton />}>
                    {/* <Greetings name={session!.user!.name} /> */}
                    <Greetings name="Gustavo" />
                </Suspense>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        {/* Componentizar Card */}
                        <Card className="flex-1">
                            <CardHeader>Total de Certificações</CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {certificationCountData}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardHeader>Total de Tasks</CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {allTaskCount}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-full items-center flex gap-4">
                        {/* <p>grafico</p> */}
                        <BarChart taskCount={taskCount} />
                        <p>pizza</p>
                    </div>

                    <div className="flex flex-col">
                        {lastTasksData.map((data) => (
                            <p key={data.id}>{data.name}</p>
                        ))}
                    </div>
                </div>
                {/* <div>{numTasks} tasks</div>
                <div>{numTasksCompleted} tasks</div> */}
            </div>
        </div>
    );
}
