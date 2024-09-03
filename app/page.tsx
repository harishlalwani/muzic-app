import Image from "next/image";
import { Appbar } from "./components/Appbar";


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MusicIcon, UploadIcon, UsersIcon } from "lucide-react"
import Link from "next/link"
import { Redirect } from "./components/Redirect";

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <Appbar />
        <Redirect />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  Let Your Fans Choose the Music
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                  Upload your tracks and let your audience decide what plays next on your stream. Engage with your fans like never before.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
          <div className=" px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <UploadIcon className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Easy Upload</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Quickly upload your tracks and build your music library.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <UsersIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Fan Interaction</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Let your audience vote on the next track to play.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <MusicIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Live Streaming</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Stream your music live with real-time fan interaction.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  Ready to Connect with Your Fans?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  Join MusicStream today and revolutionize how you share your music.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-purple-600 dark:hover:text-purple-400" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
        <p className="text-xs text-gray-700 dark:text-gray-300">
          © 2023 MusicStream. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-600 dark:hover:text-purple-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-purple-600 dark:hover:text-purple-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
export default function Home() {
  return (
    <LandingPage/>
  );
}
