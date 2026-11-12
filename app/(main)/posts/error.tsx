"use client";

import Link from "next/link";

interface PostsListPageErrorProps {
    error: Error;
    reset: () => void;
}

const PostsListPageError = ({error, reset}: PostsListPageErrorProps) =>{ 
    console.error(error);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="text-gray-500">Failed to fetch posts list</p>
            <button onClick={reset} className="text-blue-500 hover:text-blue-700">Try again</button>
            <Link href="/" className="text-blue-500 hover:text-blue-700">Go back to home</Link>
        </div>
    )
};

export default PostsListPageError;