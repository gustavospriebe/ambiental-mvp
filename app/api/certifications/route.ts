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

    const certificationData = await db.certification.findMany({
        where: { companyId: sessionId },
        select: {
            name: true,
            status: true,
        },
    });

    const taskData = await db.task.findMany({
        where: { companyId: sessionId },
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ certificationData, taskData });
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

// Atualiza certificação


// Deleta certificação