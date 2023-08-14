import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Puxar as infos da certificação e suas tasks
export async function GET(req: Request, res: NextResponse) {
  const sessionId = req.headers.get("session-id");

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const certificationData = await db.task.findMany({
    where: {
      AND: [
        { companyId: sessionId },
        {certificationId: "1b919aea-823e-42b2-ace1-3360b41f2d52"},
        { deleted: false },
        { certification: { deleted: false } },
      ],
    },
    select: {
      id: true,
      name: true,
      status: true,
      description: true,
      due: true,
      certification: {
        select: {
          name: true,
          status: true,
          due: true,
        },
      },
    },
  });

  return NextResponse.json({ certificationData });
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
