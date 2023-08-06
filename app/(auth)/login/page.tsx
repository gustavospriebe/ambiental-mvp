import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Login = async () => {
    const session = await getServerSession(authOptions);

    if (!!session) {
        redirect("/home");
    }

    return <LoginForm />;
};

export default Login;
