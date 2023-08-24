import NextAuth, {  NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import { MongoClient } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from "next"

export async function auth(req: NextApiRequest, res: NextApiResponse){
  if(req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    )
  }}
const adminEmails = ['rfartas83@gmail.com'];
// Define the types for your user and session objects
let client;
const uri = process.env.MONGODB_URI;
const options = {};
const authOptions:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ( { session,token}) => {
      if (adminEmails.includes(session?.user?.email as string)) {
        return session;
      } else {
        throw new Error('You Do not Have Access ');
      }
    }
  }
};
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb


if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri as string, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise  == global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri as string, options);
  clientPromise as Promise<MongoClient> === client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes((session as any)?.user?.email)) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}