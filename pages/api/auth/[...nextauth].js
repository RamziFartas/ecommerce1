import NextAuth_URL, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import cors from "cors"

const adminEmails= ['rfartas83@gmail.com'];
export const authOptions= {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: (session,token,user)=> {
    if(adminEmails.includes(session?.user?.email)){
      return session;
    }else{
      return false;
    }
    },
  }
}
export default cors()(NextAuth_URL(authOptions));
export async function isAdminRequest(req,res){
const session= await getServerSession(req,res,authOptions);
if(!adminEmails.includes(session?.user?.email)){
res.status(401);
res.end();  
throw 'not an admin';
}
}