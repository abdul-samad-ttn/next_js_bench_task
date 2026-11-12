# Intercepting routing

Intercepting routes let you show **one route’s UI inside another route’s layout**—commonly a **modal over a list**—while the address bar can still reflect the “background” page. It uses special folder names with **dots**: `(.)`, `(..)`, `(..)(..)`, `(...)`.

Official reference: [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

---

## Intercept convention (folder names)

| Folder pattern | Intercepts relative to |
|----------------|-------------------------|
| `(.)folder` | Same route level |
| `(..)folder` | One level up |
| `(..)(..)folder` | Two levels up |
| `(... )folder` | From `app` root |

The `(.)` syntax is **not** a route group—it is the intercept marker. Compare with `(main)` route groups (organizational, no dots-only meaning).

---

## Soft navigation vs hard navigation

| Navigation type | Intercepted route shows |
|-----------------|-------------------------|
| **Client** click (`<Link>`, `router.push`) from the same app | Often the **modal / overlay** (intercepted view) |
| **Full load** (refresh, open URL in new tab, external link) | Full **page** for that URL (no overlay) |

That is why intercepting works well for “quick preview” UX without losing shareable full URLs.

---

## Typical folder layout (modal pattern)

```
app/
  feed/
    page.tsx                    ← list
    layout.tsx
    @modal/
      default.tsx
      (.)photo/[id]/
        page.tsx                  ← intercept: modal when navigating from /feed
  photo/[id]/
    page.tsx                    ← full page when visited directly
```

- **`/photo/123` opened directly** → `photo/[id]/page.tsx` (full screen).
- **Click from `/feed`** → `@modal/(.)photo/[id]/page.tsx` inside feed layout (overlay).

Parallel slot `@modal` holds the intercepted UI; see the parallel routing doc.

---

## Requirements and pitfalls

1. **Matching structure** — Intercepted paths must mirror the target route’s segments (`(.)photo/[id]` ↔ `photo/[id]`).
2. **`default.tsx` on slots** — Parallel modal slots usually need `default.tsx` when the modal is closed.
3. **Layouts** — Parent layout must render the modal slot (e.g. `{modal}`) above or beside `{children}`.
4. **Not in this repo yet** — Intercepting is an **add-on** pattern; your current `posts` and `docs` trees use standard nested routes only.

---

## How it differs from route groups

| Feature | Route group `(name)` | Intercept `(.)segment` |
|---------|----------------------|-------------------------|
| Purpose | Organize files, omit URL segment | Hijack navigation to render elsewhere |
| URL | Unchanged by group name | Target URL can still exist for hard navigation |
| Appears in path? | No | Intercept folders are not URL segments |

---

## How it differs from dynamic routing

Dynamic folders (`[id]`, `[[...slug]]`) define **what** appears in the URL. Intercepting folders define **how** a matched route is **rendered** when navigating from a sibling or parent context.

This repo’s **`docs/[[...slug]]`** route is a good place to **link** to full doc pages; an intercept could later open a doc in a modal from a docs index without leaving the index layout.

---

## Learning exercise (optional)

1. Add `app/(main)/photos/page.tsx` (gallery grid).
2. Add `app/(main)/photos/[id]/page.tsx` (full photo).
3. Add `app/(main)/photos/@modal/(..)photos/[id]/page.tsx` or same-level `(.)` per official diagram—match your folder depth carefully.
4. Use `<Link href={`/photos/${id}`}>` from the gallery and confirm modal vs full page behavior.

---

## Related topics

- **Parallel routing** — `@modal` and other slots.
- **Nested routing** — base list and detail pages intercepting builds on.
- **Dynamic routing** — `[id]` in both full and intercepted paths.
