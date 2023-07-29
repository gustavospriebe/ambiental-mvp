import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('gjhdfgkjlshdfl')

    if (req.method === "POST") {
        let user = await db.company.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            res.status(403);
            res.json({ error: "Account already exists" });
            return;
        }

        user = await db.company.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                sector: "Agro",
                password: await hashPassword(req.body.password),
            },
        });

        const jwt = await createJWT(user);

        res.setHeader(
            "Set-Cookie",
            serialize(process.env.COOKIE_NAME!, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
        );

        res.status(201);
        res.end();
    } else {
        res.status(402);
        res.end();
    }
}
