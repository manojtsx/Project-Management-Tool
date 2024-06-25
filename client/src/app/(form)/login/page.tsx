import Link from "next/link";
import Login from "../../components/Login";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Login - Project Management Tool</h1>
          <Login />
          <p className="mt-4 text-center text-gray-600">Do you have an account? If no, <Link href='/register' className="text-blue-500">Click Here...</Link></p>
        </div>
      </div>
    </>
  );
}