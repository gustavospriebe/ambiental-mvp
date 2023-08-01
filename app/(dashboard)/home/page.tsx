import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { ReactNode, Suspense } from "react";

export default async function Page() {
    const session = await getServerSession(authOptions);

    console.log(session);
    console.log(!!session);

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex flex-col flex-1 w-0 overflow-hidden m-4 border border-gray-200 border-dashed rounded-lg">
                <div className="m-6">
                    <Suspense fallback={<GreetingsSkeleton />}>
                        <Greetings info={session?.user} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
