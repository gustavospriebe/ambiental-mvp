import { formattedDate } from "@/lib/date";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";

interface tasksData {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  status: string;
  certification: string;
  certificationId?: string;
  color: string; // Original color typew
}

type lastTasksDataFormatted = {
  [K in keyof tasksData]: K extends "color"
    ? "green" | "yellow" | "red"
    : tasksData[K];
};

interface TableHomeProps {
  lastTasksData: tasksData[];
  certificationData: {
    find: any;
    id: string;
    name: string;
    status: string;
    due: string | null;
  };
}

const TableHome = ({ lastTasksData, certificationData }: TableHomeProps) => {
  const lastTasksDataFormatted: lastTasksDataFormatted[] = lastTasksData.map(
    (task: tasksData) => ({
      id: task.id,
      name: task.name,
      createdAt: formattedDate(task.createdAt),
      description: task.description ?? "Sem Descrição",
      status:
        task.status === "COMPLETED"
          ? "Completo"
          : task.status === "STARTED"
          ? "Em andamento"
          : "Não iniciado",
      certification: certificationData.find(
        (cert: { id: string }) => cert.id === task.certificationId,
      )!.name,
      color:
        task.status === "COMPLETED"
          ? "green"
          : task.status === "STARTED"
          ? "yellow"
          : "red",
    }),
  );

  return (
    <Card className="w-full">
      <Title>Últimas tasks criadas</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Criado em</TableHeaderCell>
            <TableHeaderCell>Descrição</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Certificação</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastTasksDataFormatted.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Badge color={item.color}>{item.status}</Badge>
              </TableCell>
              <TableCell>{item.certification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableHome;
