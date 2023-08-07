"use client";

import closemenu from "@/assets/closemenu.svg";
import menu from "@/assets/menu.svg";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/context/MobileContext";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";

const Navigation = () => {
    const { showMobileMenu, setShowMobileMenu } = useMobile();

    return (
        <>
            <div className="md:hidden flex justify-between items-center bg-red-50 p-5">
                <Logo />
                <Button onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu ? (
                        <Image alt="" src={closemenu} className="h-8 w-8" />
                    ) : (
                        <Image alt="" src={menu} className="h-8 w-8" />
                    )}
                </Button>
            </div>

            {showMobileMenu && (
                <MobileMenu setShowMobileMenu={setShowMobileMenu} />
            )}

            <Sidebar />
        </>
    );
};

export default Navigation;
