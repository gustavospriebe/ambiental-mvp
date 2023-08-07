import LogOutButton from "@/components/LogOutButton";
import { Separator } from "@/components/ui/separator";
import { navConfig } from "@/config/Menu";
import { useLockBody } from "@/hook/useLockBody";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MobileMenuProps {
  setShowMobileMenu: (boolean: boolean) => void;
  className?: string;
}

const MobileMenu = ({ setShowMobileMenu, className }: MobileMenuProps) => {
  useLockBody();

  const items = navConfig.NavMenu;

  return (
    <div
      className={cn(
        "font-exo fixed inset-0 top-20 z-50  bg-red-100/60 p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden",
        className ?? "",
      )}
    >
      <div className="relative z-20 grid gap-4 rounded-md bg-red-100 p-4 shadow-md">
        <span className="pl-2 text-2xl font-bold">Menu</span>
        <Separator className="mx-2 bg-black" />
        <nav className="flex flex-col gap-4 text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              onClick={() => setShowMobileMenu(false)}
              className={cn(
                "flex w-full select-none items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60",
              )}
            >
              <Image src={item.icon} alt="" />
              {item.title}
            </Link>
          ))}
        </nav>
        <LogOutButton />
      </div>
    </div>
  );
};

export default MobileMenu;
