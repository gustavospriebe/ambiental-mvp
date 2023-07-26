import LoginForm from "@/components/LoginForm";

const Login = () => {
    return (
        <div className="flex min-h-screen lg:flex-none  w-full">
            <LoginForm />
            <p className="w-full px-4 py-12 lg:px-20 xl:px-24 sm:px-6 text-center self-center hidden lg:block">
                oi
            </p>
        </div>
    );
};

export default Login;
