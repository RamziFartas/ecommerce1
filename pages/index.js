import Layout from "@/components/layout"
import { useSession } from "next-auth/react";
export default function Home(){
const{data: session}= useSession();
return <Layout>
<div className="flex justify-between">
<h2>Hello, <b>{session?.user?.name}</b></h2>
<div className="flex bg-gray-300 gap-1 text-gray-900 rounded-lg overflow-hidden">
<img src={session?.user?.image} alt="" className="w-8 h-8 "></img>
<span className="px-2">
{session?.user?.name}
</span>
</div>
</div>
</Layout>

}
