"use client";

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
import Link from "next/link";
import { Button } from "../ui/button";

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
}

const TableCertification = ({
  certificationDataFormatted,
}: TableCertificationProps) => {
  const certificationDataOrdered = certificationDataFormatted.sort(
    (a: { status: string }, b: { status: string }) => {
      const certOrder: Record<string, number> = {
        "Não iniciado": 0,
        "Em andamento": 1,
        Completo: 2,
      };

      return certOrder[a.status] - certOrder[b.status];
    },
  );

  // const sortedCertifications = certificationDataFormatted
  //   .slice()
  //   .sort((a: { due: string }, b: { due: string }) =>
  //     a.due === null
  //       ? 1
  //       : b.due === null
  //       ? -1
  //       : new Date(a.due).getTime() - new Date(b.due).getTime(),
  //   );

  return (
    <Card className="w-full space-y-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Title>Tabela de Certificações</Title>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {certificationDataOrdered.map((item: certificationData) => (
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
                <Button disabled variant="destructive">
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TableCertification;
