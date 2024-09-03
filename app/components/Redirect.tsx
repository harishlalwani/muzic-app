"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session.data?.user) {
            router.push("/dashboard");
        }
        else {
            
        }
        
    }, [session]);
    return null;
}