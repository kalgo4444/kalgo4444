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
- **Motion** is plain CSS in `global.css` (`.rise` staggered entrance via `--i`, `.reveal` and `.scroll-progress` via scroll timelines), all gated on `prefers-reduced-motion: no-preference`.

## Conventions

Project rules in `.claude/rules/astro.rule.md` apply; the ones most likely to matter: Tailwind utility classes only (**never `@apply`**), TypeScript, semantic HTML/ARIA, minimal client JS.
