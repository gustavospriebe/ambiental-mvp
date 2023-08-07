"use client";

import { cn } from "@/lib/utils";
import { ForwardOutlined } from "@ant-design/icons";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link className={cn("", className)} href="/home">
      <ForwardOutlined rotate={270} style={{ fontSize: "54px" }} />
    </Link>
  );
};

export default Logo;
