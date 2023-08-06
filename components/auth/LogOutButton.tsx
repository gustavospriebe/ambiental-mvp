"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogOutButton() {
    return (
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>Sair</Button>
    );
}

// refatorar design
