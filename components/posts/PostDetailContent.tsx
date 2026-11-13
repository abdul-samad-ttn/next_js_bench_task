import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/api/posts";
import styles from "@/app/(main)/posts/[postsId]/Post.module.css";

interface PostDetailContentProps {
  postsId: string;
}

const PostDetailContent = async ({ postsId }: PostDetailContentProps) => {
  const post = await getPostById(Number(postsId));
  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post: {post?.title}</h1>
      <p className={styles.content}>Description: {post?.body}</p>
      <Link href={`/posts/${postsId}/comments`} className="text-blue-500 mt-4">
        Check the comments for this post
      </Link>
    </div>
  );
};

export default PostDetailContent;
