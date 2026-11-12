# Nested routing

In the App Router, **folders map to URL segments**, and **nesting folders nests URLs**. Each segment can define its own `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`.

Official reference: [Defining Routes](https://nextjs.org/docs/app/building-your-application/routing/defining-routes)

---

## URL ↔ folder mapping

| Folder path under `app/` | URL |
|--------------------------|-----|
| `(main)/page.tsx` | `/` |
| `(main)/about/page.tsx` | `/about` |
| `(main)/posts/page.tsx` | `/posts` |
| `(main)/posts/[postsId]/page.tsx` | `/posts/:postsId` |
| `(main)/posts/[postsId]/comments/page.tsx` | `/posts/:postsId/comments` |

Parentheses in `(main)` are **route groups** (omitted from the URL)—see the group routing doc.

---

## What makes a route “real”?

A URL segment is only **public** when that segment (or a child) has a **`page.tsx`** or **`route.ts`**. Folders alone do not create a page.

You can colocate non-route files (markdown, components, CSS modules) next to `page.tsx`; they are not routes by themselves.

---

## Layout nesting

`layout.tsx` wraps **all child segments** and **preserves state** across navigations within that subtree (unlike `template.tsx`, which remounts).

Render order for a visit to `/posts/1/comments`:

```
app/layout.tsx                    ← root (html/body)
  └── (main)/layout.tsx           ← nav + main container
        └── posts/layout.tsx      ← posts-specific chrome
              └── [postsId]/...   ← page content for post + comments
```

In this project:

- **`app/layout.tsx`** — root HTML shell.
- **`app/(main)/layout.tsx`** — shared `MenuNavigation` and `main` wrapper.
- **`app/(main)/posts/layout.tsx`** — layout only for the `/posts` tree.

Child pages render where `{children}` is placed in each layout.

---

## Special files per segment

| File | Role |
|------|------|
| `page.tsx` | UI for that URL |
| `layout.tsx` | Shared UI + `{children}` for nested routes |
| `loading.tsx` | Suspense fallback while segment loads |
| `error.tsx` | Error boundary for that segment |
| `not-found.tsx` | UI when `notFound()` is called in that subtree |

Example: `app/(main)/posts/[postsId]/not-found.tsx` handles invalid post IDs inside the posts branch.

---

## Deep linking in this repo

From a post page you can link deeper into the same nested tree:

```
/posts/{postsId}                    → post detail
/posts/{postsId}/comments           → comments list
/posts/{postsId}/comments/{commentId} → single comment
```

Each level is its own folder chain; layouts above stay mounted as you navigate down.

---

## Nested + dynamic together

Nested routing is the **default** structure; dynamic folders are just nested folders with bracket names:

```
posts/
  [postsId]/
    page.tsx
    comments/
      page.tsx
      [commentId]/
        page.tsx
```

You get clean URLs without duplicating layout code.

---

## Design tips

1. Put **section-wide** UI in the nearest `layout.tsx` (e.g. posts sidebar in `posts/layout.tsx`).
2. Keep **leaf** pages focused on one screen (`page.tsx` at the deepest folder).
3. Use **route-level** `not-found.tsx` when errors should look different per section.

---

## Related topics

- **Dynamic routing** — `[postsId]`, `[[...slug]]`, and `params`.
- **Group routing** — `(main)` for organization without changing paths.
