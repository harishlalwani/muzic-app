"use client";

import {signIn, useSession, signOut} from "next-auth/react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { MusicIcon, UploadIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

export function Appbar() {

    const session = useSession();
    return <>
      <Link className="flex items-center justify-center" href="#">
        <MusicIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        <span className="ml-2 text-lg font-bold text-purple-600 dark:text-purple-400">MusicStream</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        { session.data?.user?

            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={()=> signOut()}>Signout</Button>
          :
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={()=> signIn()}>Signin</Button>
        }
      </nav>
    </>
    
  
}