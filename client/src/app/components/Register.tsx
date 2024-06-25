"use client"
import { useState } from "react"
import { toast } from "react-toastify"
import {useRouter} from 'next/navigation'
import { removeUserID } from "../(utils)/user"
import { removeProjectID } from "../(utils)/project"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
type User = {
    name : string,
    username : string,
    password : string
}
const Register = () => {
    const router = useRouter();
    removeUserID();
    removeUserID();
    const [user, setUser] = useState<User>({
        username : "",
        name : "",
        password : ""
    });
    // handling user register form data
    const handleRegisterFormData = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const changedUser = {...user, [e.target.name] : e.target.value};
        setUser(changedUser);
    }

    // register user on submitting form
    const registerUser = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${apiUrl}api/auth/register`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.msg);
            }else{
                toast.success(data.msg);
                router.replace('/login')
            }
        }catch(err : any){
            toast.error(err.message)
        }
    }

  return (
    <form onSubmit={registerUser} className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
    <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold">Name :</label>
        <input type="text" name="name" value={user.name} onChange={handleRegisterFormData} className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div className="mb-4">
        <label htmlFor="username" className="block mb-2 font-bold">Username :</label>
        <input type="text" name="username" value={user.username} onChange={handleRegisterFormData} className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <div className="mb-4">
        <label htmlFor="password" className="block mb-2 font-bold">Password :</label>
        <input type="password" name="password" value={user.password} onChange={handleRegisterFormData} className="w-full p-2 border border-gray-300 rounded-md" />
    </div>
    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700">Login</button>
</form>
  )
}

export default Register