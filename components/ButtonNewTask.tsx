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

const ButtonNewTask = ({ children, className, sessionId }: ButtonNewTask) => {
  const router = useRouter();

  async function newCertification() {
    try {
      let data = {
        name: "cris",
        description: "OIOIOIOII",
        due: "2023-11-17T03:00:00.000Z",
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/certifications",
        headers: {
          "session-id": sessionId,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const req = await axios.request(config);

      console.log(req);

      router.refresh();
      return req;
    } catch (error) {
      console.error("Erro no envio da requisição:", error);
    }
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
