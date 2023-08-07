"use client";

import { ForwardOutlined } from "@ant-design/icons";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/home">
            <ForwardOutlined rotate={270} style={{ fontSize: "54px" }} />
        </Link>
    );
};

export default Logo;
