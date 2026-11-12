# Next.js Learning Tracker — `next_js_learning`

Track what you have practiced in this repo, what is left, and how far along you are. Update this file as you complete each item (change status and add evidence).

**Related doc:** [PLAN_API_STATIC_DEPLOYMENT.md](./PLAN_API_STATIC_DEPLOYMENT.md) (deployment, mock API, GitHub Pages, Actions).

**Stack in this project:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Turbopack, `cacheComponents` + `partialPrefetching` in `next.config.ts`.

---

## How to use this tracker

### Status legend

| Symbol | Status | Meaning |
|:------:|--------|---------|
| ✅ | **Done** | Implemented and verified locally (counts toward score) |
| 🔶 | **In progress** | Started or partial; polish or verification left (no point until ✅) |
| ⬜ | **Not started** | Not implemented yet |
| ⏸️ | **Deferred** | Optional or blocked by hosting choice (excluded from score target) |

### Evidence column

When you mark something **✅ Done**, add a short note: file path, URL you tested, or command you ran (e.g. `next build`).

### Progress score (quantify)

- Each checklist row is worth **1 point** when status is **✅ Done**.
- **🔶 In progress**, **⬜ Not started**, and **⏸️ Deferred** do **not** add points (turn 🔶 → ✅ when finished).
- **Score** = sum of **✅** across all modules ÷ **57** total rows.

| Module | Max pts | ✅ Done | 🔶 | ⬜ | ⏸️ |
|--------|--------:|--------:|---:|---:|---:|
| M1 — App Router basics | 10 | **9** | 0 | 0 | 1 |
| M2 — Data & API layer | 7 | **7** | 0 | 0 | 0 |
| M3 — UX boundaries (loading/error/404) | 8 | **4** | 0 | 4 | 0 |
| M4 — Caching & metadata | 6 | **1** | 0 | 5 | 0 |
| M5 — Static export & deploy | 7 | **0** | 0 | 7 | 0 |
| M6 — Client vs server & APIs | 4 | **0** | 0 | 3 | 1 |
| M7 — Layout & navigation patterns | 4 | **4** | 0 | 0 | 0 |
| M8 — Housekeeping & quality | 5 | **4** | 0 | 1 | 0 |
| M9 — Forms & add comment | 6 | **0** | 0 | 6 | 0 |
| **Total** | **57** | **29** | **0** | **27** | **2** |

| Metric | Value |
|--------|------:|
| **Points earned** | **29** / 57 |
| **Overall %** | **51%** |
| **Milestone** | 51–75% band — *Route groups + posts layout + docs catch-all*; next: `loading.tsx` / `error.tsx` (S1) |
| **Modules 100% complete** | **M7** (4/4 ✅), **M2** (7/7 ✅) |

*Last self-assessment date:* **2026-11-12** (route group `(main)` + posts breadcrumb layout; docs `[[...slug]]` + routing articles)

---

## Demo application — verified flows

Manual verification on `next dev` (`http://localhost:3000`). Screenshots **2026-11-12** (route group, docs hub) + **2025-11-11** (comments flow).

