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

    return <SignupForm />;
};

export default Register;
