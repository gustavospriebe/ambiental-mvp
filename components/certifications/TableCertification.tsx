"use client";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  sessionId: string;
}

const TableCertification = ({
  certificationDataFormatted,
  sessionId,
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

  const router = useRouter();

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

            <TableCell className="flex justify-center">{item.count}</TableCell>
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
  );
};

export default TableCertification;
