# AGENTS.md

## Commands

Bun lockfile (`bun.lock`) is checked in; Node >=22.23.4.

- `bun run dev` — dev server (`astro dev`)
- `bun run build` — static build to `dist/`
- `bun run preview` — serve the built site

There is no test or lint script. Formatting is Prettier (`.prettierrc`: tabs, single quotes, semicolons).

## Architecture

Static Astro 7 personal portfolio (four pages: `index`, `about`, `stack`, `contact`, plus `404`) styled with Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config`; tokens live in the `@theme` block of `src/styles/global.css`).

- **Content lives in `src/data/profile.ts`** (`profile` + `nav`); pages and `Nav.astro` render from it. Its header says `docs/index.md` is the source of truth — change both together. `README.md` mirrors the same bio.
- **`src/layouts/Layout.astro`** wraps every page: meta/OG tags, `<Font>` preload, `<ClientRouter />` (view transitions), skip link, `Nav`. On `lg+` the page is exactly one screen tall (`lg:h-dvh`) and `<main>` scrolls internally, so keep page content compatible with that.
- **`src/components/Nav.astro`** holds inline Lucide icon paths keyed by route and generates the "ABU" block-pixel wordmark from a glyph map. Adding a nav entry means updating `nav` in `profile.ts` _and_ the `icons` map.
- **Design system: `DESIGN.md`** (terminal/manpage look: all-monospace, cream canvas, hairline borders, no shadows/gradients). Colors in `global.css` `@theme` are copied from it. The font is self-hosted JetBrains Mono, configured via `fonts` in `astro.config.mjs` (`--font-jetbrains`), standing in for Berkeley Mono.
- **Theme**: dark mode is opt-in via `html.dark` (class toggled by `ThemeToggle.astro`, saved in `localStorage.theme`), not the OS setting. `Layout.astro` applies it before paint and re-applies it on `astro:before-swap`, so any new theme-dependent state must survive `ClientRouter` swaps.
- **`Starfield.astro`** is a fixed canvas with `transition:persist` so it keeps animating across navigations; it reads `--color-ink` from the root and follows the theme.
- **`PageTitle.astro`** is the shared page `<h1>` (terminal typing effect, sized by `--n` = text length); use it instead of hand-rolled headings.
- **SEO routes**: `src/pages/sitemap.xml.ts` is generated from `nav`, and `robots.txt.ts` points at it; both depend on `site` in `astro.config.mjs`. New pages need a `nav` entry to appear in the sitemap.
- **Motion** is plain CSS in `global.css` (`.rise` staggered entrance via `--i`, `.reveal` and `.scroll-progress` via scroll timelines), all gated on `prefers-reduced-motion: no-preference`.

## Conventions

Project rules in `.claude/rules/astro.rule.md` apply; the ones most likely to matter: Tailwind utility classes only (**never `@apply`**), TypeScript, semantic HTML/ARIA, minimal client JS.
