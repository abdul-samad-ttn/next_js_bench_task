import Link from "next/link";

const CommentNotFound = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Comment Not Found</h1>
            <Link href={`/posts`} className="text-blue-500">Back to posts list</Link>
        </div>
    )
}

export default CommentNotFound;