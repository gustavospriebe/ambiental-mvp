import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { MobileProvider } from "@/context/MobileContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ambiental App",
    description: "Protótipo",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
