"use client";

import { formattedDate } from "@/lib/date";
import { STATUS } from "@prisma/client";
import {
  Badge,
  Card,
  Select,
  SelectItem,
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
import { useRouter } from "next/navigation";
import { useState } from "react";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import ModalTask from "./ModalTask";

interface taskData {
  id: string;
  name: string;
  color: string;
  description: string | null;
  status: STATUS;
  due: Date | null;
}

interface TableTaskProps {
  taskformatted: {
    sort: any;
    slice: any;
    map: any;
    id: string;
    color: string;
    name: string;
    description: string | null;
    status: STATUS;
    due: Date | null;
  };

  sessionId: string;
  certId: string;
}

const TableTask = ({ taskformatted, sessionId, certId }: TableTaskProps) => {
  const [value, setValue] = useState("");

  const router = useRouter();

  const sortedByDateTask = taskformatted
    .slice()
    .sort((a: { due: string }, b: { due: string }) =>
      a.due === null
        ? 1
        : b.due === null
        ? -1
        : new Date(a.due).getTime() - new Date(b.due).getTime(),
    );

  const sortedByStatusTask = taskformatted.sort(
    (a: { status: string }, b: { status: string }) => {
      const certOrder: Record<string, number> = {
        "Não iniciado": 0,
        "Em andamento": 1,
        Completo: 2,
      };

      return certOrder[a.status] - certOrder[b.status];
    },
  );

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
          <ModalTask sessionId={sessionId} certId={certId} />
        </div>
        <div className="max-w-sm">
          <Select
            value={value}
            onValueChange={setValue}
            placeholder="Ordenar por..."
          >
            <SelectItem value="1">Status</SelectItem>
            <SelectItem value="2">Data</SelectItem>
          </Select>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nome</TableHeaderCell>
              <TableHeaderCell>Descrição</TableHeaderCell>
              <TableHeaderCell>Vencimento</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(value !== "2" ? sortedByStatusTask : sortedByDateTask).map(
              (item: taskData) => (
                <TableRow className="hover:bg-slate-50" key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    {!!item.due ? formattedDate(item.due) : "Sem data"}
                  </TableCell>
                  <TableCell>
                    {/* @ts-expect-error */}
                    <Badge color={item.color}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <div className="mx-auto max-w-sm space-y-6">
                      <Select placeholder="Editar Status">
                        <SelectItem
                          onClick={async () => {
                            await axios.request({
                              method: "patch",
                              url: "http://localhost:3000/api/certification",
                              data: {
                                taskId: item.id,
                                newStatus: "NOT_STARTED",
                              },
                              headers: {
                                "session-id": sessionId,
                                "cert-id": certId,
                              },
                            });
                            router.refresh();
                          }}
                          value="NOT_STARTED"
                        >
                          Não iniciado
                        </SelectItem>
                        <SelectItem
                          onClick={async () => {
                            await axios.request({
                              method: "patch",
                              url: "http://localhost:3000/api/certification",
                              data: {
                                taskId: item.id,
                                newStatus: "STARTED",
                              },
                              headers: {
                                "session-id": sessionId,
                                "cert-id": certId,
                              },
                            });
                            router.refresh();
                          }}
                          value="STARTED"
                        >
                          Em andamento
                        </SelectItem>
                        <SelectItem
                          onClick={async () => {
                            await axios.request({
                              method: "patch",
                              url: "http://localhost:3000/api/certification",
                              data: {
                                taskId: item.id,
                                newStatus: "COMPLETED",
                              },
                              headers: {
                                "session-id": sessionId,
                                "cert-id": certId,
                              },
                            });
                            router.refresh();
                          }}
                          value="COMPLETED"
                        >
                          Completo
                        </SelectItem>
                      </Select>
                    </div>
                    {/* Componentizar botoes */}
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
                                url: "http://localhost:3000/api/certification",
                                data: {
                                  taskId: item.id,
                                },
                                headers: {
                                  "session-id": sessionId,
                                  "cert-id": certId,
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
              ),
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TableTask;
