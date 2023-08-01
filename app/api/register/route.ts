import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface RequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request, res: Response) {
    const body: RequestBody = await req.json();

    let user = await db.company.findUnique({
        where: { email: body.email },
    });

    if (user) {
        throw new Error("Conta já existe.");
    }

    user = await db.company.create({
        data: {
            name: body.name,
            email: body.email,
            sector: "Agro",
            password: await hashPassword(body.password),
        },
    });

    const { password, ...result } = user;
    return NextResponse.json(result);
}
