import EditTask from "@/app/components/EditTask"
export default function Home({params} : {params :{taskId : string}}){
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Edit Task</h1>
            <EditTask taskId={params.taskId} />
        </div>
    )
}