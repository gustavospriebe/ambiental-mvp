"use client";

import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: ReactNode) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
