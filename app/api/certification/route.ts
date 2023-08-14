import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Puxar as infos da certificação e suas tasks
export async function GET(req: Request, res: NextResponse) {
  const sessionId = req.headers.get("session-id");
  const certId = req.headers.get("cert-id");

  if (!sessionId || !certId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const certificationData = await db.certification.findMany({
    where: {
      AND: [{ companyId: sessionId }, { id: certId }, { deleted: false }],
    },
    select: {
      id: true,
      name: true,
      status: true,
      due: true,
      tasks: {
        select: {
          id: true,
          name: true,
          status: true,
          description: true,
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
