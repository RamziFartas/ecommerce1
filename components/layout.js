import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/nav";
import { useState } from "react";
import Logo from "@/components/logo";
export default function Layout({children}) {
  const [showNav,setShowNav]= useState(false);
  const { data: session } = useSession();
  if(!session){
  return (
  <div className="bg-emerald-700 w-screen h-screen flex items-center">
  <div className="text-center w-full text-gray-700">
  <button onClick={() => signIn('google')} className="p-2 px-4 bg-white rounded-lg">Login With Google</button>
  </div>
  </div>)
  }
  return(
  <div className="bg-emerald-700 min-h-screen">
    <div className=" md:hidden flex items-center p-2">
    <button onClick={()=> setShowNav(true)}>
    <svg className="h-6 w-6 text-white" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    </button>
    <div className="flex grow justify-center mr-6">
    <Logo/>
    </div>
    </div>
  <div className="flex min-h-screen">
    <Nav show={showNav}/>
  <div className="bg-white text-gray-900 flex-grow my-2 mx-2 md:ml-0 rounded-md p-4">
    {children}
  </div>
  </div>
  </div> 
  )

  
}