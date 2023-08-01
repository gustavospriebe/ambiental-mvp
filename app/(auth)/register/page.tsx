import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import hero from "@/assets/hero.jpg";
import SignupForm from "@/components/SignupForm";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const Register = async () => {
    const session = await getServerSession(authOptions);

    if (!!session) {
        redirect("/home");
    }

    return (
        <div className="flex min-h-screen lg:flex-none w-full">
            <SignupForm />
            <Image
                src={hero}
                alt="hero"
                priority
                className="h-screen object-cover aspect-square w-full hidden lg:block"
            />
        </div>
    );
};

export default Register;
