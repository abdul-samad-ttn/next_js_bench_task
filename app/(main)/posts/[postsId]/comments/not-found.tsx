
import Link from "next/link";
const CommentsNotFound = () => {
    return (
        <div>
            <h1>There are no comments for this post</h1>
            <Link href={`/posts`} className="text-blue-500">Back to posts list</Link>
        </div>
    );
};

export default CommentsNotFound;