# Group routing (route groups)

Route groups organize the `app` directory using folders wrapped in **parentheses**: `(groupName)`. The group name is **not** part of the URL.

Official reference: [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

---

## Convention

| On disk | In the browser |
|---------|----------------|
| `app/(main)/about/page.tsx` | `/about` |
| `app/(marketing)/about/page.tsx` | `/about` (conflict if both define the same path!) |
| `app/(shop)/cart/page.tsx` | `/cart` |

Parentheses mean: **“organize code here; do not add a URL segment.”**

---

## Why use route groups?

1. **Section layout** — Different `layout.tsx` files for marketing vs app, without `/marketing` in the URL.
2. **Multiple root layouts** — You can give each group its own root `<html>` / `<body>` (advanced; requires removing a single top-level root layout).
3. **Team / feature boundaries** — `(main)`, `(admin)`, `(auth)` keep trees readable.
4. **Opt-in loading or error UI** — Put `loading.tsx` inside a group so only some routes get that skeleton.

---

## This project: `(main)`

Most learning routes live under **`app/(main)/`**:

```
app/
  layout.tsx                 → root layout (all routes)
  (main)/
    layout.tsx               → navigation + container
    page.tsx                 → /
    about/page.tsx           → /about
    posts/...                → /posts/...
    docs/[[...slug]]/page.tsx → /docs/...
```

Users see **`/posts`**, not `/(main)/posts`. The group only affects **which layout file** wraps those pages.

`(main)/layout.tsx` imports `MenuNavigation` and wraps children in `<main className="container mx-auto py-4">`.

---

## Route groups vs dynamic segments

| Syntax | Purpose |
|--------|---------|
| `(main)` | Organization; **no** URL segment |
| `[postsId]` | Dynamic **URL** segment |
| `[[...slug]]` | Optional catch-all **URL** segments |

Do not confuse `(folder)` with `[folder]`—one is invisible in the URL, the other is a path parameter.

---

## Private folders (related)

Folders prefixed with **`_`** (e.g. `_components`) are **private**: not part of routing. Use them for colocated helpers.

Your docs content folder `routingDocs/` is a normal colocated folder (not a route until a `page.tsx` exists inside it). It is served via the parent **`docs/[[...slug]]/page.tsx`** once you load files by slug.

---

## Multiple layouts at the same URL level

You **cannot** have two `page.tsx` files that resolve to the same URL in different groups (e.g. two `/about` pages). Groups split the tree so each public path exists in **one** place.

You **can** have different layouts for siblings by grouping:

```
app/
  (withNav)/
    layout.tsx    → includes nav
    dashboard/page.tsx
  (bare)/
    layout.tsx    → minimal chrome
    login/page.tsx
```

Both groups sit at the `app` level; URLs stay `/dashboard` and `/login`.

---

## Checklist

- Folder name is `(something)` with parentheses.
- URL paths ignore the group name.
- Each group may define its own `layout.tsx` (and other special files).
- Avoid duplicate URLs across groups.

---

## Related topics

- **Nested routing** — how `(main)/posts/...` builds `/posts/...`.
- **Parallel routing** — another way to split UI (slots), not the same as route groups.
