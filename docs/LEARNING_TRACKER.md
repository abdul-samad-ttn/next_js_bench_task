# Next.js Learning Tracker — `next_js_learning`

Track what you have practiced in this repo, what is left, and how far along you are. Update this file as you complete each item (change status and add evidence).

**Related doc:** [PLAN_API_STATIC_DEPLOYMENT.md](./PLAN_API_STATIC_DEPLOYMENT.md) (deployment, mock API, GitHub Pages, Actions).

**Stack in this project:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Turbopack. Dev: `cacheComponents` + `partialPrefetching`; **GitHub Pages build** uses `output: 'export'` (those flags omitted when `GITHUB_ACTIONS=true`).

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
| M1 — App Router basics | 10 | **10** | 0 | 0 | 0 |
| M2 — Data & API layer | 7 | **7** | 0 | 0 | 0 |
| M3 — UX boundaries (loading/error/404) | 8 | **7** | 0 | 1 | 0 |
| M4 — Caching & metadata | 6 | **2** | 0 | 4 | 0 |
| M5 — Static export & deploy | 7 | **5** | 0 | 0 | 2 |
| M6 — Client vs server & APIs | 4 | **2** | 0 | 1 | 2 |
| M7 — Layout & navigation patterns | 4 | **4** | 0 | 0 | 0 |
| M8 — Housekeeping & quality | 5 | **4** | 0 | 1 | 0 |
| M9 — Forms & add comment | 6 | **5** | 0 | 1 | 0 |
| **Total** | **57** | **46** | **0** | **8** | **3** |

| Metric | Value |
|--------|------:|
| **Points earned** | **46** / 57 |
| **Overall %** | **81%** |
| **Milestone** | 76–90% band — **Vercel production** live from **`main`**; **Option B** Suspense on dynamic routes; next: **global not-found**, **CI lint**, **GHP** without intercept routes |
| **Modules 100% complete** | **M1** (10/10 ✅), **M7** (4/4 ✅), **M2** (7/7 ✅) |

