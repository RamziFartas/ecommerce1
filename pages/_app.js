import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session} basePath="/componentns/layout/api/auth">
      <Component {...pageProps}/>
    </SessionProvider>
  )
}