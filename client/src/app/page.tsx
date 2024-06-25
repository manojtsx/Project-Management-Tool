"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Corrected import path

export default function Home() {
    const router = useRouter();
    useEffect(() => {
            router.replace('/login');
    }, [router]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <h1 className="text-xl font-semibold text-gray-800">Redirecting to Login...</h1>
        </div>
    );
}