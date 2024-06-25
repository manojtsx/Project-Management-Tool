import EditProject from "@/app/components/EditProject"
export default function Home({params} : {params :{projectId : string}}){
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Edit Task</h1>
            <EditProject projectId={params.projectId} />
        </div>
    )
}