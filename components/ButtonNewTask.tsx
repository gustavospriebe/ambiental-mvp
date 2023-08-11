"use client";

import { Button } from "@/components/ui/button";
// import { createCertification } from "@/lib/Queries";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { createCertification } from "@/lib/Queries";

interface ButtonNewTask extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  sessionId?: string;
}

// const formSchema = z.object({
//   name: z
//     .string({ required_error: "Digite o nome da certificação." })
//     .min(2, { message: "Deve ter 2 ou mais caracteres." }),
//   description: z.string(),
//   due: z.date(),
// });

const ButtonNewTask = ({ children, className }: ButtonNewTask) => {
  const router = useRouter();

  const session = useSession();

  if (session.status !== "authenticated") return;

  const sessionId = session.data.user.id;

  console.log(sessionId);

  async function newCertification() {
    try {
      const req = await axios.post("http://localhost:3000/api/certifications", {
        headers: {
          "session-id": "a36c1d4c-8edc-409a-ab3f-285081a00e7a",
          "Content-Type": "application/json",
        },
        body: {
          name: "Fachjuujihksenok Certification",
          description: "Lorem ipsum fkfj",
          due: "2023-10-27T03:00:00.000Z",
        },
      });

      // redirect("/certifications")
      return req;
      //     const res = await fetch("http://localhost:3000/api/certifications", {
      //       method: "post",
      //       headers: {
      //         "session-id": sessionId,
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         name: "asdFaacenok Certification",
      //         description: "Lorem ipsum fkfj",
      //         due: "2023-10-27T03:00:00.000Z",
      //       }),
      //     });
      //     console.log(res);

      //     return res;
    } catch (error) {
      console.error("Erro no envio da requisição:", error);
    }
    router.refresh();
  }

  return (
    <button
      className={cn("", className ?? "")}
      onClick={() => newCertification()}
    >
      {children}
    </button>
  );
};

export default ButtonNewTask;
