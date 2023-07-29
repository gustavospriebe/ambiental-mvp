import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import LogOutButton from "@/components/LogOutButton";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function Page() {
    const session = await getServerSession(authOptions);

    console.log(session);
    console.log(!!session);

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            <div className=" h-full  items-stretch justify-center min-h-[content]">
                <div className="flex-1 grow flex">
                    <Suspense fallback={<GreetingsSkeleton />}>
                        <Greetings info={session?.user} />
                    </Suspense>
                </div>
                <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
                    {/** projects map here */}
                    <div className="w-1/3 p-3">{/* new project here */}</div>
                </div>
                <div className="mt-6 flex-2 grow w-full flex">
                    <div className="w-full">{/* tasks here */}</div>
                </div>
                <LogOutButton />
            </div>
        </div>
    );
}
