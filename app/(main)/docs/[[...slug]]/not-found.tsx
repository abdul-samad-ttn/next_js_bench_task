import Link from "next/link";

const NotFound = () =>{
    return (
        <div>
            <h1 className="text-2xl font-bold text-red-500">Not Found</h1>
            <p className="text-gray-600">The documentation you are looking for does not exist.</p>
            <Link href="/docs" className="text-blue-500 hover:text-blue-600">Go back to docs</Link>
        </div>
    )
}

export default NotFound;