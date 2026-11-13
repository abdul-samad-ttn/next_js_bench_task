import PostDetailContent from "@/components/posts/PostDetailContent";
import { Suspense } from "react";
import PostDetailSkeleton from "@/components/posts/PostDetailSkeleton";
import { getPosts } from "@/lib/api/posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ postsId: String(p.id) }));
}

interface PostPageProps {
  params: Promise<{ postsId: string }>;
}

const PostPageContent = async ({ params }: { params: Promise<{ postsId: string }> }) => {
  const { postsId } = await params;
  return <PostDetailContent postsId={postsId} />
}

const PostPage = async ({ params }: PostPageProps) => {

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800">Post Details</h1>
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostPageContent params={params} />
      </Suspense>
    </>
  );
};

export default PostPage;
