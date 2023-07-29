import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "hello@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await fetch("/api/signin", {
                    method: "POST",
                    body: credentials && JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });
                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }

                return null;
            },
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

