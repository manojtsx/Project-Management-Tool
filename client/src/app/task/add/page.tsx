import AddTask from "@/app/components/AddTask";

export default function Home(){
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Add Task</h1>
            <AddTask />
        </div>
    )
}