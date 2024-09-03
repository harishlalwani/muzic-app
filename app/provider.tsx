"use client";
// context api
//recoil , theme 
import { SessionProvider } from "next-auth/react";

export function Provider({children}: {children: React.ReactNode }) {
    return <SessionProvider>
        {children}
    </SessionProvider>
}