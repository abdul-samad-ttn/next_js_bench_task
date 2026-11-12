import Link from "next/link";

const ArchivePageDynamicNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Archive not found</h1>
            <p className="text-gray-500">The archive you are looking for does not exist.</p>
            <Link href="/archive" className="text-blue-500 hover:text-blue-700">Go back to archive</Link>
        </div>
    );
}

export default ArchivePageDynamicNotFound;