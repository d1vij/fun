import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

import Head from "@/components/Face/Face";
import Fwog from "@/components/Fwog/Fwog";
import HomeCards from "@/components/HomeCards";
import HomeFooter from "@/components/HomeFooter";

function Home() {
    return (
        <div className="relative mx-auto flex min-h-dvh w-fit flex-col overflow-x-clip p-10">
            <header className="mb-12 flex select-none flex-col items-center justify-center gap-2 font-logo">
                <h1 className="flex items-end text-6xl">
                    DIVIJ
                    <Head />
                    <span className="ml-1">FUN</span>
                </h1>
                <h2>recreating the games and stuff from Neal.fun</h2>
            </header>

            <div className="flex grow flex-col justify-between">
                <HomeCards />
                <HomeFooter />
            </div>
            <Fwog />
        </div>
    );
}
