import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Puxar as infos gerais das certificações e ultimas tasks
export async function GET(req: Request, res: NextResponse) {
  // Teste chamada direto api
  const session = await getServerSession(authOptions);
  const sessionId = session?.user.id;

  // const sessionId = req.headers.get("session-id");

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const certificationData = await db.certification.findMany({
    where: {
      AND: [{ companyId: sessionId }, { deleted: false }],
    },
    select: {
      name: true,
      status: true,
      createdAt: true,
      due: true,
      description: true,
      tasks: {
        select: {
          status: true,
        },
      },
    },
  });

  const taskData = await db.task.findMany({
    where: {
      AND: [
        { companyId: sessionId },
        { deleted: false },
        // { certification: { deleted: false } },
      ],
    },
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  console.log(taskData);

  return NextResponse.json({ certificationData, taskData });
}

// Criar nova certificação
export async function POST(req: Request, res: Response) {
  const sessionId = req.headers.get("session-id");

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });

    // const body = req.body

    // const newData = await db.certification.create({
    //     data: {
    //         name: "teste2",
    //         companyId: sessionId,
    //         description: "teste231sdf3123",
    //         tasks: {
    //             create: {
    //                 name: "testamdp",
    //                 companyId: sessionId,
    //             },
    //         },
    //     },
    // });
  }
}

// Atualiza certificação

// Deleta certificação
