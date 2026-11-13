import { getComments } from "@/lib/api/comments";
import { getPostById } from "@/lib/api/posts";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import CommentsList from "@/components/comments/CommentsList";
import CommentsListSkeleton from "@/components/comments/CommentsListSkeleton";
import { Suspense } from "react";

const CommentsPage = async ({ params }: { params: Promise<{ postsId: string }> }) => {
    const { postsId } = await params;

    const post = await getPostById(Number(postsId))
    if (!post) {
        redirect(`/posts/${postsId}`);
    }

    return (
            <div className="p-4">
                <h1 className="text-2xl font-bold">Comments for Post - <span className="text-gray-500">{post?.title}</span></h1>
                <Suspense fallback={<CommentsListSkeleton />}>
                    <CommentsList postsId={postsId} />
                </Suspense>
            </div>
    );
};

export default CommentsPage;