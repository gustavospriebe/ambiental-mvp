import { comparePasswords, hashPassword } from "@/lib/auth";
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
        const { email, password, name } = credentials as {
          email: string;
          password: string;
          name: string;
        };

        const user = await db.company.findUnique({
          where: {
            email: email,
          },
        });

        if (user) {
          const isPasswordValid = await comparePasswords(
            password,
            user.password,
          );

          if (!isPasswordValid)
            throw new Error("Senha inválida, digite novamente.");

          return {
            id: user.id + "",
            email: user.email,
            name: user.name,
          };
        } else {
          if (!!!name) throw new Error("Conta inexistente.");

          const newUser = await db.company.create({
            data: {
              name: name,
              sector: "Agro",
              email: email,
              password: await hashPassword(password),
            },
          });
          return {
            id: newUser.id + "",
            email: newUser.email,
            name: newUser.name,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
