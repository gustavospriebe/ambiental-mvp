import { navConfig } from "@/config/Menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LogOutButton from "../../LogOutButton";
import Logo from "../../Logo";

const Sidebar = () => {
  const items = navConfig.NavMenu;

  return (
    <div className="fixed top-0 hidden h-screen w-52 bg-white md:flex">
      <div className="flex w-full flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r bg-white pt-5">
          <Logo className="px-4" />
          <nav className="mt-5 flex-1 space-y-1 bg-white px-4">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "focus:shadow-outline mt-6 flex w-full transform select-none items-center  gap-2 rounded-md px-2 py-4 text-sm font-semibold text-gray-600 transition duration-200 ease-in-out hover:scale-95 hover:bg-gray-100 hover:text-gray-800 hover:underline",
                  item.disabled && "cursor-not-allowed opacity-60",
                )}
              >
                <Image src={item.icon} alt="" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <LogOutButton className="rounded-none" />
      </div>
    </div>
  );
};

export default Sidebar;
