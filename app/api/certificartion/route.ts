import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Puxar todas certificações
export async function GET(req: Request, res: NextResponse) {
    const sessionId = req.headers.get("session-id");

    if (!sessionId) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    const data = await db.certification.findMany({
        where: { companyId: sessionId },
    });

    console.log(req);

    return NextResponse.json({ data });
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
