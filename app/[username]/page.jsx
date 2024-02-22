'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/AuthContext";
import { COL_LINKS, DB, db, Query } from "../libs/appwrite"
import { useEffect, useState } from "react";
import Link from "next/link";

const userPage = ({params}) => {
    const [links,setLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    console.log(params);
    const router = useRouter()
    const goBack = async () => {
        router.push('/dashboard')
    }

    const getLinks = async () => {
        setLoading(true)
        const result = await db.listDocuments(DB, COL_LINKS, [Query.equal('username',[params.username])])
        setLinks(result.documents)
        setLoading(false)
    }

    useEffect(()=>{
        getLinks()
        //console.log(links);
    },[])

  if(loading)
  return (
    <>
        <h1 className="text-3xl font-bold mb-8 border-b-2 border-white"><Link href={`/${params.username}`}>{params.username}</Link></h1>
        <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full border-t-4 border-white border-opacity-75 h-12 w-12 mt-5"></div>
            <span className="ml-3 text-white">Loading...</span>
        </div>
    </>
    

    )

    
  return (
        <>
        {user && <button className="bg-black text-white p-2 rounded-sm" onClick={goBack}>Add More Links</button>}
        <h1 className="text-3xl font-bold mb-8 border-b-2 border-white"><Link href={`/${params.username}`}>{params.username}</Link></h1>
        
        <ul>
        {links ? links.map((l)=>{
            return <li><Link href={l.url} target='_blank'>{l.name}</Link></li>
        }) : <li>No Links in this account</li> }
        </ul>
        </>    
        
       
  )
}

export default userPage