| Route | Status | What works |
|-------|:------:|------------|
| `/` | ✅ | Home heading; `NEXT_PUBLIC_API_KEY` shown (`app/(main)/page.tsx`); **no** posts breadcrumb |
| `/about` | ✅ | Static copy; shared purple nav; **no** posts breadcrumb (`app/(main)/about/page.tsx`) |
| `/posts` | ✅ | Breadcrumb **Home / Posts**; full list (~100) from API; `py-3` list items (screenshot 2026-11-12) |
| `/posts/1` | ✅ | Same breadcrumb; CSS Module panel; link to comments (screenshot 2026-11-12) |
| `/posts/2` | ✅ | Post title/body; CSS Module panel; link to comments |
| `/posts/2/comments` | ✅ | Post title in heading; 5 comments; “View Comment” links |
| `/posts/2/comments/6` | ✅ | Post context + comment id, name, email, body |
| `/posts/600/comments/1` | ✅ | **404 UI** — “Comment Not Found” (no red error overlay); `notFound()` + `[commentId]/not-found.tsx` |
| `/docs` | ✅ | Docs index — numbered links to five routing articles; empty `slug` on `[[...slug]]` (screenshot 2026-11-12) |
| `/docs/routingDocs/dynamic-routing` | ✅ | Raw Markdown in `<pre>` via `readFile`; `routingDocs/dynamic-routing.md` (screenshot 2026-11-12) |
| `/docs/routingDocs/nested-routing` | ✅ | Same pattern — nested routing article readable (screenshot 2026-11-12) |
| `/docs/routingDocs/group-routing` | ✅ | Group routing article |
| `/docs/routingDocs/parallel-routing` | ✅ | Parallel routing article |
| `/docs/routingDocs/intercepting-routing` | ✅ | Intercepting routing article |
| `/docs/routingDocs/invalid-slug` | 🔶 | Docs segment **404** — `not-found.tsx` + link to `/docs` (code path via `loadDocument` → `notFound()`; optional browser check) |

**End-to-end flow:** Home → Posts → Post detail → Comments list → Comment detail (all via `Link`, `(main)` layout + nav; posts-only breadcrumb under `app/(main)/posts/layout.tsx`).

**Docs flow (2026-11-12):** Nav **Docs** → index → any routing article (`slug` → `routingDocs/<name>.md`); invalid slug → `app/(main)/docs/[[...slug]]/not-found.tsx`.

**404 flow (happy):** Invalid post on nested comment URL → custom not-found UI with root nav still visible (screenshot **2026-11-11**).

| Planned (M9) | Status |
|--------------|:------:|
| Submit new comment on `/posts/[postsId]/comments` (Server Action + form) | ⬜ |

### Dev console / overlay notes (observed, not blockers)

| Observation | Meaning / next learning step |
|-------------|--------------------------------|
| No debug `console.log` in post routes | ✅ M8 — server logs cleaned on list + comments pages |
| Font `.woff2` preload warnings | Common with `next/font`; optional tuning later |
| **Cache disabled** dev badge | Dev cache behavior; pairs with M4 + `loading.tsx` / Suspense |
| Hidden pages in DevTools (`display: none`) | **Expected** with `cacheComponents` + React `<Activity>` (up to 3 routes preserved on navigation); not a layout bug |
| `HMR connected` | Dev hot reload active |

### 404 / error behavior (code vs manual check)

| Item | Code | Browser verify |
|------|:----:|:----------------|
| Invalid post id on post page (e.g. `/posts/600`) | ✅ `http.ts` 404→`null`; `PostPage` → `notFound()` | 🔶 open `/posts/600` — expect post segment `not-found.tsx` |
| Missing post on comment detail (e.g. `/posts/600/comments/1`) | ✅ `getPostById` null → `notFound()` | ✅ **“Comment Not Found”** (screenshot 2026-11-11) |
| Invalid comment id (e.g. `/posts/2/comments/99999`) | ✅ `getCommentById` null → `notFound()` | 🔶 optional same UI check |
| Wrong `postId` for comment (mismatch URL) | ✅ `commentData.postId` check | 🔶 optional |
| API 5xx → `error.tsx` | ⬜ still throws; no `error.tsx` yet | ⬜ |
| Unknown top-level route → `app/not-found.tsx` | ⬜ | ⬜ |
| `next build` / static export | ⬜ | ⬜ |

---

## Learning flow (recommended order)

```text
M1 App Router → M2 Data/API → M3 Loading/Error/404 → M4 Cache/Metadata
    → M9 Forms (add comment) → M5 Static export → M6 Client/API extras → M8 Cleanup
```

You can parallelize M8 housekeeping anytime; finish M3 before leaning hard into M5 if you use `cacheComponents: true`.

**M9 note:** Server Actions + forms need a **Node runtime** (`next dev` / hosted Next). Pure **static export (GitHub Pages)** cannot run Server Actions—you would fall back to client-only submit or a hosted API later.

