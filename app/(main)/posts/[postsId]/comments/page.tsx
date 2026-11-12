import { getComments } from "@/lib/api/comments";
import { getPostById } from "@/lib/api/posts";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const CommentsPage = async ({ params }: { params: Promise<{ postsId: string }> }) => {
    const { postsId } = await params;

    const post = await getPostById(Number(postsId))
    if (!post) {
        redirect(`/posts/${postsId}`);
    }

    const comments = await getComments(Number(postsId));
    if (!comments || comments.length === 0) {
        notFound();
    }

    return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Comments for Post - <span className="text-gray-500">{post?.title}</span></h1>
                <ul className="list-disc list-outside pl-6">
                    {comments.map((comment: { id: number; name: string; email: string; body: string }) => (
                        <li key={comment.id} className="border-b border-gray-200">
                            <h3 className="text-lg font-bold">Title: <span className="text-gray-500">{comment.name}</span></h3>
                            <p className="text-gray-700 text-sm">Email: <span className="text-gray-500">{comment.email}</span></p>
                            <Link href={`/posts/${postsId}/comments/${comment.id}`} className="text-blue-500 hover:text-blue-700">View Comment</Link>
                        </li>
                    ))}
                </ul>
            </div>
    );
};

export default CommentsPage;