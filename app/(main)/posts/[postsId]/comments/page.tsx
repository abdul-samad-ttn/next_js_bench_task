import { redirect } from "next/navigation";
import CommentsList from "@/components/comments/CommentsList";
import CommentsListSkeleton from "@/components/comments/CommentsListSkeleton";
import { Suspense } from "react";
import { getPostById, getPosts } from "@/lib/api/posts";

interface CommentsPageProps {
    params: Promise<{ postsId: string }>;
}

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((p) => ({ postsId: String(p.id) }));
}

const CommentsListContent = async ({params}: CommentsPageProps) => {
    const { postsId } = await params;
    const post = await getPostById(Number(postsId));
    if (!post) {
        redirect(`/posts/${postsId}`);
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">
                Comments for Post -{" "}
                <span className="text-gray-500">{post.title}</span>
            </h1>
            <Suspense fallback={<CommentsListSkeleton />}>
                <CommentsList postsId={postsId} />
            </Suspense>
        </div>
    );
}

const CommentsPage = ({params}: CommentsPageProps) => {
    return (
        <Suspense fallback={<CommentsListSkeleton />}>
            <CommentsListContent params={params} />
        </Suspense>
    );
};

export default CommentsPage;
