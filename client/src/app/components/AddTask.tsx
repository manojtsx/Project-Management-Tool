"use client"
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import { getProjectID } from '../(utils)/project';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const projectID = getProjectID();
type TaskData = {
    name: string,
    description: string,
    deadline: string
}
const AddProject: React.FC = () => {
    const router = useRouter();
    //state for handling project data
    const [task, setTask] = useState<TaskData>({ name: '', description: '', deadline: '' })
    //method for handling project data
    const handleTaskData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const updatedTask = { ...task, [e.target.name]: e.target.value };
        setTask(updatedTask);
    }
    // method for adding task
    const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!task.name || !task.description || !task.deadline) {
                throw new Error('Please fill all the fields first');
            }
            const response = await fetch(`${apiUrl}api/task/${projectID}/project/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg);
            } else {
                toast.success(data.msg);
                router.replace(`/task/${projectID}`)
            }
        } catch (err: any) {
            toast.error(err.message)
        }
    }
    return (
        <form onSubmit={addTask} className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg">
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
            <div className='flex justify-between items-center space-x-4'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Add
                </button>
                <div onClick={() => router.replace(`/project/${projectID}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Back
                </div>
            </div>
        </form>
    )
}

export default AddProject