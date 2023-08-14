import { db } from "@/lib/db";
import { STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
      AND: [{ companyId: sessionId }, { deleted: false }],
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
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
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

// Atualiza apenas Status certificação
export async function PATCH(req: Request, res: Response) {
  const sessionId = req.headers.get("session-id");

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const {
    certificationId,
    newStatus,
  }: { certificationId: string; newStatus: STATUS } = await req.json();

  console.log(certificationId, newStatus);

  if (!certificationId || !newStatus) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  const updateStatus = await db.certification.update({
    where: {
      id: certificationId,
    },
    data: {
      status: newStatus,
    },
  });

  return NextResponse.json({ updateStatus });
}

// Deleta certificação
export async function DELETE(req: Request, res: Response) {
  const sessionId = req.headers.get("session-id");

  if (!sessionId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { certificationId }: { certificationId: string } = await req.json();

  console.log(certificationId);

  if (!certificationId) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  const deleteTaskData = await db.task.deleteMany({
    where: {
      certificationId: certificationId,
    },
  });

  const deleteCertificationData = await db.certification.delete({
    where: { id: certificationId },
  });

  return NextResponse.json({ deleteTaskData, deleteCertificationData });
}
