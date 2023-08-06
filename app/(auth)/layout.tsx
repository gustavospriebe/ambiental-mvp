import hero from "@/assets/hero.jpg";
import Image from "next/image";

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen lg:flex-none w-full">
            {children}
            <Image
                src={hero}
                priority
                alt="hero"
                className="h-screen object-cover aspect-square w-full hidden lg:block"
            />
        </div>
    );
};

export default AuthRootLayout;
