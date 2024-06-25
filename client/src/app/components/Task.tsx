"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { getUserID } from '../(utils)/user';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
interface TaskProps {
  projectId: string;
}
type TaskData = {
  _id : string,
  name: string,
  description: string,
  status: string,
  deadline: string
}
const Task: React.FC<TaskProps> = ({ projectId }) => {
  const router = useRouter();
  const [task, setTask] = useState<TaskData[]>([])
  // method to get all the tasks
  const getAllTasks = async () => {
    try {
      const response = await fetch(`${apiUrl}api/task/${projectId}/project`, {
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
        setTask(data.validTasks)
      }
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  useEffect(() => {
    getAllTasks();
  }, []);

  // method to delete all tasks
  const deleteTask = async(id : string) =>{
    try{
      const response = await fetch(`${apiUrl}api/task/${id}/delete`,{
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
        // Call getAllTasks again to update the component
        await getAllTasks();
      }
    }catch(err : any){
      toast.error(err.message)
    }
  }
  return (
    <div className="space-y-4">
      {
        task.map((item, index) => {
          // Convert deadline string into a Date object
          const deadlineDate = new Date(item.deadline);
          // Format the data as per your requirement, eg : MM/DD/YYY
          const formattedDeadline = deadlineDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour : '2-digit',
            minute : '2-digit',
            second : '2-digit'
          })
          return (
            <div className="bg-white shadow-md rounded-lg p-6 relative" key={index}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <p className={`px-4 py-1 rounded-full text-sm font-semibold ${item.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {item.status}
                </p>
                <p>{formattedDeadline}</p>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button onClick={()=>router.replace(`/task/edit/${item._id}`)} className="flex items-center justify-center p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150">
                  <FontAwesomeIcon icon={faEdit} className="w-5 h-5" />
                </button>
                <button onClick={()=>deleteTask(item._id)} className="flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150">
                  <FontAwesomeIcon icon={faTrashAlt} className="w-5 h-5" />
                </button>
              </div>
            </div>
          )
        })
      }
      <button onClick={() => router.replace(`/project/${getUserID()}`)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back
      </button>
    </div>
  )
}

export default Task