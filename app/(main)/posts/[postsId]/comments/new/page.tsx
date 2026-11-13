import Link from "next/link";
import { Suspense } from "react";
import CommentsForm from "@/components/comments/forms/commentsForm/CommentsForm";
import { getPosts } from "@/lib/api/posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    postsId: post.id.toString(),
  }));
}

interface CommentsNewPageProps {
  params: Promise<{ postsId: string }>;
}

const CommentNewPageContent = async ({
  params,
}: {
  params: Promise<{ postsId: string }>;
}) => {
  const { postsId } = await params;

  return (
    <div className="space-y-4 p-4">
      <Link
        href={`/posts/${postsId}`}
        className="text-sm text-blue-500 hover:underline"
      >
        Back to post
      </Link>
      <CommentsForm postsId={postsId} />
    </div>
  );
};

const CommentNewPage = ({ params }: CommentsNewPageProps) => {
  return (
    <Suspense fallback={<p className="p-4 text-gray-500">Loading…</p>}>
      <CommentNewPageContent params={params} />
    </Suspense>
  );
};

export default CommentNewPage;
