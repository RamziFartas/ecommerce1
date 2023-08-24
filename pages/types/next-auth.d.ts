import NextAuth, { DefaultSession } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      token:JWT,
      user:AdapterUser,
      session:Session,
      address: string
    } & DefaultSession["user"]
  }
}