"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children?: ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </SessionProvider>
  );
};

export default Providers;
