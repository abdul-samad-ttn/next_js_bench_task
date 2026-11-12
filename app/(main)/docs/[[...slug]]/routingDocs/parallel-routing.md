# Parallel routing

Parallel routes let you render **multiple pages in the same layout** at once using **named slots**. Slots are folders prefixed with `@`, for example `@analytics` and `@team`.

Official reference: [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

---

## Slots and the layout contract

Typical structure:

```
app/
  dashboard/
    layout.tsx          ← receives props: analytics, team, children
    @analytics/
      page.tsx
    @team/
      page.tsx
    page.tsx            ← default “children” slot content
```

The parent `layout.tsx` **must** accept each slot as a prop (name matches the folder without `@`):

```tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
  <>
    {children}
    <div>{analytics}</div>
    <div>{team}</div>
  </>
  );
}
```

Each slot navigates **independently**—you can show different loading and error states per slot.

---

## URLs and slots

Slots do **not** add URL segments. For `app/dashboard/@analytics/page.tsx`, the URL is still under `/dashboard` (often the same path as the main `page.tsx`, with soft navigation updating individual slots).

`children` is the implicit slot for the non-`@` sibling `page.tsx`.

---

## `default.tsx`

When a slot has no active match (e.g. user landed on a URL where that slot is inactive), Next.js looks for **`default.tsx`** inside the slot folder to render a fallback. Without it, you may see empty or error behavior depending on the route.

---

## Use cases

| Pattern | Why parallel routes |
|---------|---------------------|
| Dashboard with sidebar + main | Sidebar is `@nav`, content is `children` |
| Modal + background list | Often combined with **intercepting routes** |
| Independent loading | `@feed/loading.tsx` without blocking `@sidebar` |

---

## Parallel vs nested layouts

| Approach | Multiple UIs on one screen | URL segments |
|----------|----------------------------|--------------|
| Nested `layout.tsx` + one `page.tsx` | Single main column; layouts wrap vertically | One chain of folders |
| Parallel `@slot` | Several **peer** views composed in one layout | Slots hidden from path |

Nested routing in this repo (`(main)` → `posts` → `[postsId]`) is **hierarchical**. Parallel routing is **compositional** at a single segment.

---

## This repo (learning project)

There is **no** `@slot` folder yet. The concepts still apply when you add a dashboard or split docs (e.g. `@toc` table of contents + `children` article body).

Suggested experiment (optional):

```
app/(main)/playground/
  layout.tsx
  @sidebar/page.tsx
  page.tsx
```

Visit `/playground` and practice passing `sidebar` into the layout.

---

## Mental diagram

```
         dashboard/layout.tsx
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
 children    @analytics    @team
 (page)       (page)       (page)
```

All three can fetch data and stream independently on the server.

---

## Related topics

- **Intercepting routing** — often used with slots for modals over a list.
- **Group routing** — `(main)` organizes files; parallel routes compose UI at one URL level.
