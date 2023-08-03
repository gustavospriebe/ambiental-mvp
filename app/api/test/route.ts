import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Testar se usuário está autenticado ou não
export async function GET(req: Request, res: Response) {
    const sessionId = req.headers.get("session-id");

    if (!sessionId) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    // RETORNA DADOS

    const data = await db.certification.count({
        where: { companyId: sessionId },
    });

    return NextResponse.json({ data });
}
