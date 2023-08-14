"use client";

import ModalCertifications from "@/components/certifications/ModalCertifications";
import { formattedDate } from "@/lib/date";
import { STATUS } from "@prisma/client";
import {
  Card,
  Tab,
  Badge,
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
  Select,
  SelectItem,
} from "@tremor/react";
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
import axios from "axios";

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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();

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
            {taskformatted.map((item: taskData) => (
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
                            url: "http://localhost:3000/api/certifications",
                            data: {
                              certificationId: item.id,
                              newStatus: "NOT_STARTED",
                            },
                            headers: {
                              "session-id": sessionId,
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
                            url: "http://localhost:3000/api/certifications",
                            data: {
                              certificationId: item.id,
                              newStatus: "STARTED",
                            },
                            headers: {
                              "session-id": sessionId,
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
                            url: "http://localhost:3000/api/certifications",
                            data: {
                              certificationId: item.id,
                              newStatus: "COMPLETED",
                            },
                            headers: {
                              "session-id": sessionId,
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

export default TableTask;
