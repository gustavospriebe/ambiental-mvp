const mockTasksData = [
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
];

const Certification = () => {
  return <div className="flex w-full bg-red-50 md:ml-52 md:h-screen">oi</div>;
};

// Qtd task em atraso
// Tasks feitas / Tasks em aberto
// Prazo da Certificação
// Botão nova task
// tabela com as tarefas com exclusão   --- talvez edição

{
  /* <Indicator
                title="Vencimento próxima Certificação"
                data={maxCertificationDue}
              /> */
}

export default Certification;
