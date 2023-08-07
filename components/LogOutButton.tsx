"use client";

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

interface LogOutButtonProps {
  className?: string;
}

export default function LogOutButton({ className }: LogOutButtonProps) {
  return (
    <Button
      className={cn("", className ?? "")}
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sair
    </Button>
  );
}

// refatorar design
