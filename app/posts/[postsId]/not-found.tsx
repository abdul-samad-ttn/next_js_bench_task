import Link from "next/link";

const NotFound = () => {
  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-red-500">Page Not Found</h1>
      <p className="text-gray-500">The page you are looking for does not exist.</p>
      <Link href="/posts" className="text-blue-500 hover:text-blue-700">Go back to posts page</Link>
    </div>
  );
};

export default NotFound;