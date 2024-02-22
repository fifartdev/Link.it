'use client'
import { useEffect, useLayoutEffect, useState } from "react"
import { useAuth } from "../utils/AuthContext"
import { redirect, useRouter } from "next/navigation"
import { COL_ACCOUNT, COL_LINKS, DB, db, ID, Query } from "../libs/appwrite"


const dashboardPage = () => {
    
  const {user, handleLogout, handleFunctionExecute, getAccountProfile, username, hasUserName, accountId} = useAuth()
  const [name, setName] = useState('')
  const router = useRouter()
  const [taken,setTaken] = useState(false)

  //===============Here Bellow Goes the Code for creating a new link===========//
  const [linkName, setLinkName] = useState('')
  const [url, setUrl] = useState('')
  const handleCreateLink = async (e) => {
    
    e.preventDefault()
    try {
      let user_link_id = user.$id
      await db.createDocument(DB, COL_LINKS, ID.unique(), {
        name: linkName,
        url: url,
        user_id: user_link_id,
        username: username 
      })
      setLinkName('')
      setUrl('')
    } catch (error) {
      console.error(error);
    }
  }

  //===============Here Ends the Code for creating a new link===========//
  
  console.log('Account Profile is: ', accountId);
  const handleCreateName = async (e) => {
    let user_id = user.$id
    e.preventDefault()
    try {
      const checkExist = await db.listDocuments(DB, COL_ACCOUNT, [Query.equal('name',[name.replace(/\s+/g, '').toLowerCase()])]);
      //console.log(checkExist.documents);
      if(checkExist.documents.length > 0 ){ 
        setTaken(true) 
        setName('')
      } else {
        await db.createDocument(DB, COL_ACCOUNT, ID.unique(), { name: name.replace(/\s+/g, '').toLowerCase(), user_id })
        router.refresh('/dashboard')
        getAccountProfile
      }
      
    } catch (error) {
      console.error(error);
      window.alert(error)
    }
  }

  useEffect(()=>{
      if(!user){
        redirect('/')
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
      { hasUserName ? <div>
        <p><span className="font-bold" >Your Link Page Name is:</span> {username}<button onClick={viewUserPage} className="mx-2 bg-green-300 p-1 shadow-sm">Go to UserPage</button></p>
        <h1 className="text-2xl mt-4">Add Links to your Page</h1>
        <form onSubmit={handleCreateLink} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md my-2">
        <input type="text" value={linkName} onChange={(e)=>setLinkName(e.target.value)} placeholder="Input a name for the link" className="w-full p-2 border border-gray-300 rounded-md my-1" required/>
        <input type="text" value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="input the complete URI" className="w-full p-2 border border-gray-300 rounded-md my-1" required/>
        <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add new</button>
      </form>
      
      </div>
      : 
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