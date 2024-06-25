"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";
import {storeUserID, removeUserID} from '@/app/(utils)/user'
import { removeProjectID } from "../(utils)/project";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
type User = {
    name ?: string,
    username : string,
    password : string
}
const Login = () => {
    const router = useRouter();
    removeUserID();
    removeProjectID();
    // handle state for user
    const [user, setUser] = useState<User>({
        username : "",
        password : ""
    });

    // handle the change of data in login form
    const handleLoginFormData = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const changedUser = {...user, [e.target.name] : e.target.value};
        setUser(changedUser);
    }
    
    // handle the submit data
    const loginUser = async(e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            console.log(user);
            const response = await fetch(`${apiUrl}api/auth/login`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            });
            const data = await response.json();
            if(!response.ok){
                if(response.status === 401){
                    toast.error(data.msg)
                }
                throw new Error(data.msg);
            }else{
                toast.success(data.msg);
                console.log(data)
                router.replace(`project/${data.user._id}`)
                storeUserID(data.user._id);
            }
        }catch(err : any){
            toast.error(err.msg);
        }
    }
  return (
    <form onSubmit={loginUser} className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
    <div className="mb-4">
        <label htmlFor="username" className="block mb-2 font-bold">Username :</label>
        <input type="text" name="username" value={user.username} onChange={handleLoginFormData} className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div className="mb-4">
        <label htmlFor="password" className="block mb-2 font-bold">Password :</label>
        <input type="password" name="password" value={user.password} onChange={handleLoginFormData} className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">Login</button>
</form>
  )
}

export default Login