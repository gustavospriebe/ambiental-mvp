import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// Puxar as infos gerais das certificações e ultimas tasks
export async function GET(req: Request, res: NextResponse) {
  // // Teste chamada direto api
  // const session = await getServerSession(authOptions);
  // const sessionId = session?.user.id;

  const sessionId = req.headers.get("session-id");

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const certificationData = await db.certification.findMany({
    where: {
      AND: [{ companyId: sessionId }],
    },
    select: {
      name: true,
      status: true,
      due: true,
      _count: { select: { tasks: { where: { deleted: false } } } },
    },
  });

  return NextResponse.json({ certificationData });
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
    //         name: body.name,
    //         companyId: sessionId,
    //         description: body.description,
    //         due: body.due
    //         },
    //     },
    // });
  }
}

// Atualiza certificação

// Deleta certificação
