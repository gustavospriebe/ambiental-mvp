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

interface TableCertificationProps {
  // lastTasksData: tasksData[];
  certificationDataFormatted: {
    map: any;
    name: string;
    count: number;
    status: string;
    color: string;
    due: string | null;
  };
}

const TableCertification = ({
  certificationDataFormatted,
}: TableCertificationProps) => {
  

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
        {/* <TableBody>
          {lastTasksDataFormatted.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{formattedDate(item.createdAt)}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Badge color={item.color}>{item.status}</Badge>
              </TableCell>
              <TableCell>{item.certification}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </Card>
  );
};

export default TableCertification;
