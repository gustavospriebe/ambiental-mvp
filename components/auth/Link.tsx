import Link from "next/link";

import { cn } from "@/lib/utils";

interface LinkConpProps {
    href: string;
    target?: string;
    children: React.ReactNode;
    className?: string;
}

const LinkComp = ({ href, target, children, className }: LinkConpProps) => (
    <Link
        href={href}
        passHref
        target={target}
        className={cn(
            "font-medium text-primary hover:text-primary-light",
            className ?? ""
        )}
    >
        {children}
    </Link>
);

export default LinkComp;