*Last self-assessment date:* **2026-11-13** — Vercel [deploy](https://next-js-bench-task-89nzov8xv-abdul-samad-ttns-projects.vercel.app/) + alias [blush.vercel.app](https://next-js-bench-task-blush.vercel.app); GHP **https://abdul-samad-ttn.github.io/next_js_bench_task/**

---

## Demo application — verified flows

Manual verification on `next dev` (`http://localhost:3000`) and **Vercel Production** (**2026-11-13** screenshots). Earlier: **2026-11-12** (route group, docs hub, **archive**) + **2025-11-11** (comments flow).

### Production — Vercel (Node, `cacheComponents: true`)

| Item | Status | Evidence |
|------|:------:|----------|
| `npm run build` + `npm run start` (local) | ✅ | Same flags as Vercel; **not** `npx serve build` (wrong folder) |
| Deploy from Git branch **`main`** | ✅ | Manual **Create Deployment** → `main` @ `e3f6433` (merge PR #3 / `form-actions`); avoid redeploying old **`api_and_dynamic_routing`** commits |
| Production URL | ✅ | **Primary alias:** [next-js-bench-task-blush.vercel.app](https://next-js-bench-task-blush.vercel.app) |
| Deploy reference (2026-11-13) | ✅ | **This build:** [next-js-bench-task-89nzov8xv-abdul-samad-ttns-projects.vercel.app](https://next-js-bench-task-89nzov8xv-abdul-samad-ttns-projects.vercel.app/) (`main`, Option B smoke test) |
| `/`, `/posts`, `/posts/2`, `/posts/3/comments` | ✅ | Nav, list, post detail, comments list — screenshots **2026-11-13** |
| `/docs`, `/docs/routingDocs/nested-routing` | ✅ | Docs index + markdown article on Vercel |
| Option B (params/fetch inside `<Suspense>`) | ✅ | `[postsId]/page.tsx`, comments tree, `[commentId]`, `posts/page.tsx`, `docs/[[...slug]]`, `archive/[...slug]` |
| Intercept modal add comment | 🔶 | Works on **`next dev`** / Vercel soft nav — verify on live URL when testing modal |
| Env on Vercel | 🔶 | Set `API_BASE_URL` + `NEXT_PUBLIC_API_BASE_URL` → `https://jsonplaceholder.typicode.com` if not already |

**Vercel settings checked:** **Settings → Environments → Production → Branch Tracking = `main`**.

### Production — GitHub Pages (static export)

| Route | Status | What works |
|-------|:------:|------------|
| `/` | ✅ | Home heading; `NEXT_PUBLIC_API_KEY` shown (`app/(main)/page.tsx`); **no** posts breadcrumb |
| `/about` | ✅ | Static copy; shared purple nav; **no** posts breadcrumb (`app/(main)/about/page.tsx`) |
| `/posts` | ✅ | Breadcrumb **Home / Posts**; full list (~100) from API; `py-3` list items (screenshot 2026-11-12) |
| `/posts/1` | ✅ | Breadcrumb; shell **Post Details** + `PostDetailSkeleton` → CSS Module panel + comments link (`Suspense`, screenshot 2026-11-13) |
| `/posts/2` | ✅ | Post title/body; CSS Module panel; **Add comment** + comments links (`PostDetailContent`, screenshot 2026-11-13) |
| `/posts/2/comments` | ✅ | Post title in `<h1>` (page); `CommentsListSkeleton` → list; inline **`CommentsForm`** at bottom (`Suspense`, screenshot 2026-11-13) |
| `/posts/5` → **Add comment** (soft nav) | ✅ | Intercept modal `@modal/(.)comments/new`; URL `…/comments/new`; post detail behind overlay; success toast; `router.back()` closes modal (screenshot 2026-11-13) |
| `/posts/5/comments/new` (hard nav) | ✅ | Full-page `comments/new/page.tsx` + `CommentsForm` (new tab / refresh — no overlay) |
| `/posts/2/comments/6` | ✅ | Post context + comment id, name, email, body |
| `/posts/600` | ✅ | **Page Not Found** — `[postsId]/not-found.tsx` (screenshot 2026-11-12) |
| `/posts/600/comments` | ✅ | Missing post → **`redirect(\`/posts/${postsId}\`)`** → `/posts/600` → **Page Not Found** (screenshot 2026-11-12) |
| `/posts/1/comments/9999` | ✅ | Invalid comment → **Comment Not Found** + `[commentId]/not-found.tsx` (screenshot 2026-11-12) |
| `/posts/600/comments/9999` | ✅ | Missing post → **redirect** to `/posts/600` → post **Page Not Found** (see `[commentId]/page.tsx`) |
| `/posts/600/comments/1` | ✅ | Missing post → **redirect** → `/posts/600` **Page Not Found** (same as comments list) |
| `/posts` (loading) | ✅ | **Loading Posts List…** + spinner; breadcrumb stays — `posts/loading.tsx` (screenshot 2026-11-12) |
| `/posts/1` (loading) | ✅ | Segment **`[postsId]/loading.tsx`** on nav; then inline **`PostDetailSkeleton`** under shell (screenshot 2026-11-13) |
| `/posts/1/comments` (loading) | ✅ | Segment **`comments/loading.tsx`** until post title ready; then **`CommentsListSkeleton`** + list (screenshot 2026-11-13) |
| `/posts/1/comments/1` (loading) | ✅ | **Loading Comments Details…** — `comments/[commentId]/loading.tsx` (screenshot 2026-11-12) |
| `/posts` (API/list failure) | ✅ | `getPosts` throw → `posts/error.tsx` + **Try again** (reproduced earlier 2026-11-12) |
| `/docs` | ✅ | Docs index — numbered links to five routing articles; empty `slug` on `[[...slug]]` (screenshot 2026-11-12) |
| `/docs/routingDocs/dynamic-routing` | ✅ | Raw Markdown in `<pre>` via `readFile`; `routingDocs/dynamic-routing.md` (screenshot 2026-11-12) |
| `/docs/routingDocs/nested-routing` | ✅ | Same pattern — nested routing article readable (screenshot 2026-11-12) |
| `/docs/routingDocs/group-routing` | ✅ | Group routing article |
| `/docs/routingDocs/parallel-routing` | ✅ | Parallel routing article |
| `/docs/routingDocs/intercepting-routing` | ✅ | Intercepting routing article |
| `/docs/routingDocs/does-not-exist` | ✅ | Missing `.md` → `loadDocument` throws → `notFound()`; docs `not-found.tsx` + **Go back to docs** (screenshot 2026-11-12) |
| `/docs/random` | ✅ | Wrong slug shape → read fails → same docs 404 UI (screenshot 2026-11-12) |
| `/archive` | ✅ | Hub — **Archive** + link to **Posts List** (`archive/page.tsx`) (screenshot 2026-11-12) |
| `/archive/posts` | ✅ | `slug === ['posts']` → `getPosts()` list; links to `/archive/posts/:id` (screenshot 2026-11-12) |
| `/archive/posts/1` | ✅ | `slug === ['posts','1']` → `getPostById`; title + body (screenshot 2026-11-12) |
| `/archive/posts/600` | ✅ | Missing post → `notFound()` → **Archive not found** (screenshot 2026-11-12) |
| `/archive/posts/2/comments` | ✅ (v1) | `length > 2` → `notFound()` (comments not in archive tree yet) |

**End-to-end flow:** Home → Posts → Post detail → Comments list → Comment detail (all via `Link`, `(main)` layout + nav; posts-only breadcrumb under `app/(main)/posts/layout.tsx`).

**Docs flow (2026-11-12):** Nav **Docs** → index → any routing article (`slug` → `routingDocs/<name>.md`); invalid slug → `app/(main)/docs/[[...slug]]/not-found.tsx`.

**Archive flow (2026-11-12):** Nav **Archive** → hub → **`/archive/posts`** (required catch-all) → post detail via **one** `archive/[...slug]/page.tsx` (`slug.length` 1 vs 2); contrast with nested `/posts/[postsId]/…` folders.

**404 + redirect flow:** Invalid comment → segment `not-found.tsx`. Missing post on **comments list/detail** → `redirect` to `/posts/[id]` → `[postsId]/not-found.tsx` (**Page Not Found**).

**Error flow (S1):** List/API throw → `posts/error.tsx` (`reset`). Archive API throw → `archive/[...slug]/error.tsx` (file present; verify when testing archive + API down).

**Loading flow (S1):** Nav + `posts/layout.tsx` breadcrumb stay mounted. **Full segment** `loading.tsx`: `/posts`, `/posts/.../comments/[commentId]`. **Segment loader + Suspense (2026-11-13):** `/posts/[postsId]` (`PostDetailContent` in `components/posts/`), `/posts/[postsId]/comments` (`CommentsList` in `components/comments/`); inline pulse skeletons; list/detail routes unchanged for posts index + comment detail.

| Planned (M9) | Status |
|--------------|:------:|
| Submit new comment (client `useActionState` + `lib/api/createComment`) | ✅ |
| Intercept modal add-comment from post detail | ✅ |
| Server Action + `revalidatePath` (Node deploy path) | ⬜ |

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
| Invalid post id on post page (e.g. `/posts/600`) | ✅ `getPostById` null → `notFound()` | ✅ **Page Not Found** (screenshot 2026-11-12) |
| Missing post on **comments list** (`/posts/600/comments`) | ✅ `!post` → `redirect(\`/posts/${postsId}\`)` | ✅ **Page Not Found** on `/posts/600` (screenshot 2026-11-12) |
| Missing post on comment detail (`/posts/600/comments/9999`) | ✅ `!post` → **redirect** before comment `notFound()` | ✅ lands on `/posts/600` post not-found |
| Invalid comment, valid post (`/posts/1/comments/9999`) | ✅ `getCommentById` null → `notFound()` | ✅ **Comment Not Found** (screenshot 2026-11-12) |
| Wrong `postId` for comment (mismatch URL) | ✅ `commentData.postId` check | 🔶 optional |
| List fetch failure / `getPosts` throw | ✅ `posts/error.tsx` (`reset`) | ✅ reproduced (screenshot 2026-11-12) |
| Network timeout on fetch | ✅ `fetch` throws → boundary | ✅ when API down (earlier repro) |
| API 5xx → `error.tsx` | ✅ non-404 throw in `http.ts` | 🔶 optional explicit test |
| Unknown top-level route → `app/not-found.tsx` | ⬜ | ⬜ |
| `next build` (Vercel / Node) | ✅ | `npm run build` on `main`; prerender passes after Option B — **2026-11-13** |
| `next build` / static export (GHP) | ✅ | `npm run build:gh-pages` → `out/` (338 routes); **intercept `@modal`** not supported on export — use Vercel for modal or exclude route on GHP build |
| GitHub Pages (production) | ✅ | Actions deploy; home, posts, comments verified **2026-11-13** |
| Loaders / Suspense on GHP | ⏸️ | Pre-rendered HTML — no runtime skeleton on static host (expected) |

**Production base URL:** `https://abdul-samad-ttn.github.io/next_js_bench_task/` (project site; `basePath` + `assetPrefix` in `next.config.ts`).

**Local static preview:** copy `out/*` → `.preview/next_js_bench_task/` then `npx serve .preview` (plain `serve out` breaks CSS paths).

---

## Learning flow (recommended order)

```text
M1 App Router → M2 Data/API → M3 Loading/Error/404 → M4 Cache/Metadata
    → M9 Forms (add comment) → M5 Static export → M6 Client/API extras → M8 Cleanup
```

You can parallelize M8 housekeeping anytime; finish M3 before leaning hard into M5 if you use `cacheComponents: true`.

**M9 note:** Server Actions + forms need a **Node runtime** (`next dev` / hosted Next). Pure **static export (GitHub Pages)** cannot run Server Actions—you would fall back to client-only submit or a hosted API later.

**You are here:** ✅ **S7** client form + intercept modal; ✅ **Vercel production** from **`main`** → ⬜ **S6** CI lint, **M3** global `not-found`, optional **M9** Server Action; **GHP** rebuild without intercept route (or accept modal on Vercel only).

---

## M1 — App Router & routing (10)

**Subtotal:** **10** ✅ · 0 🔶 · 0 ⬜ · 0 ⏸️ → **10 / 10** points — **module complete**

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | File-based routes | `app/(main)/page.tsx`, `app/(main)/about/page.tsx` | Verified `/`, `/about` (screenshots 2026-11-12) |
| 1 | ✅ | Dynamic segment | `[postsId]`, `[[...slug]]`, `[...slug]` | Nested `/posts/[postsId]`; optional **`/docs`** + `routingDocs/*`; required **`/archive/posts`**, `/archive/posts/1` — `archive/[...slug]/page.tsx` branches on `slug.length` |
| 1 | ✅ | Nested dynamic routes | Post → comments → comment detail | Verified `/posts/2/comments`, `/posts/2/comments/6` |
| 1 | ✅ | Async `params` (Promise) | `await params` in Server Components | Inside `<Suspense>` children on dynamic pages; sync page shells pass `params` Promise — verified Vercel build **2026-11-13** |
| 1 | ✅ | `Link` navigation | Client-side transitions between routes | List → detail → comments → comment |
| 1 | ✅ | Root `layout.tsx` | Shared HTML shell, fonts, global CSS | `app/layout.tsx` — fonts + `<body>{children}</body>` (no duplicate `<main>`) |
| 1 | ✅ | Static `metadata` | Root title/description | `export const metadata` in `app/layout.tsx` |
| 1 | ✅ | Segment `layout.tsx` | Layout only for `/posts` tree (breadcrumbs) | `app/(main)/posts/layout.tsx` — **Home / Posts** on `/posts` and `/posts/1` (verified 2026-11-12) |
| 1 | ✅ | Route groups `(group)` | Organize folders without affecting URL | `app/(main)/` — URLs unchanged; `(main)/layout.tsx` has nav + `container mx-auto py-4` |
| 1 | ✅ | Parallel / intercepting routes | Modals, photo feeds pattern | `[postsId]/layout.tsx` + `@modal/default.tsx` + `@modal/(.)comments/new`; full page `comments/new/page.tsx`; soft vs hard nav verified **2026-11-13** |

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
| 1 | ✅ | Unify error handling | `null` vs `throw` + `notFound()` consistently | `http.ts`: 404→`null`; `getPosts` throws if `!posts` → `error.tsx`; `getPostById` returns null → pages `notFound()` |

---

## M3 — Loading, errors, and not-found (8)

**Subtotal:** **7** ✅ · 0 🔶 · 1 ⬜ → **7 / 8** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | `notFound()` API | Abort render, HTTP 404 | Post/comment/detail; empty comments → `comments/not-found.tsx`; missing post on comments → **`redirect`** → post `not-found` |
| 1 | ✅ | `not-found.tsx` | Segment-specific 404 UI | Posts, comment segments; docs + archive; `/posts/600`, `/posts/1/comments/9999` (2026-11-12) |
| 1 | ✅ | `not-found` vs React import | Framework convention, not a normal import | Learned; comment segment UIs avoid invalid `params` usage |
| 1 | ✅ | `loading.tsx` | Instant fallback while segment loads | Four files under `app/(main)/posts/`: `loading.tsx`, `[postsId]/loading.tsx`, `comments/loading.tsx`, `comments/[commentId]/loading.tsx`; verified screenshots 2026-11-12 |
| 1 | ✅ | `<Suspense>` boundaries | Split slow data; works with `cacheComponents` | **Option B:** sync `page.tsx` + `*PageContent` async child; posts tree, docs, archive, posts index; `PostDetailContent`, `CommentsList`, skeletons; **Vercel** + local `npm run start` **2026-11-13** |
| 1 | ✅ | `error.tsx` | Recoverable runtime errors (Client Component) | `app/(main)/posts/error.tsx` — list failure, `reset`, nav + breadcrumb; 404 stays on `not-found.tsx` |
| 1 | ✅ | Comment detail validation | 404 when comment missing or wrong `postId`; missing post → redirect | `/posts/1/comments/9999`; `/posts/600/comments/*` → redirect → post not-found |
| 1 | ⬜ | Global `not-found` | `app/not-found.tsx` for unknown routes | Not added |

---

## M4 — Caching, revalidation & metadata (6)

**Subtotal:** **2** ✅ · 0 🔶 · 4 ⬜ → **2 / 6** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | `cacheComponents` / dev cache UX | Runtime data vs prerender; dev overlay | Enabled on Vercel/`npm run build` (`!(GITHUB_ACTIONS)`); **blocking-prerender** fixed via Suspense; off on `build:gh-pages` |
| 1 | ⬜ | `fetch` cache options | `cache`, `next.revalidate` | Default fetch in `apiGet` |
| 1 | ⬜ | Tagged revalidation | `revalidateTag` / cache tags (per Next 16 docs) | |
| 1 | ⬜ | `generateMetadata` | Per-post title, OG fields | Browser tab still generic “Create Next App” on `/posts/2` |
| 1 | ✅ | `generateStaticParams` | Prebuild dynamic URLs at build | Five segments: `[postsId]`, comments, `[commentId]` (posts 1–5), `docs/[[...slug]]`, `archive/[...slug]`; `build:gh-pages` **338** pages |
| 1 | ⬜ | `instant` / route segment config | Opt in/out of instant static (if needed) | |

---

## M5 — Static export & deployment (7)

**Subtotal:** **5** ✅ · **0** ⬜ · **2** ⏸️ → **5 / 7** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | `output: 'export'` | `next build` → `out/` | `next.config.ts` when `GITHUB_ACTIONS=true`; `package.json` `build:gh-pages` |
| 1 | ✅ | Static export + dynamic routes | Must use `generateStaticParams` | All dynamic `page.tsx` under `(main)`; comment detail prebuilds **first 5 posts** only |
| 1 | ✅ | Build-time vs client fetch | What works on GitHub Pages | JSONPlaceholder via `API_BASE_URL` in Actions; no Node at runtime; loaders/skeletons dev-oriented |
| 1 | ✅ | `basePath` / `assetPrefix` | Project site on `github.io/<repo>/` | `/next_js_bench_task`; live site CSS/JS OK on GHP |
| 1 | ⏸️ | GitHub Actions: CI | `lint`, `build` on PR | **Out of scope for demo** — `deploy-pages.yml` on push `main` is enough; add `ci.yml` only if you want PR gates |
| 1 | ✅ | GitHub Actions: deploy Pages | Publish `out/` | **Working** — `.github/workflows/deploy-pages.yml` (Node 22, `npm run build:gh-pages`, `API_BASE_URL` in job); push **`main`** + Pages source = GitHub Actions; live **https://abdul-samad-ttn.github.io/next_js_bench_task/** verified **2026-11-13** |
| 1 | ⏸️ | `.env.example` | Document vars without secrets | **Ignored for demo** — use local `.env` + README / this tracker (`API_BASE_URL`, `NEXT_PUBLIC_*`, `GITHUB_ACTIONS` for export) |

---

## M6 — Client Components & Route Handlers (4)

**Subtotal:** **2** ✅ · 1 ⬜ · **2** ⏸️ → **2 / 4** points *(forms: **M9**; Route Handlers ⏸️ not needed)*

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | `"use client"` | When UI needs state/effects | `CommentsForm`, `CommentFormSubmitButton`, `CommentsFormModalHost`, `ModalCloseButton`, `createCommentFormAction.ts` |
| 1 | ⬜ | `useParams()` (client) | URL params in client trees | Modal uses server-passed `postsId`; no `useParams` yet |
| 1 | ✅ | Client fetch + loading state | Client-side fetch when static export has no server runtime | `lib/api/http.ts` `apiPost`; `createComment` from client action — JSONPlaceholder POST **201**; `NEXT_PUBLIC_API_BASE_URL` in `config.ts` |
| 1 | ⏸️ | Route Handlers `app/api/.../route.ts` | HTTP API routes on **your** Next server (`GET`/`POST` handlers) | **Not needed for this demo** — data goes **browser/server components → `lib/api` → JSONPlaceholder**; Route Handlers are for hiding keys, shaping responses, or webhooks. Optional later on Vercel only; **no `app/api/` folder by design** |

---

## M9 — Forms, Server Actions & add comment (6)

**Goal:** Submit a new comment via App Router **forms** + React 19 **`useActionState`** (client path works on **GitHub Pages**). Optional follow-up: **`"use server"`** on Node host.

**Subtotal:** **5** ✅ · 0 🔶 · **1** ⬜ → **5 / 6** points

| Pts | Status | Topic | What to learn | Evidence in repo / notes |
|----:|:------:|-------|---------------|---------------------------|
| 1 | ✅ | Form UI on comments page | Fields: name, email, body; Tailwind + a11y labels | `components/comments/forms/commentsForm/CommentsForm.tsx`; on `comments/page.tsx` + modal |
| 1 | ⬜ | Server Action (`"use server"`) | Async function runs on server; receives `FormData` | **Deferred** — using client `submitCommentAction` + `createCommentFormAction` for GHP |
| 1 | ✅ | `<form action={...}>` | Progressive enhancement; form actions | `<form action={boundFormAction}>` + hidden `postsId` |
| 1 | ✅ | Pending / feedback UI | `useFormStatus` or `useActionState` while submitting | `CommentFormSubmitButton` + `useActionState`; `react-hot-toast` + `<Toaster>` in `(main)/layout.tsx` |
| 1 | ✅ | Validation | Required fields; return errors from action | `submitCommentAction` empty-field check; HTML `required` on inputs |
| 1 | ✅ | POST + service layer | `fetch` POST to JSONPlaceholder via `lib/api` | `apiPost` in `http.ts`; `createComment(postId, input)` in `comments.ts`; demo id **501** — list not persisted / no `revalidatePath` yet |

**Implemented stack (2026-11-13):**

1. `submitCommentAction` → `createComment` (`lib/api/comments.ts`).
2. `createCommentFormAction(onSuccess?)` — toast + optional modal close (`router.back()` in `CommentsFormModalHost`).
3. Intercept modal: `PostDetailContent` **Add comment** → `@modal/(.)comments/new`; X via `ModalCloseButton`.
4. JSONPlaceholder does not persist — success toast + modal close is the intended UX.

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
| 1 | ⬜ | Run lint/typecheck in CI | `npm run lint`, `tsc` | `deploy-pages.yml` exists; separate **lint on PR** workflow not added |

---

## Suggested sprints (update dates as you go)

| Sprint | Focus | Modules | Status |
|--------|--------|---------|:------:|
| S0 | Routing, API layer, 404 basics, Tailwind/CSS modules, full demo navigation | M1, M2, M7 | ✅ 2025-11-11 |
| S0b | Route group `(main)` + `posts/layout.tsx` breadcrumbs + padding cleanup | M1 | ✅ 2026-11-12 |
| S0c | Docs `[[...slug]]` hub + five `routingDocs/*.md` articles (fs read, raw Markdown) | M1, M3 | ✅ 2026-11-12 |
| S0d | Archive hub + `[...slug]` posts list/detail (API reuse, `slug` parsing) | M1, M3 | ✅ 2026-11-12 |
| S1 | `loading.tsx`, `error.tsx`, Suspense (404 + redirect ✅) | M3 | ✅ **2026-11-13** — posts tree `loading.tsx` + **`Suspense`** on post detail + comments list; ⬜ global `not-found`; archive `error.tsx` 🔶 verify |
| S2 | `generateMetadata`, fetch caching, document prerender behavior | M4 | ⬜ |
| S3 | `generateStaticParams`, `output: 'export'`, local `out/` test | M5 | ✅ **2026-11-13** — 338 static pages; `.preview/` local serve |
| S4 | GitHub Actions + Pages (JSONPlaceholder build-time fetch) | M5 | ✅ **2026-11-13** — **https://abdul-samad-ttn.github.io/next_js_bench_task/** |
| S5 | Client component exercise; optional Route Handlers locally | M6 | ⏸️ *(not needed — see M6)* |
| S6 | `.env.example` + CI lint/typecheck | M8, M5 | ⏸️ *(demo: GHA deploy ✅; `.env.example` skipped)* |
| S7 | Add comment form: client actions, modal intercept, validation, POST | M9 | ✅ **2026-11-13** — client path + modal on dev/Vercel; Server Action + `revalidatePath` ⬜ |
| S7b | Vercel hosted Next (`main`, Option B, production smoke) | M4, M5 | ✅ **2026-11-13** — **Create Deployment** on `main`; posts/docs/comments on **vercel.app** |

---

## Concept glossary (quick links)

| Term | One-line meaning |
|------|------------------|
| Server Component | Runs on server; can `await` data; default in App Router |
| `params` as `Promise` | Next 15+; must `await params` (or `use(params)` on client) |
| `notFound()` | Framework signal → nearest `not-found.tsx`, status 404 |
| `redirect()` | Server navigation to another URL (e.g. missing post on comments → `/posts/[id]`) |
| `loading.tsx` | Shown while segment suspends / loads |
| `error.tsx` | Catches errors in segment; must be client component |
| `generateStaticParams` | Tells build which dynamic URLs to pre-render |
| Static export | No Node at runtime; good for GitHub Pages |
| Route Handler | `app/api/.../route.ts` — your server exposes HTTP endpoints; demo uses `lib/api` → external API instead |
| Server Action | `"use server"` async fn; called from forms or client |
| `revalidatePath` | Bust cache after mutation so lists refresh |
| `useFormStatus` | Pending state for form submit (React / Next forms) |
| `useActionState` | Form state + `isPending`; pairs with `action={formAction}` (React 19) |
| Parallel `@modal` slot | Second UI tree in same layout; paired with intercept `(.)` routes |
| Intercepting route `(.)segment` | Soft nav → modal slot; hard nav → full `page.tsx` |
| Route group `(name)` | Folder for organization; **not** in the URL |
| `[[...slug]]` | Optional catch-all — zero or more URL segments (e.g. `/docs` vs `/docs/a/b`) |
| `[...slug]` | Required catch-all — **one or more** segments (e.g. `/archive/posts`; hub at `archive/page.tsx` for `/archive`) |
| React `<Activity>` | Hides inactive routes with `display: none` when `cacheComponents` is on |

---

## Session log (optional)

| Date | Duration | Module / topic | What you did | Points earned |
|------|----------|----------------|--------------|---------------|
| 2025-11-11 | — | S0 demo verification | Captured screenshots; confirmed full posts flow + API layer | baseline |
| 2026-11-11 | — | Repo audit | M2 complete; 404 handling; root `lib/`; removed `app/data` | **26** ✅ total |
| 2026-11-11 | — | Cleanup pass | Removed `console.log` from posts + comments pages | **27** ✅ total |
| 2026-11-11 | — | 404 UI verify | Early screenshot: `/posts/600/comments/1` (later superseded by redirect → post not-found) | M3 evidence (no new pts) |
| 2026-11-12 | — | Route group Lab A | `(main)` group; posts breadcrumb layout; padding cleanup; screenshots `/`, `/about`, `/posts`, `/posts/1` | **+2** → **29** ✅ (M1 segment layout + route group) |
| 2026-11-12 | — | Docs catch-all lab (S0c) | `docs/[[...slug]]/page.tsx`; `routingDocs/` (5 articles); index at `/docs`; raw `<pre>` Markdown; `not-found.tsx` | M1/M3 evidence (no new pts — extends existing ✅ rows) |
| 2026-11-12 | — | Archive catch-all lab (S0d) | `archive/page.tsx` hub; `archive/[...slug]/page.tsx` list + detail; NaN + missing post → `notFound()`; screenshots hub, list, `/archive/posts/1` | M1/M3 evidence (no new pts) |
| 2026-11-12 | — | S1 error boundary | `posts/error.tsx`; `getPosts` throw; 404 matrix `/posts/600`, `/posts/1/comments/9999` | **+1** → **30** ✅ (M3 `error.tsx`) |
| 2026-11-12 | — | Comments redirect polish | `comments/page.tsx` + `[commentId]/page.tsx`: `redirect` when `!post`; `/posts/600/comments` → Page Not Found; `archive/[...slug]/error.tsx` scaffolded | M3 evidence (no new pts) |
| 2026-11-12 | — | S1 segment loading (L1) | Four `loading.tsx` in posts tree; spinner UI on `/posts`, `/posts/1`, `/posts/1/comments`, `/posts/1/comments/1` | **+1** → **31** ✅ (M3 `loading.tsx`) |
| 2026-11-13 | — | S1 Suspense (L3) | `Suspense` + async components: `components/posts/PostDetailContent`, `PostDetailSkeleton`; `components/comments/CommentsList`, `CommentsListSkeleton`; segment `loading.tsx` kept on list + comment detail | **+1** → **32** ✅ (M3 `<Suspense>`) |
| 2026-11-13 | — | S3 static export | `generateStaticParams` (posts, comments, docs, archive); export config; `cacheComponents` off on GHP build; local `build:gh-pages` | **+4** → **36** ✅ (M5 rows: export, params, build-time fetch, basePath) |
| 2026-11-13 | — | S4 GitHub Pages | `deploy-pages.yml`; merge `main`; Pages → GitHub Actions; production smoke test posts + comments | **+2** → **38** ✅ (+1 M5 deploy, +1 M4 `generateStaticParams`) |
| 2026-11-13 | ~3h | S7 forms + intercept modal | `CommentsForm` + `useActionState`/`useFormStatus`; `createComment`/`apiPost`; parallel `@modal` + `(.)comments/new`; toast; modal close on success | **+8** → **46** ✅ (+1 M1 intercept, +2 M6 client, +5 M9 form rows) |
| 2026-11-13 | ~2h | S7b Vercel + Option B | Suspense wrappers on dynamic routes; fix branch deploy (`main` not `api_and_dynamic_routing`); Vercel Production smoke: home, posts, post detail, comments, docs | evidence only (no new checklist pts) |
| | | | | |

---

## Current assessment summary

| Area | Status |
|------|--------|
| **Working demo** | ✅ **Dev** + ✅ **Vercel** — posts/comments/docs/archive; add comment (list + intercept modal + `/comments/new`) |
| **Production Vercel** | ✅ **`main`** deploy **2026-11-13** — alias [next-js-bench-task-blush.vercel.app](https://next-js-bench-task-blush.vercel.app); verified deploy [next-js-bench-task-89nzov8xv-abdul-samad-ttns-projects.vercel.app](https://next-js-bench-task-89nzov8xv-abdul-samad-ttns-projects.vercel.app/) |
| **Production GHP** | ✅ posts/comments/docs/archive; 🔶 `build:gh-pages` — **remove or gate** `@modal/(.)…` intercept for export; modal = Vercel-only unless client-only workaround |
| **Strongest modules** | ✅ **M1**, **M2**, **M7** complete; M9 (**5/6**), M3 (**7/8**), M5 (**5/7**) |
| **In progress** | 🔶 GHP export vs Vercel feature split; optional Vercel env audit |
| **Biggest gaps** | ⬜ M9 Server Action, M3 global not-found, M4 metadata/caching; M8 optional lint CI |
| **Score** | **46 / 57 (81%)** |
| **Planned next feature** | **S6** CI lint · **`app/not-found.tsx`** · GHP build policy for intercept routes |

**Repo layout (2026-11-13):** Above + `components/comments/forms/commentsForm/*`, `components/modalCloseButton/`, `[postsId]/layout.tsx` + `@modal/`, `react-hot-toast`.

**Next 3 actions (recommended):**

1. **M3** — `app/not-found.tsx` for unknown top-level routes.
2. **M5 GHP** — re-run `build:gh-pages` after route changes; intercept modal = Vercel-only unless export excludes `@modal`.
3. **M4** — `generateMetadata` or fetch cache tags (optional learning).

**Later (unchanged):** **S2** — `generateMetadata` on post page so tab title matches post (e.g. “qui est esse” on `/posts/2`).

---

*Maintainer: when an item is finished, change **🔶** or **⬜** to **✅**, refresh the module subtotal line, and update the **Progress score** table at the top.*
