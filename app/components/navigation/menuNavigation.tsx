import Link from "next/link";
import "@/app/globals.css";

const MenuNavigation = () => {
  return (
    <>
    <nav className="bg-purple-500 p-4 text-white">
        <ul className="flex gap-4">
            <li className="hover:text-blue-200"><Link href="/">Home</Link></li>
            <li className="hover:text-blue-200"><Link href="/about">About</Link></li>
            <li className="hover:text-blue-200"><Link href="/posts">Posts</Link></li>
            <li className="hover:text-blue-200"><Link href="/docs">Docs</Link></li>
            <li className="hover:text-blue-200"><Link href="/archive">Archive</Link></li>
        </ul>
    </nav>
    </>
  );
};

export default MenuNavigation;