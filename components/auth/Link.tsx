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
      "hover:text-primary-light font-medium text-primary",
      className ?? "",
    )}
  >
    {children}
  </Link>
);

export default LinkComp;
