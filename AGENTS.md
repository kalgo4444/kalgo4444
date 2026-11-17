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

- There is no test framework. Verify changes with `bun run build` and a check in the browser.
- Set `SITE_URL=https://<domain>` before running `next build` or `docker compose build`. Every page is prerendered, so canonical links, the sitemap, robots.txt and OG URLs are fixed at build time. Without it they fall back to `http://localhost:3000` (`shared/config/site.ts`).
- This Next.js version is newer than most training data. Read the bundled docs in `node_modules/next/dist/docs/` before using an unfamiliar API.

## Architecture

### Feature-Sliced Design (`src/`)

There are six layers, and each one imports only from the layers below it: `app` → `views` → `widgets` → `features` → `entities` → `shared`.

- The pages layer is named `views/` because a `src/pages` folder would turn on the Next.js Pages Router.
- Each slice exposes its public API through `index.ts`. Import from `@/entities/profile`, not from the files inside it.
- Keep `app/<route>/page.tsx` thin. It re-exports a view as the default export and sets `metadata = pageMetadata("<href>")`.

### Single sources of truth

- **Content:** `entities/profile/model/profile.ts` mirrors `docs/index.md`, and `README.md` repeats the same bio. When the bio changes, update all three. Never hard-code names, links or stack items in components.
- **Routes:** `NAV_ITEMS` in `shared/config/routes.ts` holds the href, label, title and description of each page. It drives the desktop nav, the mobile dock, `pageMetadata()` and `app/sitemap.ts`. To add a page, add a `NAV_ITEMS` entry, a view and an `app/<route>/page.tsx`.
- **SEO:** `entities/profile/model/metadata.ts` exports `siteMetadata` for the root layout and `pageMetadata(href)` for each page. Next.js replaces nested metadata objects such as `openGraph` instead of merging them, so `pageMetadata` spreads the shared Open Graph base again on every page. The Person JSON-LD is rendered only on the home page.
- **Generated images:** `app/icon.tsx` and `app/opengraph-image.tsx` render `PixelWordmark` with `ImageResponse`. In these files, any `<div>` with more than one child needs `display: "flex"`, or the build fails.
- **Wordmark glyphs:** `PixelWordmark` defines only the glyphs A, B, D, I, L, U and Z. It silently skips any other letter.

### Rendering, layout and motion

- `next.config.ts` turns on `cacheComponents`, `partialPrefetching`, `reactCompiler` and `output: "standalone"`. It also sets security headers. The CSP leaves out `script-src` on purpose so the inline theme script can still run.
- **Kept routes:** with `cacheComponents`, up to 3 visited routes stay mounted but hidden (React `<Activity>`, `display: none`). A DOM query can return elements from these hidden pages.
- **Viewport height:** at `lg` (1024px) and wider, the whole site is locked to one 100vh screen. The body is `lg:h-dvh`, and `<main>` scrolls internally only as a fallback. Below `lg`, the height is natural. New page content must fit 1024×768 without scrolling.
- **CSS-first animation:** entrance animations are CSS, so content shows on first paint without waiting for JavaScript.
  - `Reveal` applies `.animate-rise`.
  - `app/template.tsx` remounts on every navigation and replays `.animate-fade`.
  - The home wordmark uses `.animate-wipe`.
  - The keyframes live in `globals.css`. On phones and tablets, in browsers that support it, `main .animate-rise` becomes a scroll-driven reveal (`animation-timeline: view()`).
- **Motion library:** used only in client components (header hide/show, mobile dock bubble, nav underline, scroll progress). `app/providers.tsx` wraps the app in `LazyMotion strict` and lazy-loads `domMax`. Always `import * as m from "motion/react-m"` and use `m.div`. A full `motion.*` import throws.
- **Theme:** the design tokens are `@theme` variables in `globals.css`, and dark mode overrides the same variables under `.dark`, so components rarely need `dark:` variants. Light is the default. A plain inline `<script>` in the root layout's `<head>` applies a saved `"dark"` choice from `localStorage` before first paint. It is not `next/script`, which holds inline code until hydration. The toggle (`features/theme-toggle`) swaps its label with CSS only and has no React state.

## Design rules (`DESIGN.md`)

- One monospace typeface for everything. JetBrains Mono stands in for Berkeley Mono.
- Monochrome ink on a cream canvas. The blue accent is used only for focus outlines.
- ASCII bracket markers (`[+]`, `[x]`, `[menu]`) instead of icons.
- 4px radius on interactive elements, 0 on containers, 1px hairline borders, no shadows or gradients.
- Use `buttonClass()` from `shared/ui/button-link.tsx` for any element styled as a button, and `externalLinkProps(href)` for links to other sites.

<!-- `next dev` writes its Next.js agent rules into AGENTS.md; this import keeps them in context. -->