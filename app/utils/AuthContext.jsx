'use client'
import { useContext, createContext, useState, useEffect } from "react"
import { account } from "../libs/appwrite"
import { useRouter } from "next/navigation"


const AuthContext = createContext()



export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const router =useRouter()
    
    useEffect(()=>{
        async function getUser(){
            setUser(await account.get())
        }
        getUser()
    },[])
    const handleLoginWithGithub =  () => {
       account.createOAuth2Session('github',
        'http://localhost:3000/dashboard',
        'http://localhost:3000'
        )
      }
    
      const handleLoginWithGoogle = () => {
        account.createOAuth2Session('google',
        'http://localhost:3000/dashboard',
        'http://localhost:3000'
        )
      }
    
    
    
    const handleLogout = async () => {
        await account.deleteSession('current')
        router.push('/')
        setUser()
        
    }
    
    
    

    const data = {
        user,
        handleLogout,
        handleLoginWithGithub,
        handleLoginWithGoogle
    }
    
    

    return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
    )
    
}

export const useAuth = () => { return useContext(AuthContext)}