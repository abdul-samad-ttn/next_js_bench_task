
import { notFound } from "next/navigation";
// import styles from "./Post.module.css";
// import Link from "next/link";
import { getPostById } from "@/lib/api/posts";
import PostDetailContent from "@/components/posts/PostDetailContent";
import { Suspense } from "react";
import PostDetailSkeleton from "@/components/posts/PostDetailSkeleton";

interface PostPageProps {
  params: Promise<{ postsId: string }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { postsId } = await params;


  // const post = await getPostById(Number(postsId));
  // if (!post) {
  //   notFound();
  // }

  return (
   <>
   <h1 className="text-2xl font-bold text-gray-800">Post Details</h1>
   <Suspense fallback={<PostDetailSkeleton />}>
   <PostDetailContent postsId={postsId} />
   </Suspense>
   </>
  );
};

export default PostPage;
