"use client"
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import { getUserID } from '../(utils)/user';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userID = getUserID();
type ProjectData = {
  name: string,
  description: string
}
const AddProject: React.FC = () => {
  const router = useRouter();
  //state for handling project data
  const [project, setProject] = useState<ProjectData>({ name: '', description: '' })
  //method for handling project data
  const handleProjectData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedProject = { ...project, [e.target.name]: e.target.value };
    setProject(updatedProject);
  }
  // method for adding project
  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!project.name || !project.description) {
        throw new Error('Please fill all the fields first');
      }
      const response = await fetch(`${apiUrl}api/project/${userID}/user/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      } else {
        toast.success(data.msg);
        router.replace(`/project/${userID}`)
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  return (
    <form onSubmit={addProject} className="max-w-lg mx-auto my-10 p-5 border rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input type="text" name='name' onChange={handleProjectData} value={project.name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea name="description" rows={5} cols={30} onChange={handleProjectData} value={project.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id=""></textarea>
      </div>
      <div className='flex justify-between items-center space-x-4'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Add
        </button>
        <div onClick={() => router.replace(`/project/${userID}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Back
        </div>
      </div>
    </form>
  )
}

export default AddProject