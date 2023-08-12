"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ButtonNewTask extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  sessionId?: string;
}

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
