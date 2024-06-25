"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserID } from '../(utils)/user';
import { toast } from 'react-toastify';
const userID = getUserID();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface EditProjectProps {
    projectId: string;
}


const EditProject : React.FC<EditProjectProps> = ({ projectId }) => {
    const router = useRouter();
    //state handler for the project
    const [project, setProject] = useState({
        name: "",
        description: "",
        status: ""
    })

    //method to get the detail of project acc to projectId
    const getProject = async() =>{
        try{
            const response = await fetch(`${apiUrl}api/project/${projectId}`,{
                method : "GET",
                headers :{
                    'Content-Type' : 'application/json'
                }
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.msg);
            }else{
                setProject(data)
            }
        }catch(err : any){
            toast.error(err.message)
        }
    }
    useEffect(()=>{
        getProject();
    },[])
    // method to handle the change in project data
    const handleProjectData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const updatedProject = { ...project, [e.target.name]: e.target.value };
        setProject(updatedProject);
    }
    // method to edit the project
    const editProject = async(e : React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try{
                const response = await fetch(`${apiUrl}api/project/${projectId}/edit`,{
                    method : "PUT",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(project)
                });
                const data = await response.json();
                if(!response.ok){
                    throw new Error(data.msg);
                }else{
                    toast.success(data.msg);
                    router.replace(`/project/${userID}`);
                }
            }catch(err : any){
                toast.error(err.message);
            }
    }
    return (
        <form onSubmit={editProject} className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input type="text" name='name' onChange={handleProjectData} value={project.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea name="description" rows={5} cols={30} onChange={handleProjectData} value={project.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id=""></textarea>
            </div>
        
            <div className='mb-6'>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Edit Status:</label>
                <select name="status" value={project.status} onChange={handleProjectData} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700">
                    <option value="Todo">Todo</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className='flex justify-between items-center space-x-4'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Edit
                </button>
                <div onClick={() => router.replace(`/project/${userID}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Back
                </div>
            </div>
        </form>
    )
}

export default EditProject