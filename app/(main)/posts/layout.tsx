import Link from "next/link";

interface PostsLayoutProps {
    children: React.ReactNode;
}

const PostsLayout = ({children}: PostsLayoutProps) => {

    return (
        <div className="space-y-4">
            <nav aria-label="Breadcrumb" className="text-sm text-gray-600 border-b p-2">
                <Link className="hover:underline" href="/">Home</Link> {" / "}
                <Link className="hover:underline font-medium text-gray-900" href="/posts">Posts</Link>
            </nav>
            {children}
        </div>
    );
}

export default PostsLayout;