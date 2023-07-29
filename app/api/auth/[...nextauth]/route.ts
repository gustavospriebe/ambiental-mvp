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

                const user = await db.company.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!user) throw new Error("Invalid credentials");

                const isPasswordValid = await comparePasswords(
                    password,
                    user.password
                );

                if (!isPasswordValid) throw new Error("Invalid password");

                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 7,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
