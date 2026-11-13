import { getComments } from "@/lib/api/comments";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IComment } from "@/lib/api/types";

const CommentsList = async ({ postsId }: { postsId: string }) => {
  const comments = await getComments(Number(postsId));
  if (!comments || comments.length === 0) {
    notFound();
  }

  if(process.env.NODE_ENV === 'development') {
   await new Promise(resolve => setTimeout(resolve, 1500));
  }

  return (
    <ul className="list-disc list-outside pl-6">
      {comments.map(
        (comment: IComment) => (
          <li key={comment.id} className="border-b border-gray-200">
            <h3 className="text-lg font-bold">
              Title: <span className="text-gray-500">{comment.name}</span>
            </h3>
            <p className="text-gray-700 text-sm">
              Email: <span className="text-gray-500">{comment.email}</span>
            </p>
            <Link
              href={`/posts/${postsId}/comments/${comment.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              View Comment
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default CommentsList;
