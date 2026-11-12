# Dynamic routing

Dynamic routes let one `page.tsx` handle **many URLs** by naming folder segments with square brackets. The matched URL pieces are passed to your page as **`params`**.

Official reference: [Dynamic Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

---

## Three bracket patterns

| Folder name | Name | Example URLs | `params` shape |
|-------------|------|--------------|----------------|
| `[segment]` | Single dynamic segment | `/posts/1`, `/posts/42` | `{ segment: "1" }` |
| `[...segment]` | Catch-all (one or more) | `/archive/2024`, `/archive/2024/q1` | `{ segment: ["2024", "q1"] }` |
| `[[...segment]]` | Optional catch-all (zero or more) | `/docs`, `/docs/a`, `/docs/a/b` | `{ segment: undefined }` or `{ segment: ["a", "b"] }` |

Rules of thumb:

- **`[id]`** — exactly one extra path segment.
- **`[...slug]`** — at least one segment after this folder (catch-all is required).
- **`[[...slug]]`** — this segment can be empty (index) or many segments.

Param names come from the folder name: `[postsId]` → `params.postsId`.

---

## Accessing `params` in the App Router

In this project, route `params` are a **Promise** (Next.js 15+). Await them in Server Components:

```tsx
interface PageProps {
  params: Promise<{ postsId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { postsId } = await params;
  return <h1>Post {postsId}</h1>;
}
```

Dynamic values are always **strings** (even if they look like numbers). Parse when you need numbers: `Number(postsId)`.

---

## Examples in this repo

| File | URL | Dynamic part |
|------|-----|--------------|
| `app/(main)/posts/[postsId]/page.tsx` | `/posts/1` | `postsId` |
| `app/(main)/posts/[postsId]/comments/[commentId]/page.tsx` | `/posts/1/comments/3` | `postsId`, `commentId` |
| `app/(main)/docs/[[...slug]]/page.tsx` | `/docs`, `/docs/routingDocs/dynamic-routing` | optional `slug` array |
| `app/(main)/archive/[...slug]/page.tsx` | `/archive/a/b` (required segments) | `slug` array |

Opening **`/docs`** works because `[[...slug]]` allows **no** extra segments. Opening **`/archive`** alone would **not** match `[...slug]` until you add a `page.tsx` at `archive/` or use optional catch-all.

---

## `not-found` and invalid IDs

When `params` point to missing data, call `notFound()` from `next/navigation`. This repo uses that pattern on post pages and supplies route-level `not-found.tsx` files under `posts/`.

---

## Static generation hints

For `[id]` routes you can export `generateStaticParams()` to prebuild known IDs at build time. Catch-all docs often stay fully dynamic unless you list every path.

---

## Mental model

```
URL path:     /posts / 42 / comments / 7
              ─────   ──   ─────────   ─
Folders:      posts  [postsId]  comments  [commentId]
```

Each bracket folder consumes one or more URL segments and exposes them on `params`—your page decides what to render.

---

## Related topics

- **Nested routing** — how multiple folders stack (`routingDocs/nested-routing.md` when served).
- **Group routing** — `(main)` does not appear in the URL (`routingDocs/group-routing.md`).
