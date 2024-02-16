'use client'
import { useLayoutEffect } from "react"
import { useAuth } from "../utils/AuthContext"
import { redirect } from "next/navigation"



const dashboardPage = () => {
    
  const {user, handleLogout} = useAuth()
  
  useLayoutEffect(()=>{
      if(!user){
        redirect('/')
      }
  })
  console.log('User Data are', user);
  if(user)
  return (
    <div className="min-h-screen flex items-center justify-center text-teal">
  <div className="text-center">
    <h1 className="text-4xl font-extrabold mb-4">Welcome to the Dashboard Page</h1>
    <p className="text-lg mb-6">
      You have an active session {user?.email}
    </p>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
  </div>
</div>

  )
}

export default dashboardPage