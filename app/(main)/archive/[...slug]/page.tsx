import { getPostById, getPosts } from "@/lib/api/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ArchivePageDynamicLoading from "./loading";

export async function generateStaticParams() {
  const posts = await getPosts();
  return [
    { slug: ["posts"] },
    ...posts.map((p) => ({ slug: ["posts", String(p.id)] })),
  ];
}
interface ArchivePageDynamicProps {
  params: Promise<{ slug?: string[] }>;
}

const ArchivePageDynamicContent = async ({ params }: ArchivePageDynamicProps) => {
  const { slug } = await params;
  if (!slug || !slug.length) {
    return notFound();
  }
  if (slug[0] !== "posts") {
    return notFound();
  }

  if (slug[0] === "posts" && slug.length === 1) {
    const postsList = await getPosts();
    if (!postsList?.length) {
      return notFound();
    }
    return (
        <>
        <h1>Posts List</h1>
      <ol className="list-decimal list-inside" start={1}>
        {postsList.map((post) => (
          <li key={post.id} className="border-b border-gray-200 py-3 px-0">
            <Link
              href={`/archive/posts/${post.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ol>
      </>
    );
  }
  if (slug[0] === "posts" && slug.length === 2) {
    const postId = Number(slug[1]);
    if(Number.isNaN(postId)) {
      return notFound();
    }
    const post = await getPostById(postId);
    if (!post) {
      return notFound();
    }
    return (
      <div>
        <h1 className="text-2xl font-bold">Title: {post.title}</h1>
        <p className="text-gray-500">Body: {post.body}</p>
      </div>
    );
  }
  return notFound();
}

const ArchivePageDynamic = async ({ params }: ArchivePageDynamicProps) => {
  return (
    <Suspense fallback={<ArchivePageDynamicLoading />}>
      <ArchivePageDynamicContent params={params} />
    </Suspense>
  )
};

export default ArchivePageDynamic;
