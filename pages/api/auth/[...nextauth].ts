import NextAuth, {  NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from "next"

export async function auth(req: NextApiRequest, res: NextApiResponse){
  if(req.query.nextauth?.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }}
const adminEmails = ['rfartas83@gmail.com'];
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
    session: ( { session}) => {
      if (adminEmails.includes(session?.user?.email as string)) {
        return session;
      } else {
        throw new Error('You Do not Have Access ');
      }
    }
  }
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes((session as any)?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}