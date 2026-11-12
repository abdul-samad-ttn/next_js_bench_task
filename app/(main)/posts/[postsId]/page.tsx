
import { notFound } from "next/navigation";
import styles from "./Post.module.css";
import Link from "next/link";
import { getPostById } from "@/lib/api/posts";

interface PostPageProps {
  params: Promise<{ postsId: string }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { postsId } = await params;


  const post = await getPostById(Number(postsId));
  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post: {post?.title}</h1>
      <p className={styles.content}>Description: {post?.body}</p>
      <Link href={`/posts/${postsId}/comments`} className="text-blue-500 mt-4">Check the comments for this post</Link>
    </div>
  );
};

export default PostPage;
