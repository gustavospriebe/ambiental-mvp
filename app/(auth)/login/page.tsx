import hero from "@/assets/hero.jpg";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

const Login = () => {
    return (
        <div className="flex min-h-screen lg:flex-none w-full">
            <LoginForm />
            <Image
                src={hero}
                alt="hero"
                className="h-screen object-cover aspect-square w-full hidden lg:block"
            />
        </div>
    );
};

export default Login;
