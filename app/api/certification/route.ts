import { db } from "@/lib/db";
import { STATUS } from "@prisma/client";
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

  const certificationData = await db.certification.findFirst({
    where: {
      AND: [{ companyId: sessionId }, { id: certId }, { deleted: false }],
    },
    select: {
      id: true,
      name: true,
      status: true,
      description: true,
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
  const certId = req.headers.get("cert-id");

  if (!sessionId || !certId) {
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

  const newTask = await db.task.create({
    data: {
      name: name,
      companyId: sessionId,
      certificationId: certId,
      description: description,
      due: due,
    },
  });

  return NextResponse.json({ newTask });
}

// Atualiza apenas Status certificação
export async function PATCH(req: Request, res: Response) {
  const sessionId = req.headers.get("session-id");
  const certId = req.headers.get("cert-id");

  if (!sessionId || !certId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { taskId, newStatus }: { taskId: string; newStatus: STATUS } =
    await req.json();

  console.log(taskId, newStatus);

  if (!taskId || !newStatus) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  const updtadeStatus = await db.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });

  return NextResponse.json({ updtadeStatus });
}

// Deleta task
export async function DELETE(req: Request, res: Response) {
  const sessionId = req.headers.get("session-id");
  const certId = req.headers.get("cert-id");

  if (!sessionId || !certId) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { taskId } = await req.json();

  if (!taskId) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  const deleteTaskData = await db.task.delete({
    where: {
      id: taskId,
    },
  });

  return NextResponse.json({ deleteTaskData });
}
