'use client'

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
    return (
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>Sair</Button>
    );
}
