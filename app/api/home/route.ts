import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface certificationCountData {}

// Puxar as infos gerais das certificações e ultimas tasks
export async function GET(req: Request, res: NextResponse) {
    const sessionId = req.headers.get("session-id");

    if (!sessionId) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const certificationData = await db.certification.findMany({
        where: { companyId: sessionId },
        select: { id: true, name: true, status: true, due: true },
    });

    const taskCountData = await db.task.groupBy({
        by: ["status", "certificationId"],
        where: { companyId: sessionId },
        _count: { name: true },
    });

    const lastTasksData = await db.task.findMany({
        where: { companyId: sessionId },
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
        taskCountData,
        certificationData,
        lastTasksData,
    });
}
