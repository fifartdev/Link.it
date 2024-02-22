'use client'
import { useContext, createContext, useState, useEffect } from "react"
import { account, functions } from "../libs/appwrite"
import { useRouter } from "next/navigation"
import { COL_ACCOUNT, DB, db, Query } from "../libs/appwrite"


const AuthContext = createContext()



export const AuthProvider = ({children}) => {
    const [docs, setDocs] = useState([])
    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)
    const [hasUserName,setHasUserName] = useState(false)
    const [accoundId,setAccountId] = useState('')
    const router =useRouter()


    const getAccountProfile = async () => {
        try {
          const data = await db.listDocuments(DB, COL_ACCOUNT, [Query.equal('user_id',[user.$id])])
          setDocs(data.documents)
          setUsername(docs[0].name)
          setAccountId(docs[0].$id)
        } catch (error) {
          console.error(error);
        }
      }

    
    useEffect(()=>{
        async function getUser(){
            try {
                setUser(await account.get())
            } catch (error) {
                console.log(error);
            }
           
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
    
    const handleFunctionExecute = async () => {
        try {
            const result = await functions.createExecution('65d25a9f327bd4b10a23')
            console.log('Results: ', result.responseBody);
        } catch (error) {
            console.error(error);
        }
        
    }
    useEffect(()=>{
        getAccountProfile()
        if(docs.length > 0){
          setHasUserName(true)
        } 
        
      })
      
    const data = {
        user,
        handleLogout,
        handleLoginWithGithub,
        handleLoginWithGoogle,
        handleFunctionExecute,
        getAccountProfile,
        username,
        hasUserName,
        accoundId
    }
    
    

    return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
    )
    
}

export const useAuth = () => { return useContext(AuthContext)}