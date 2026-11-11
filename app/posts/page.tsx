import Link from "next/link";
import { getPosts } from "@/lib/api/posts";

const PostsPage = async() => {
  const postsList = await getPosts();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Posts Page</h1>
      <ol className="list-decimal list-inside" start={1}>
        {postsList.map((post) => (
          <li key={post.id} className="border-b border-gray-200 p-4">
            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700">{post.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PostsPage;