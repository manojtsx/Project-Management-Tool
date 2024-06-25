import Task from "@/app/components/Task";
import Link from "next/link";

export default function Home({params} : {params : {projectId : string}}){
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-6 flex justify-between mx-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">All Tasks</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/task/add" >
                        Add Task
                    </Link>
                </button>
            </div>

            <Task projectId={params.projectId} />
        </div>
    )
}