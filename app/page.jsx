'use client'
import { FaGithub, FaGoogle } from "react-icons/fa6"
import { useAuth } from "./utils/AuthContext";
import { useLayoutEffect } from "react"; 
import { redirect } from "next/navigation";

export default function Home() {

  const { handleLoginWithGithub, handleLoginWithGoogle, user } = useAuth()

  useLayoutEffect(()=>{
    if(user){
      redirect('/dashboard')
    }
})

if(!user)
  return (
    
      <div className="flex items-center flex-col">
  <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
  
  <button
    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-300 hover:text-black my-2 flex-row flex align-middle"
    onClick={handleLoginWithGithub}
  >
   <FaGithub size={30} className="mx-2" /> Login with GitHub
  </button>
  
  <button
    className="bg-green-900 text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-black my-2 flex-row flex align-middle"
    onClick={handleLoginWithGoogle}
  >
   <FaGoogle size={30} className="mx-2" /> Login with Google
  </button>
</div>
  );
}
