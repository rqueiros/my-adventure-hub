## Scope

1. **Articles count tile (live)** — Dashboard tile for Articles fetches live count from ORCID (already cached 1h via React Query).
2. **Skip opinion detail** — already exists at `/opiniao/$id`.
3. **Full backoffice** — Lovable Cloud + auth + CRUD for all 7 manual facets.

## 1. Articles count tile

- Move `stats.articles.count` rendering to a small `<ArticlesTile>` that calls `useQuery(["orcid-works", profile.orcid])` with same key/queryFn as the articles page → instant cache hit on navigation.
- While loading, show "…"; on error fall back to the static count.

## 2. Backoffice (largest part)

### Cloud activation
- Enable Lovable Cloud (Supabase). Configure email/password + Google auth.
- Single admin user (the owner). Use `user_roles` table + `has_role()` security definer; only `admin` role can write.

### Schema (1 table per facet — keeps things straight)
```
profile        (singleton row: name, title, bio, avatar, website, socials jsonb, orcid)
books          (id, title, year, publisher, image, url, created_at)
events         (id, title, kind, date, image, url, location, meta)
                kind enum: talk, seminar, workshop, conference, podcast, jury, hackathon
projects       (id, title, description, year, image, url, tech text[])
travels        (id, country, city, year, lat, lng, image, notes)
running        (id, race, distance, date, time_seconds, location, image, url)
opinion        (id, title, subtitle, magazine, date, image, url, body)
others         (id, title, kind, year, url, meta)
                kind enum: supervision, committee, editorial, coordination
upcoming       (id, facet, title, date, image, url, meta)
```
All tables: `id uuid pk default gen_random_uuid()`, RLS enabled, `SELECT` public (read), `INSERT/UPDATE/DELETE` only via `has_role(auth.uid(),'admin')`.

### Data migration
- Seed all current `activity.ts` content into the tables via insert tool. `activity.ts` keeps only types + helpers (icons, labels, fmtDate).

### Public reads
- Replace each route's static array import with a `createServerFn` that uses `supabaseAdmin` (public select, no auth needed) + `useQuery`. Cache 5 min.
- Routes touched: `index.tsx`, `livros.tsx`, `eventos.tsx`, `projetos.tsx`, `viagens.tsx`, `corridas.tsx`, `opiniao.tsx`, `opiniao.$id.tsx`, `outros.tsx`. (Articles stays ORCID.)

### Backoffice UI (`/admin/*`)
- `/login` — email+password & Google sign-in.
- `_authenticated/admin.tsx` layout — sidebar with one link per facet, gated by `has_role('admin')` (redirect to `/` otherwise).
- For each facet: list table + "New" / "Edit" / "Delete" using shadcn `Table`, `Dialog`, `Form` + zod. Image upload optional v1 → just paste URL.
- All mutations via authenticated server fns (`requireSupabaseAuth` + role check) → `queryClient.invalidateQueries` on success.

### Out of scope (v1)
- Image upload to Storage (use URL field for now).
- Multi-admin management UI.
- Bulk import / CSV.
- Rich-text editor for `opinion.body` (use textarea + markdown).

## File map

**New**
- `src/routes/login.tsx`
- `src/routes/_authenticated.tsx`
- `src/routes/_authenticated/admin.tsx` (layout w/ sidebar)
- `src/routes/_authenticated/admin/index.tsx` (overview)
- `src/routes/_authenticated/admin/{books,events,projects,travels,running,opinion,others,upcoming,profile}.tsx`
- `src/lib/cms.functions.ts` — public read fns (1 per facet)
- `src/lib/admin.functions.ts` — admin CRUD (one set per facet)
- `src/components/admin/{DataTable,EntityDialog,DeleteButton}.tsx`
- DB migrations for all tables + RLS + `user_roles` + `has_role`

**Edited**
- `src/data/activity.ts` — drop arrays, keep types/helpers
- All facet routes — switch from static import → `useQuery`
- `src/routes/index.tsx` — Articles tile uses ORCID live count; other tiles read from DB counts via server fn
- `src/components/HudNav.tsx` — add Admin link when signed in as admin

## Order of execution

1. Enable Cloud, create schema + RLS + roles.
2. Seed data.
3. Wire public reads (no UI change visible).
4. Build login + admin shell + CRUD pages.
5. Live ORCID count tile.

This is a large change — I'll proceed straight through and ship as one batch.