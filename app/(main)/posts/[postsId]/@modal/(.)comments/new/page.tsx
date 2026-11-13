import { Suspense } from "react";
import { getPosts } from "@/lib/api/posts";
import ModalCloseButton from "@/components/modalCloseButton/ModalCloseButton";
import CommentsFormModalHost from "@/components/comments/forms/commentsForm/CommentsFormModalHost";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    postsId: post.id.toString(),
  }));
}

interface CommentsNewModalProps {
  params: Promise<{ postsId: string }>;
}

const CommentNewModalContent = async ({
  params,
}: {
  params: Promise<{ postsId: string }>;
}) => {
  const { postsId } = await params;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <ModalCloseButton />
        <CommentsFormModalHost postsId={postsId} />
      </div>
    </div>
  );
};

const CommentNewModalPage = ({ params }: CommentsNewModalProps) => {
  return (
    <Suspense fallback={null}>
      <CommentNewModalContent params={params} />
    </Suspense>
  );
};

export default CommentNewModalPage;
