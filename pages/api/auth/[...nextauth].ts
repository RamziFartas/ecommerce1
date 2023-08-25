import NextAuth, {  NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from "next"

 async function auth(req: NextApiRequest, res: NextApiResponse){
  const session = await getServerSession(req,res,authOptions);
  if(req.query.nextauth?.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }}
// Define the types for your user and session objects
const uri = process.env.MONGODB_URI;
const authOptions:NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
   async session({ session, token, user }) {
      return session;
      }
    }
  }

const handler= NextAuth(authOptions);
export {handler as GET,handler as POST};