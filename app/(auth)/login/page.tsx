import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import hero from "@/assets/hero.jpg";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Login = async () => {
    const session = await getServerSession(authOptions);

    if (!!session) {
        redirect("/home");
    }

    return (
        <div className="flex min-h-screen lg:flex-none w-full">
            <LoginForm />
            <Image
                src={hero}
                priority
                alt="hero"
                className="h-screen object-cover aspect-square w-full hidden lg:block"
            />
        </div>
    );
};

export default Login;