**You are here:** ✅ **S0** + **route group Lab A** + **docs catch-all lab** complete → 🔶 **S1** (`loading.tsx`, `error.tsx`) → then **S7** (add comment form); parallel/intercept modal **later**.

---

## M1 — App Router & routing (10)

**Subtotal:** **9** ✅ · 0 🔶 · 0 ⬜ · 1 ⏸️ → **9 / 10** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | File-based routes | `app/(main)/page.tsx`, `app/(main)/about/page.tsx` | Verified `/`, `/about` (screenshots 2026-11-12) |
| 1 | ✅ | Dynamic segment | `[postsId]`, optional catch-all `[[...slug]]` | `/posts/1`, `/posts/2`; **`/docs`**, `/docs/routingDocs/*` — `app/(main)/docs/[[...slug]]/page.tsx` + `loadDocument(slug.slice(1))` |
| 1 | ✅ | Nested dynamic routes | Post → comments → comment detail | Verified `/posts/2/comments`, `/posts/2/comments/6` |
| 1 | ✅ | Async `params` (Promise) | `await params` in Server Components | Post, comments, `[commentId]` pages |
| 1 | ✅ | `Link` navigation | Client-side transitions between routes | List → detail → comments → comment |
| 1 | ✅ | Root `layout.tsx` | Shared HTML shell, fonts, global CSS | `app/layout.tsx` — fonts + `<body>{children}</body>` (no duplicate `<main>`) |
| 1 | ✅ | Static `metadata` | Root title/description | `export const metadata` in `app/layout.tsx` |
| 1 | ✅ | Segment `layout.tsx` | Layout only for `/posts` tree (breadcrumbs) | `app/(main)/posts/layout.tsx` — **Home / Posts** on `/posts` and `/posts/1` (verified 2026-11-12) |
| 1 | ✅ | Route groups `(group)` | Organize folders without affecting URL | `app/(main)/` — URLs unchanged; `(main)/layout.tsx` has nav + `container mx-auto py-4` |
| 1 | ⏸️ | Parallel / intercepting routes | Modals, photo feeds pattern | **Read** in `routingDocs/*.md`; runtime slots/intercept not implemented — Lab B on comment modal |

---

## M2 — Data fetching & API service layer (7)

**Subtotal:** **7** ✅ — **module complete**

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | Async Server Components | Page is `async`, fetch on server | All post/comment pages |
| 1 | ✅ | Env-based base URL | Server `API_BASE_URL` + public env on home | `lib/api/config.ts`, `.env`; home shows `NEXT_PUBLIC_API_KEY` |
| 1 | ✅ | Shared HTTP helper | One place for `fetch` + errors | `lib/api/http.ts` (`apiGet`) |
| 1 | ✅ | Typed models | Post/Comment interfaces | `lib/api/types.ts` (`postId` on `Comment`) |
| 1 | ✅ | Service functions | `getPosts`, `getPostById`, `getComments`, `getCommentById` | `lib/api/posts.ts`, `lib/api/comments.ts` |
| 1 | ✅ | External JSON API | JSONPlaceholder `/posts`, `/comments` | 100 posts + 5 comments for post 2 in UI |
| 1 | ✅ | Unify error handling | `null` vs `throw` + `notFound()` consistently | `http.ts`: 404→`null`, else throw; pages call `notFound()` when missing *(optional polish: `Post \| null` return types instead of cast)* |

---

## M3 — Loading, errors, and not-found (8)

