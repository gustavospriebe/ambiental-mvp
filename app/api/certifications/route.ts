import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Certification } from "@prisma/client";

// Puxar as infos gerais das certificações e ultimas tasks
export async function GET(req: Request, res: NextResponse) {
  // // // Teste chamada direto api
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
      id: true,
      name: true,
      status: true,
      due: true,
      _count: { select: { tasks: { where: { deleted: false } } } },
    },
  });

  return NextResponse.json({ certificationData });
}

// Criar nova certificação
// const session = await getServerSession(authOptions);
// const sessionId = session?.user.id;
// Teste chamada direto api
export async function POST(req: Request, res: Response) {
  const sessionId = req.headers.get("session-id");

console.log(sessionId);

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // const name = req.headers.get("name");
  // const description = req.headers.get("description");
  // const due = req.headers.get("due");

  // if (!name || !description || !due) {
  //   return new NextResponse(
  //     JSON.stringify({ error: "Invalid request headers" }),
  //     {
  //       status: 400,
  //     },
  //   );
  // }

  const body = req.body as {
    name: string;
    description: string;
    due: string;
  } | null;

  console.log(body);

  if (!body) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  const newData = await db.certification.create({
    data: {
      name: body.name,
      companyId: sessionId,
      description: body.description,
      due: body.due,
    },
  });

  return NextResponse.json({ newData });
}

// Atualiza certificação

// Deleta certificação
