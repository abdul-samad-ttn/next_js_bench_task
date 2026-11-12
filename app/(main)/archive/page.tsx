import Link from "next/link";

const ArchivePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Archive</h1>
            <Link href="/archive/posts/" className="text-blue-500 hover:text-blue-700">Posts List</Link>
        </div>
    )
}

export default ArchivePage;