"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { storeProjectID, removeProjectID } from '../(utils)/project';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface ProjectProps {
  userId: string;
}
type ProjectData = {
  _id: string,
  name: string,
  description: string,
  status: string,
  progress: string
}
const Project: React.FC<ProjectProps> = ({ userId }) => {
  removeProjectID();
  const router = useRouter();

  const [project, setProject] = useState<ProjectData[]>([])
  // method to get all the projects
  const getAllProjects = async () => {
    try {
      const response = await fetch(`${apiUrl}api/project/${userId}/user`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.msg);
      } else {
        setProject(data.validProjects)
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  useEffect(() => {
    getAllProjects();
  }, [])

  // store the project id and navigate on clicking name
  const storeProjectIDandNavigate = (id: string) => {
    storeProjectID(id);
    router.replace(`/task/${id}`)
  }

  // method to delete Project
  const deleteProject = async(id : string) =>{
    try{
      const response = await fetch(`${apiUrl}api/project/${id}/delete`,{
        method : "DELETE",
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.msg);
      }else{
        toast.success(data.msg);
        // Call getAllProjects again to update the component
        await getAllProjects();
      }
    }catch(err : any){
      toast.error(err.message)
    }
  }
  return (
    <div className="space-y-4">
      {
        project.map((item, index) => {
          return (
            <div className="bg-white shadow-md rounded-lg p-6 relative" key={index}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" onClick={() => storeProjectIDandNavigate(item._id)}>{item.name}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <p className={`px-4 py-1 rounded-full text-sm font-semibold ${item.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {item.status}
                </p>
                <p>{item.progress}%</p>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button onClick={()=> router.replace(`/project/edit/${item._id}`)} className="flex items-center justify-center p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150">
                  <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                </button>
                <button onClick={()=> deleteProject(item._id)} className="flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150">
                  <FontAwesomeIcon icon={faTrashAlt} className="w-5 h-5" />
                </button>
              </div>
            </div>
          )
        })
      }
      <button onClick={() => router.replace(`/`)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  )
}

export default Project