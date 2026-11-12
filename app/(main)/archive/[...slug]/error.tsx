"use client";
import Link from "next/link";

interface ArchiveDynamicPageErrorProps {
    error: Error;
    reset: () => void;
}

const ArchiveDynamicPageError = ({error, reset}: ArchiveDynamicPageErrorProps) => {
    console.error(error);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-gray-500">Failed to fetch archive dynamic page</p>
            <button onClick={reset} className="text-blue-500 hover:text-blue-700">Try again</button>
            <Link href="/archive" className="text-blue-500 hover:text-blue-700">Go back to archive</Link>
        </div>
    )

};

export default ArchiveDynamicPageError;