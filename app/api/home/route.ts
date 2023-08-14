import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Puxar as infos gerais das certificações e ultimas tasks
export async function GET(req: Request, res: NextResponse) {
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
    select: { id: true, name: true, status: true, due: true },
  });

  const taskCountData = await db.task.groupBy({
    by: ["status", "certificationId"],
    where: {
      AND: [
        { companyId: sessionId },
        { deleted: false },
        { certification: { deleted: false } },
      ],
    },
    _count: { name: true },
  });

  const lastTasksData = await db.task.findMany({
    where: {
      AND: [
        { companyId: sessionId },
        { deleted: false },
        { certification: { deleted: false } },
      ],
    },
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    taskCountData,
    certificationData,
    lastTasksData,
  });
}
