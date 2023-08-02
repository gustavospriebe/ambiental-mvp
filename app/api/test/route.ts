import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/lib/db";

// Testar se usuário está autenticado ou não
export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    // @ts-expect-error
    const sessionId = session.user?.id;

    // RETORNA DADOS

    // const data = await db.certification.findMany({
    //     where: { companyId: sessionId },
    // });

    // CRIA DADOS

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

    // console.log(newData);

    return NextResponse.json({ authenticated: !!session });
}
