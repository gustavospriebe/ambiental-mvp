import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignupForm from "@/components/auth/SignupForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession(authOptions);

  if (!!session) {
    redirect("/home");
  }

  return <SignupForm />;
};

export default Register;
