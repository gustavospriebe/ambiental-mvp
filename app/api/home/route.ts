import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Puxar as infos gerais das certificações e ultimas tasks
export async function GET(req: Request, res: NextResponse) {
    const sessionId = req.headers.get("session-id");

    if (!sessionId) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const certificationCountData = await db.certification.count({
        where: { companyId: sessionId },
    });

    const taskCountData = await db.task.groupBy({
        by: ["status", 'certificationId'],
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
        certificationCountData,
        lastTasksData,
    });
}
