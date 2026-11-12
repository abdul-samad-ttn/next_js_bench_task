import { notFound } from "next/navigation";
import Link from "next/link";
import path from "node:path";
import { readFile } from "node:fs/promises";

const ROUTING_DOCS_PATH = path.join(
  process.cwd(),
  "app/(main)/docs/[[...slug]]/routingDocs",
);

const DOC_LINKS = [
  {
    href: "/docs/routingDocs/dynamic-routing",
    label: "Dynamic Routing",
    description:
      "Dynamic Routing is a way to create routes that are not statically defined in the file system.",
  },
  {
    href: "/docs/routingDocs/nested-routing",
    label: "Nested Routing",
    description:
      "Nested Routing is a way to create routes that are nested within other routes.",
  },
  {
    href: "/docs/routingDocs/group-routing",
    label: "Group Routing",
    description:
      "Group Routing is a way to create routes that are grouped together.",
  },
  {
    href: "/docs/routingDocs/intercepting-routing",
    label: "Intercepting Routing",
    description:
      "Intercepting Routing is a way to create routes that are intercepted by a middleware.",
  },
  {
    href: "/docs/routingDocs/parallel-routing",
    label: "Parallel Routing",
    description:
      "Parallel Routing is a way to create routes that are parallel to each other.",
  },
];

const loadDocument = async (slug: string[]) => {
  try {
    const docPath = slug.slice(1).join("/");
    const filePath = path.join(ROUTING_DOCS_PATH, docPath + ".md");
    return await readFile(filePath, "utf-8");
  } catch (error) {
    throw new Error(`Failed to load document: ${error}`);
  }
};

interface DocsPageProps {
  params: Promise<{ slug?: string[] }>;
}

const DocsPage = async ({ params }: DocsPageProps) => {
  const { slug } = await params;
  if (!slug || !slug?.length) {
    return (
      <div className="space-y-4">
        <h1>Docs</h1>
        <ol className="list-decimal list-inside">
          {DOC_LINKS.map((doc) => (
            <li key={doc.href}>
              <Link key={doc.href} className="hover:underline" href={doc.href} title={doc.description}>
                {doc.label}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  let content: string;

  try {
    content = await loadDocument(slug);
  } catch (error) {
    return notFound();
  }

  return (
    <pre className="whitespace-pre-wrap break-words text-sm font-mono leading-relaxed">
      {content}
    </pre>
  );
};

export default DocsPage;
