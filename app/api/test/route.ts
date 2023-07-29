import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Testar se usuário está autenticado ou não
export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);
    console.log("GET API", session?.user);
    return NextResponse.json({ authenticated: !!session });
}