**Subtotal:** **4** ✅ · 0 🔶 · 4 ⬜ → **4 / 8** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | `notFound()` API | Abort render, HTTP 404 | Post, comments list, comment detail pages |
| 1 | ✅ | `not-found.tsx` | Segment-specific 404 UI | Posts: `/posts/600/comments/1` → `comments/[commentId]/not-found.tsx`; docs: `docs/[[...slug]]/not-found.tsx` + `notFound()` on missing `.md` |
| 1 | ✅ | `not-found` vs React import | Framework convention, not a normal import | Learned; comment segment UIs avoid invalid `params` usage |
| 1 | ⬜ | `loading.tsx` | Instant fallback while segment loads | None in repo |
| 1 | ⬜ | `<Suspense>` boundaries | Split slow data; works with `cacheComponents` | None |
| 1 | ⬜ | `error.tsx` | Recoverable runtime errors (Client Component) | None; 5xx from `apiGet` still hits default error overlay |
| 1 | ✅ | Comment detail validation | 404 when comment/post missing or wrong `postId` | Code + browser: `/posts/600/comments/1` shows not-found, not runtime overlay |
| 1 | ⬜ | Global `not-found` | `app/not-found.tsx` for unknown routes | Not added |

---

## M4 — Caching, revalidation & metadata (6)

**Subtotal:** **1** ✅ · 0 🔶 · 5 ⬜ → **1 / 6** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | `cacheComponents` / dev cache UX | Runtime data vs prerender; dev overlay | `cacheComponents: true` in `next.config.ts`; “Cache disabled” badge in dev |
| 1 | ⬜ | `fetch` cache options | `cache`, `next.revalidate` | Default fetch in `apiGet` |
| 1 | ⬜ | Tagged revalidation | `revalidateTag` / cache tags (per Next 16 docs) | |
| 1 | ⬜ | `generateMetadata` | Per-post title, OG fields | Browser tab still generic “Create Next App” on `/posts/2` |
| 1 | ⬜ | `generateStaticParams` | Prebuild `/posts/[id]` paths | Required for static export |
| 1 | ⬜ | `instant` / route segment config | Opt in/out of instant static (if needed) | |

---

## M5 — Static export & deployment (7)

**Subtotal:** **0** ✅ · 7 ⬜ → **0 / 7** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ⬜ | `output: 'export'` | `next build` → `out/` | Not in `next.config.ts` yet |
| 1 | ⬜ | Static export + dynamic routes | Must use `generateStaticParams` | See plan § Phase B |
| 1 | ⬜ | Build-time vs client fetch | What works on GitHub Pages | Plan § 2.1 |
| 1 | ⬜ | `basePath` / `assetPrefix` | Project site on `github.io/<repo>/` | If needed for GHP |
| 1 | ⬜ | GitHub Actions: CI | `lint`, `build` on PR | Not in repo |
| 1 | ⬜ | GitHub Actions: deploy Pages | Publish `out/` | Plan Phase C |
| 1 | ⬜ | `.env.example` | Document vars without secrets | |

---

## M6 — Client Components & Route Handlers (4)

**Subtotal:** **0** ✅ · 3 ⬜ · 1 ⏸️ → **0 / 4** points *(⏸️ optional; forms live in **M9**)*

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ⬜ | `"use client"` | When UI needs state/effects | All pages are Server Components |
| 1 | ⬜ | `useParams()` (client) | URL params in client trees | |
| 1 | ⬜ | Client fetch + loading state | Client-side fetch when static export has no server runtime | For GHP after S3 |
| 1 | ⏸️ | Route Handlers `app/api/.../route.ts` | BFF on Node host | Optional alt. to Server Actions; N/A for pure GHP |

---

## M9 — Forms, Server Actions & add comment (6)

**Goal:** On `/posts/[postsId]/comments`, let users **submit a new comment** and learn App Router **forms + Server Actions** (JSONPlaceholder `POST /comments` returns fake success—data is not really stored).

**Subtotal:** **0** ✅ · 6 ⬜ → **0 / 6** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ⬜ | Form UI on comments page | Fields: name, email, body; Tailwind + a11y labels | e.g. `CommentForm` Client Component on `comments/page.tsx` |
| 1 | ⬜ | Server Action (`"use server"`) | Async function runs on server; receives `FormData` | `app/(main)/posts/[postsId]/comments/actions.ts` or colocated action file |
| 1 | ⬜ | `<form action={...}>` | Progressive enhancement; no client `fetch` required | Native submit → Server Action |
| 1 | ⬜ | Pending / feedback UI | `useFormStatus` or `useActionState` while submitting | Disable button, “Submitting…”, success/error message |
| 1 | ⬜ | Validation | Required fields, email shape; return errors from action | Show inline errors without full page crash |
| 1 | ⬜ | POST + refresh list | `fetch` POST to JSONPlaceholder; `revalidatePath` for comments route | New comment appears after refresh/revalidate (demo only) |

