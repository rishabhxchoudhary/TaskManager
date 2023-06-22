"use client"

import { SessionProvider } from "next-auth/react"


export default function Providers({ children }: { children: React.ReactNode }) {
    // const {data: session} = useSession()
    return (
        <>
            <SessionProvider
                // session={session}
            >
                {children}
            </SessionProvider>
        </>
    )
}