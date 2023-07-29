import { comparePasswords } from "@/lib/auth";
import { db } from "@/lib/db";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Sign in",
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (!email || !password) return null;

                const user = await db.company.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!user) return null;

                const isPasswordValid = await comparePasswords(
                    password,
                    user.password
                );

                if (!isPasswordValid) return null;

                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.name,
                };

                // const res = await fetch("/api/signin", {
                //     method: "POST",
                //     body: credentials && JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" },
                // });
                // const user = await res.json();
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
