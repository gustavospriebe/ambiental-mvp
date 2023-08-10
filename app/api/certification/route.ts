import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Puxar as infos da certificação e suas tasks
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
    where: { id: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3" },
    select: {
      name: true,
      status: true,
      description: true,
      due: true,
      tasks: true,
    },
  });

  const taskData = await db.task.findMany({
    where: { certificationId: "a700bd6c-4c05-4ab2-ad7d-ca8aa12310c3" },
  });

  return NextResponse.json({ certificationData, taskData });
}

// Criar nova task
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

// Atualiza task

// Deleta task
