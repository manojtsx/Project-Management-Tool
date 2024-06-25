"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProjectID } from '../(utils)/project';
import { toast } from 'react-toastify';
const projectID = getProjectID();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface EditTaskProps {
    taskId: string;
}


const EditTask : React.FC<EditTaskProps> = ({ taskId }) => {
    const router = useRouter();
    //state handler for the task
    const [task, setTask] = useState({
        name: "",
        description: "",
        deadline: "",
        status: ""
    })

    //method to get the detail of task acc to taskId
    const getTask = async() =>{
        try{
            const response = await fetch(`${apiUrl}api/task/${taskId}`,{
                method : "GET",
                headers :{
                    'Content-Type' : 'application/json'
                }
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.msg);
            }else{
                // convert deadline to the correct format
                if(data.deadline){
                    const formattedDeadline = new Date(data.deadline).toISOString().slice(0,16); //Convert to YYY-DDDTHH:MM format
                    data.deadline = formattedDeadline;
                }
                setTask(data)
            }
        }catch(err : any){
            toast.error(err.message)
        }
    }
    useEffect(()=>{
        getTask();
    },[])
    // method to handle the change in task data
    const handleTaskData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const updatedUser = { ...task, [e.target.name]: e.target.value };
        setTask(updatedUser);
        console.log(updatedUser)
    }
    // method to edit the task
    const editTask = async(e : React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try{
                const response = await fetch(`${apiUrl}api/task/${taskId}/edit`,{
                    method : "PUT",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(task)
                });
                const data = await response.json();
                if(!response.ok){
                    throw new Error(data.msg);
                }else{
                    toast.success(data.msg);
                    router.replace(`/task/${projectID}`);
                }
            }catch(err : any){
                toast.error(err.message);
            }
    }
    return (
        <form onSubmit={editTask} className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input type="text" name='name' onChange={handleTaskData} value={task.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea name="description" rows={5} cols={30} onChange={handleTaskData} value={task.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id=""></textarea>
            </div>
            <div className='mb-6'>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline:</label>
                <input type="datetime-local" name="deadline" id="deadline" onChange={handleTaskData} value={task.deadline} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div className='mb-6'>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Edit Status:</label>
                <select name="status" value={task.status} onChange={handleTaskData} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700">
                    <option value="Todo">Todo</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className='flex justify-between items-center space-x-4'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Edit
                </button>
                <div onClick={() => router.replace(`/task/${projectID}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Back
                </div>
            </div>
        </form>
    )
}

export default EditTask