**Suggested build order (when you start M9):**

1. `createComment(formData)` Server Action + `lib/api/comments.ts` → `createComment(postId, payload)` with POST.
2. Client form component with `action={createComment.bind(null, postsId)}` or hidden `postId` input.
3. `revalidatePath(\`/posts/${postsId}/comments\`)` after success.
4. Document: JSONPlaceholder does not persist—success is for learning submit flow only.

---

## M7 — Styling & layout patterns (4)

**Subtotal:** **4** ✅ → **4 / 4** points — **module complete**

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | Tailwind CSS v4 | Utility classes in JSX | Posts list, nav, comments (screenshots) |
| 1 | ✅ | CSS Modules | Scoped classes | Post detail panel on `/posts/2` (`Post.module.css`) |
| 1 | ✅ | Turbopack + Tailwind | `turbopack.rules`; avoid breaking `.module.css` | `next.config.ts` (no `as: "*.css"`) |
| 1 | ✅ | Nav in layout shell | Single `MenuNavigation` shared across routes | `app/components/navigation/menuNavigation.tsx` via `(main)/layout.tsx`; purple nav on all demo routes |

---

## M8 — Housekeeping & quality (5)

**Subtotal:** **4** ✅ · 0 🔶 · 1 ⬜ → **4 / 5** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | Remove duplicate routes | Single dynamic folder for posts | Only `app/(main)/posts/[postsId]/`; no `app/posts/[id]/` on disk |
| 1 | ✅ | `lib/` location convention | One canonical root `lib/api/` | All imports `@/lib/api/*`; **no** `app/lib/` folder |
| 1 | ✅ | Remove debug `console.log` | Clean server logs | No `console.log` under `app/` (verified 2026-11-11) |
| 1 | ✅ | Retire `app/data/posts.ts` | No local mock if API-only | `app/data/` removed; data via `lib/api` only |
| 1 | ⬜ | Run lint/typecheck in CI | `npm run lint`, `tsc` | No `.github/workflows` yet |

---

## Suggested sprints (update dates as you go)

| Sprint | Focus | Modules | Status |
|--------|--------|---------|:------:|
| S0 | Routing, API layer, 404 basics, Tailwind/CSS modules, full demo navigation | M1, M2, M7 | ✅ 2025-11-11 |
| S0b | Route group `(main)` + `posts/layout.tsx` breadcrumbs + padding cleanup | M1 | ✅ 2026-11-12 |
| S0c | Docs `[[...slug]]` hub + five `routingDocs/*.md` articles (fs read, raw Markdown) | M1, M3 | ✅ 2026-11-12 |
| S1 | `loading.tsx`, `error.tsx` (404 handling ✅ in code) | M3 | 🔶 **current** |
| S2 | `generateMetadata`, fetch caching, document prerender behavior | M4 | ⬜ |
| S3 | `generateStaticParams`, `output: 'export'`, local `out/` test | M5 | ⬜ |
| S4 | GitHub Actions + Pages (JSONPlaceholder or build-time fetch) | M5 | ⬜ |
| S5 | Client component exercise; optional Route Handlers locally | M6 | ⬜ |
| S6 | `.env.example` + CI lint/typecheck | M8, M5 | ⬜ *(console.log ✅)* |
| S7 | Add comment form: Server Action, validation, `revalidatePath` | M9 | ⬜ |

---

## Concept glossary (quick links)

