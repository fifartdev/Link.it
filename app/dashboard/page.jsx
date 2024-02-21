'use client'
import { useEffect, useLayoutEffect, useState } from "react"
import { useAuth } from "../utils/AuthContext"
import { redirect, useRouter } from "next/navigation"
import { COL_ACCOUNT, DB, db, ID, Query } from "../libs/appwrite"


const dashboardPage = () => {
    
  const {user, handleLogout, handleFunctionExecute} = useAuth()
  const [name, setName] = useState('')
  const [docs, setDocs] = useState([])
  const router = useRouter()
  const [hasUserName,setHasUserName] = useState(false)
  const [taken,setTaken] = useState(false)
  const [username, setUsername] = useState('')

  const handleCreateName = async (e) => {
    let user_id = user.$id
    e.preventDefault()
    try {
      const checkExist = await db.listDocuments(DB, COL_ACCOUNT, [Query.equal('name',[name.replace(/\s+/g, '').toLowerCase()])]);
      console.log(checkExist.documents);
      if(checkExist.documents.length > 0 ){ 
        setTaken(true) 
        setName('')
      } else {
        await db.createDocument(DB, COL_ACCOUNT, ID.unique(), { name: name.replace(/\s+/g, '').toLowerCase(), user_id })
        router.refresh('/dashboard')
        getAccountProfile()
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const getAccountProfile = async () => {
    try {
      const data = await db.listDocuments(DB, COL_ACCOUNT, [Query.equal('user_id',[user.$id])])
      setDocs(data.documents)
      setUsername(docs[0].name)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
      if(!user){
        redirect('/')
      }
  })

  useEffect(()=>{
    getAccountProfile()
    if(docs.length > 0){
      setHasUserName(true)
    } 
  })
  // console.log('Docs are: ', docs.length);

  const viewUserPage = async () => {
    router.push(`/${username}`)
  }


  if(user)
  return (
    <div className="min-h-screen flex items-center justify-center text-teal">
  <div className="text-center">
    <h1 className="text-4xl font-extrabold mb-4">Welcome to the Dashboard Page</h1>
    <p className="text-lg mb-6">
      You have an active session {user?.email}
    </p>
      { hasUserName ? <p><span className="font-bold" >Your Link Page Name is:</span> {username}<button onClick={viewUserPage} className="mx-2 bg-green-300 p-1 shadow-sm">Go to UserPage</button></p>: 
      <form onSubmit={handleCreateName} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Choose your name" className="w-full p-2 border border-gray-300 rounded-md" required/>
        { taken && <div className="max-w-md mx-auto p-2 text-red-500 my-2"><p>This name is taken. Try with another one <button onClick={()=>setTaken(false)} className="text-blue-500">X</button></p></div> }
        <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
      </form>
}
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 my-4"
        onClick={handleLogout}
      >
        Logout
      </button>
  </div>
</div>

  )
}

export default dashboardPage