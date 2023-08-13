"use client";

import ModalCertifications from "@/components/certifications/ModalCertifications";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formattedDate } from "@/lib/date";
import {
  Badge,
  Card,
  Tab,
  TabGroup,
  TabList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

interface certificationData {
  id: string;
  name: string;
  count: number;
  status: string;
  color: string;
  due: string | null;
}

interface TableCertificationProps {
  certificationDataFormatted: {
    slice: any;
    sort: any;
    map: any;
    id: string;
    name: string;
    count: number;
    status: string;
    color: string;
    due: string | null;
  };
  sessionId: string;
}

const TableCertification = ({
  certificationDataFormatted,
  sessionId,
}: TableCertificationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

  // const certificationDataOrdered =
  //   selectedIndex !== 0
  //     ? certificationDataFormatted
  //         .sort((a: { status: string }, b: { status: string }) => {
  //           const certOrder: Record<string, number> = {
  //             "Não iniciado": 0,
  //             "Em andamento": 1,
  //             Completo: 2,
  //           };

  //           return certOrder[a.status] - certOrder[b.status];
  //         })
  //         .filter(
  //           (x: { status: string }) =>
  //             x.status ===
  //             (selectedIndex === 1
  //               ? "Não iniciado"
  //               : selectedIndex === 2
  //               ? "Em andamento"
  //               : "Completo"),
  //         )
  //     : certificationDataFormatted.sort(
  //         (a: { status: string }, b: { status: string }) => {
  //           const certOrder: Record<string, number> = {
  //             "Não iniciado": 0,
  //             "Em andamento": 1,
  //             Completo: 2,
  //           };

  //           return certOrder[a.status] - certOrder[b.status];
  //         },
  //       );

  const sortedDateCertifications =
    selectedIndex !== 0
      ? certificationDataFormatted
          .slice()
          .sort((a: { due: string }, b: { due: string }) =>
            a.due === null
              ? 1
              : b.due === null
              ? -1
              : new Date(a.due).getTime() - new Date(b.due).getTime(),
          )
          .filter(
            (x: { status: string }) =>
              x.status ===
              (selectedIndex === 1
                ? "Não iniciado"
                : selectedIndex === 2
                ? "Em andamento"
                : "Completo"),
          )
      : certificationDataFormatted
          .slice()
          .sort((a: { due: string }, b: { due: string }) =>
            a.due === null
              ? 1
              : b.due === null
              ? -1
              : new Date(a.due).getTime() - new Date(b.due).getTime(),
          );

  // const filteredCertifications = sortedDateCertifications.filter(
  //   (x) =>
  //     x.status ===
  //     (selectedIndex === 1
  //       ? "Não iniciado"
  //       : selectedIndex === 2
  //       ? "Em andamento"
  //       : selectedIndex === 3
  //       ? "Completo"
  //       : x.status),
  // );

  return (
    <div className="h-full w-full">
      <Card className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Title>Certificações</Title>
            <Text className="pt-1">
              Acesse as informações das certificações.
            </Text>
          </div>
          <ModalCertifications sessionId={sessionId} />
        </div>
        <div>
          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <div className="block sm:flex sm:justify-between">
              <div className="mt-4 sm:mt-0">
                <TabList>
                  <Tab>Todos</Tab>
                  <Tab>Não iniciado</Tab>
                  <Tab>Em andamento</Tab>
                  <Tab>Completo</Tab>
                </TabList>
              </div>
            </div>
          </TabGroup>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Qtd. Tasks</TableHeaderCell>
              <TableHeaderCell>Vencimento</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDateCertifications.map((item: certificationData) => (
              <TableRow className="hover:bg-slate-50" key={item.id}>
                <TableCell>
                  <Link
                    className="hover:underline"
                    href={`/certification/${item.id}`}
                  >
                    {item.name}
                  </Link>
                </TableCell>

                <TableCell className="flex justify-center">
                  {item.count}
                </TableCell>
                <TableCell>
                  {!!item.due ? formattedDate(item.due!) : "Sem data"}
                </TableCell>
                <TableCell>
                  {/* @ts-expect-error */}
                  <Badge color={item.color}>{item.status}</Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button disabled variant="outline">
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Excluir</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que quer excluir?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={async () => {
                            await axios.request({
                              method: "delete",
                              url: "http://localhost:3000/api/certifications",
                              data: {
                                certificationId: item.id,
                              },
                              headers: {
                                "session-id": sessionId,
                              },
                            });
                            router.refresh();
                          }}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TableCertification;
