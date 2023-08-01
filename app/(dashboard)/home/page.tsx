import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function Page() {
    const session = await getServerSession(authOptions);

    console.log(session);
    console.log(!!session);

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="m-10">
                <Suspense fallback={<GreetingsSkeleton />}>
                    <Greetings info={session?.user} />
                </Suspense>
            </div>
        </div>
    );
}
