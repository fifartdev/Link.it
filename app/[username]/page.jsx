'use client'
import { useRouter } from "next/navigation";

const userPage = ({params}) => {
    console.log(params);
    const router = useRouter()
    const goBack = async () => {
        router.push('/dashboard')
    }
  return (
    <div>
        <button className="bg-red-600 text-white p-2 rounded-sm" onClick={goBack}>Go Back</button>
        <h1 className="text-2xl py-3">{params.username}</h1>
        </div>
  )
}

export default userPage