import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import {ChatGptCodeAssistDrawer} from "@/components/chat-gpt-code-assist-drawer/chat-gpt-code-assist-drawer";
import {useRouter} from "next/router";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    // @ts-ignore
    const { auth } = Component

    return (
        <SessionProvider session={session}>
            <ChatGptCodeAssistDrawer>
                {auth ? (
                    <Auth>
                        <div className="mx-auto max-w-2xl"> {/* Apply max-w-2xl class here */}
                            <Component {...pageProps} />
                        </div>
                    </Auth>
                ) : (
                    <div className="mx-auto max-w-2xl"> {/* Apply max-w-2xl class here */}
                        <Component {...pageProps} />
                    </div>
                )}
            </ChatGptCodeAssistDrawer>
        </SessionProvider>
    )
}

function Auth({ children }: PropsWithChildren) {
    const router = useRouter()

    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login').catch()
        }
    })

    if (status === "loading") {
        return <div>Loading...</div>
    }

    return children
}
