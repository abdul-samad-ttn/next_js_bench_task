import { notFound, redirect } from "next/navigation";
import { getPostById, getPosts } from "@/lib/api/posts";
import { getCommentById, getComments } from "@/lib/api/comments";
import { Suspense } from "react";
import CommentDetailsSkeleton from "@/components/comments/CommentDetailsSkeleton";

export async function generateStaticParams() {
    const posts = await getPosts();
    const params: { postsId: string; commentId: string }[] = [];
  
    for (const post of posts) {
      const comments = await getComments(post.id);
      for (const c of comments) {
        params.push({ postsId: String(post.id), commentId: String(c.id) });
      }
    }
    return params;
  }

interface CommentDetailsPageProps {
    params: Promise<{commentId: string, postsId: string}>
}

const CommentDetailsPageContent = async ({params}: CommentDetailsPageProps) => {
    const { commentId, postsId } = await params;
    const commentData = await getCommentById(Number(commentId));
    const post = await getPostById(Number(postsId));
    if(!post) {
        redirect(`/posts/${postsId}`);
    }
    if(!commentData || !post || commentData.postId !== Number(postsId)) {
        notFound();
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold"> Post - <span className="text-gray-500">{post?.title}</span></h1>
            <p className="text-gray-500 text-sm">Comment ID: {commentData.id}</p>
            <h3 className="text-gray-700">Title: <span className="text-gray-500">{commentData.name}</span></h3>
            <p className="text-gray-700">Email: <span className="text-gray-500">{commentData.email}</span></p>
            <p className="text-gray-700">Description: <span className="text-gray-500">{commentData.body}</span></p>
        </div>
    )
}

const CommentDetailsPage = ({params}: CommentDetailsPageProps) =>{
    return (
        <Suspense fallback={<CommentDetailsSkeleton />}>
            <CommentDetailsPageContent params={params} />
        </Suspense>
    )
}

export default CommentDetailsPage;