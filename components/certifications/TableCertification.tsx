"use client";

import { formattedDate } from "@/lib/date";
import {
  Badge,
  BadgeProps,
  Card,
  MultiSelect,
  MultiSelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import { Button } from "../ui/button";
import { RefAttributes } from "react";

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
    map: any;
    id: string;
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
  // const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // const isStatusSelected = (item) =>
  // selectedStatus.includes(item.status) || selectedStatus.length === 0;

  console.log(certificationDataFormatted);

  return (
    <Card className="w-full space-y-4">
      <div className="space-y-4">
        <Title>Tabela de Certificações</Title>
        <div className="flex items-center justify-between">
          <MultiSelect
            // onValueChange={setSelectedNames}
            placeholder="Select Salespeople..."
            className="max-w-xs"
          >
            {/* {salesPeople.map((item) => ( */}
            <MultiSelectItem value="teste">teste</MultiSelectItem>
            {/* ))} */}
          </MultiSelect>
          <Button>Criar nova Certificação</Button>
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Qtd. Tasks</TableHeaderCell>
            <TableHeaderCell>Vencimento</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
            <TableHeaderCell>Link</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificationDataFormatted.map((item: certificationData) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="flex justify-center">
                {item.count}
              </TableCell>
              <TableCell>{formattedDate(item.due!) ?? "Sem data"}</TableCell>
              <TableCell>
                {/* @ts-expect-error */}
                <Badge color={item.color}>{item.status}</Badge>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline">Editar</Button>
                <Button variant="destructive">Excluir</Button>
              </TableCell>
              <TableCell>
                <Button variant="secondary">Ver detalhes</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableCertification;
