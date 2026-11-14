# AGENTS.md

Personal portfolio for Abdulaziz Abdugafurov. Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, Bun, Biome.

## Commands

```bash
bun dev                      # dev server on :3000
bun run build                # production build (output: standalone)
bunx biome check --write src # lint + format the source
bun run lint                 # biome check on the whole repo
docker compose up -d --build # build and run the container on :3000
```

- There is no test framework. Verify changes with `bun run build` plus a browser check.
- Set `SITE_URL=https://<domain>` before `next build` or `docker compose build`. Every page is prerendered, so canonical links, the sitemap, robots.txt and OG URLs are baked in at build time. It falls back to `http://localhost:3000`.
- This Next.js version is newer than most training data. Read the bundled docs in `node_modules/next/dist/docs/` before using an unfamiliar API.

## Architecture

### Feature-Sliced Design (`src/`)

Layers, each importing only from layers below it: `app` → `views` → `widgets` → `features` → `entities` → `shared`.

- The pages layer is named `views/`, because `src/pages` would trigger the Next.js Pages Router.
- Each slice exposes a public API through its `index.ts`. Import from `@/entities/profile`, not from internal files.
- `app/<route>/page.tsx` stays thin: it re-exports a view and sets `metadata = pageMetadata("<href>")`.

### Single sources of truth

- **Content:** `entities/profile/model/profile.ts` mirrors `docs/index.md`. Never hard-code names, links or stack items in components.
- **Routes:** `NAV_ITEMS` in `shared/config/routes.ts` holds each page's href, label, title and description. It drives the desktop nav, the mobile drawer, `pageMetadata()` and `app/sitemap.ts`. To add a page, add a `NAV_ITEMS` entry, a view and an `app/<route>/page.tsx`.
- **SEO:** `entities/profile/model/metadata.ts` has `siteMetadata` for the root layout and `pageMetadata(href)` for each page. Next.js replaces nested metadata objects such as `openGraph` instead of merging them, so `pageMetadata` re-spreads the shared Open Graph base on every page. The Person JSON-LD is rendered only on the home page.
- **Generated images:** `app/icon.tsx` and `app/opengraph-image.tsx` render `PixelWordmark` with `ImageResponse`. In these files, any `<div>` with more than one child needs `display: "flex"`, or the build fails.
- **Wordmark glyphs:** `PixelWordmark` only defines the glyphs A, B, D, I, L, U and Z. Any other letter is silently skipped.

### Rendering, layout and motion

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `reactCompiler` and `output: "standalone"`.
- **Kept routes:** with `cacheComponents`, up to 3 visited routes stay mounted but hidden (React `<Activity>`, `display: none`). Querying the DOM can return elements from those hidden pages.
- **Viewport height:** at `lg` (1024px) and up, the whole site is locked to one 100vh screen: the body is `lg:h-dvh` and `<main>` scrolls internally only as a fallback. Below `lg`, height is natural. New page content must fit 1024×768 without scrolling.
- **CSS-first animation:** entrance animations are CSS, so content is visible on first paint without waiting for JavaScript:
  - `Reveal` applies `.animate-rise`.
  - `app/template.tsx` remounts on every navigation and replays `.animate-fade`.
  - The home wordmark uses `.animate-wipe`.
  - The keyframes live in `globals.css`. On phones and tablets, `main .animate-rise` becomes a scroll-driven reveal (`animation-timeline: view()`) in browsers that support it.
- **Motion library:** used only in client components (header hide/show, mobile drawer, nav underline, scroll progress). `app/providers.tsx` wraps the app in `LazyMotion strict` and lazy-loads `domMax`, so you must use `import * as m from "motion/react-m"` (`m.div`). A full `motion.*` import throws.
- **Theme:** design tokens are `@theme` variables in `globals.css`, and dark mode overrides the same variables under `.dark`. Components therefore rarely need `dark:` variants. Light is the default. An inline `beforeInteractive` script in the root layout applies a saved `"dark"` choice from `localStorage` before first paint. The toggle (`features/theme-toggle`) swaps its label with CSS only, so it has no React state.

## Design rules (`DESIGN.md`)

- One monospace face for everything. JetBrains Mono stands in for Berkeley Mono.
- Monochrome ink on a cream canvas. The accent blue is used only for focus outlines.
- ASCII bracket markers (`[+]`, `[x]`, `[menu]`) instead of icons.
- 4px radius on interactive elements, 0 on containers, 1px hairline borders, no shadows or gradients.
- Reuse `buttonClass()` from `shared/ui/button-link.tsx` for any button-styled element, and `externalLinkProps(href)` for off-site links.

Next.js and React coding conventions are in `.claude/rules/nextjs.rule.md`.