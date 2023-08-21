import NextAuth, {  getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise  from '/Users/Solid_State/Desktop/Web 2.0/Full Stack/ecom-store FrontEnd/ecommerce1/lib/mongodb'

const adminEmails: string[] = ['rfartas83@gmail.com'];
// Define the types for your user and session objects
interface session {
  email: string;
  // Add other user properties here
  user:string;
}


const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: (session, token, user) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
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