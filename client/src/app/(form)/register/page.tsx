import Link from "next/link";
import Register from "../../components/Register";

export default function Home() {

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Register - Project Management Tool</h1>
          <Register />
          <p className="mt-4 text-center text-gray-600">If you have already got an account, <Link href='/' className="text-blue-500">Click Here...</Link></p>
        </div>
      </div>
    </>
  );
}
