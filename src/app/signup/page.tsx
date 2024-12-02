import SignupForm from "@/app/components/SignUpForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

//const SignUpPage = () => <SignupForm />;

//export default SignUpPage;

export default async function SignUp() {
    const session = await getServerSession(authOptions);

    if (session) redirect("/main");

    return <SignupForm />;
}
