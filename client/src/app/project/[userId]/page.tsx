import Project from "@/app/components/Project"
import Link from "next/link";
export default function Home({ params }: { params: { userId: string } }) {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-6 flex justify-between mx-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">All Projects</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href="/project/add" >
                        Add Project
                    </Link>
                </button>
            </div>

            <Project userId={params.userId} />
        </div>
    )
}