| Term | One-line meaning |
|------|------------------|
| Server Component | Runs on server; can `await` data; default in App Router |
| `params` as `Promise` | Next 15+; must `await params` (or `use(params)` on client) |
| `notFound()` | Framework signal → nearest `not-found.tsx`, status 404 |
| `loading.tsx` | Shown while segment suspends / loads |
| `error.tsx` | Catches errors in segment; must be client component |
| `generateStaticParams` | Tells build which dynamic URLs to pre-render |
| Static export | No Node at runtime; good for GitHub Pages |
| Server Action | `"use server"` async fn; called from forms or client |
| `revalidatePath` | Bust cache after mutation so lists refresh |
| `useFormStatus` | Pending state for form submit (React / Next forms) |
| Route group `(name)` | Folder for organization; **not** in the URL |
| `[[...slug]]` | Optional catch-all — zero or more URL segments (e.g. `/docs` vs `/docs/a/b`) |
| React `<Activity>` | Hides inactive routes with `display: none` when `cacheComponents` is on |

---

## Session log (optional)

| Date | Duration | Module / topic | What you did | Points earned |
|------|----------|----------------|--------------|---------------|
| 2025-11-11 | — | S0 demo verification | Captured screenshots; confirmed full posts flow + API layer | baseline |
| 2026-11-11 | — | Repo audit | M2 complete; 404 handling; root `lib/`; removed `app/data` | **26** ✅ total |
| 2026-11-11 | — | Cleanup pass | Removed `console.log` from posts + comments pages | **27** ✅ total |
| 2026-11-11 | — | 404 UI verify | Screenshot: `/posts/600/comments/1` → “Comment Not Found” | M3 evidence (no new pts) |
| 2026-11-12 | — | Route group Lab A | `(main)` group; posts breadcrumb layout; padding cleanup; screenshots `/`, `/about`, `/posts`, `/posts/1` | **+2** → **29** ✅ (M1 segment layout + route group) |
| 2026-11-12 | — | Docs catch-all lab (S0c) | `docs/[[...slug]]/page.tsx`; `routingDocs/` (5 articles); index at `/docs`; raw `<pre>` Markdown; `not-found.tsx` | M1/M3 evidence (no new pts — extends existing ✅ rows) |
| | | | | |

---

## Current assessment summary

| Area | Status |
|------|--------|
| **Working demo** | ✅ Posts/comments API flow + **docs hub** (`/docs` → five routing articles) |
| **Strongest modules** | ✅ **M2** + **M7** complete; M1 (**9/10**), M3 (4/8) |
| **In progress** | 🔶 S1: `loading.tsx` + `error.tsx` only |
| **Biggest gaps** | ⬜ M3 loading/error UI, M4 metadata & static params, M5 deploy; M1 parallel/intercept (⏸️) |
| **Score** | **29 / 57 (51%)** |
| **Planned next feature** | ⬜ **S1** first, then **S7** — add comment form (M9) |

**Repo layout (2026-11-12):** `app/layout.tsx` + `app/(main)/` (`page`, `about`, `posts/…`, `docs/[[...slug]]/` + `routingDocs/*.md`, `archive/[...slug]/` stub); `app/components/navigation/` (nav includes **Docs**); `lib/api/` (5 files). No `error.tsx` / `loading.tsx` / M9 forms yet.

**Next 3 actions (recommended):**

1. **S1** — Add `app/(main)/posts/loading.tsx` + `error.tsx` (optional `[postsId]/loading.tsx`); optionally confirm `/posts/600` and `/posts/2/comments/99999` not-found UI.
2. **S6** — Add `.env.example` (`API_BASE_URL`, `NEXT_PUBLIC_*`) and a GitHub Actions workflow for `npm run lint` + build.
3. **S7 (when ready)** — Start M9 row 1–3: form on comments page + Server Action + `POST` to JSONPlaceholder.

**Later (unchanged):** **S2** — `generateMetadata` on post page so tab title matches post (e.g. “qui est esse” on `/posts/2`).

---

*Maintainer: when an item is finished, change **🔶** or **⬜** to **✅**, refresh the module subtotal line, and update the **Progress score** table at the top.*
