import hero from "@/assets/hero.jpg";
import Image from "next/image";

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full lg:flex-none">
      {children}
      <Image
        src={hero}
        priority
        alt="hero"
        className="hidden aspect-square h-screen w-full object-cover lg:block"
      />
    </div>
  );
};

export default AuthRootLayout;
