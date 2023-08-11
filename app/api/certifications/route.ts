import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Certification } from "@prisma/client";

// Puxar as infos gerais das certificações e ultimas tasks
export async function GET(req: NextRequest, res: NextResponse) {
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
export async function POST(req: Request, res: Response) {
  const sessionId = req.headers.get("session-id");

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { name, description, due } = await req.json();

  if (!name || !description || !due) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid request headers" }),
      {
        status: 400,
      },
    );
  }

  const newData = await db.certification.create({
    data: {
      name: name,
      companyId: sessionId,
      description: description,
      due: due,
    },
  });

  return NextResponse.json({ newData });
}

// Atualiza certificação

// Deleta certificação
