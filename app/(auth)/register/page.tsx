import hero from "@/assets/hero.jpg";
import SignupForm from "@/components/SignupForm";
import Image from "next/image";

const Register = () => {
    return (
        <div className="flex min-h-screen lg:flex-none w-full">
            <SignupForm />
            <Image
                src={hero}
                alt="hero"
                className="h-screen object-cover aspect-square w-full hidden lg:block"
            />
        </div>
    );
};

export default Register;
