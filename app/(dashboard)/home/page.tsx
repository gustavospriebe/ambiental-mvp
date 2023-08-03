import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import axios from "axios";
import { db } from "@/lib/db";
import {Certification} from '@prisma/client'

interface data {

}



export default async function Page() {
    const session = await getServerSession(authOptions);

    const req = await axios.get("http://localhost:3000/api/test", {
        headers: { "session-id": session?.user.id },
    });

    const data: Certification[] = req.data.data


    console.log(data);
    console.log(data.length)

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="m-10">
                <Suspense fallback={<GreetingsSkeleton />}>
                    <Greetings name={session!.user!.name} />
                </Suspense>
            </div>
        </div>
    );
}
