# AGENTS.md

## Commands

Bun lockfile (`bun.lock`) is checked in; Node >=22.23.4.

- `bun run dev` — dev server (`astro dev`)
- `bun run build` — static build to `dist/`
- `bun run preview` — serve the built site

There is no test, lint, or typecheck script (`@astrojs/check` is not installed), so `bun run build` is the only automated check. Formatting is Prettier (`.prettierrc`: tabs, single quotes, semicolons).

## Architecture

Static Astro 7 personal portfolio (four pages: `index`, `about`, `stack`, `contact`, plus `404`) styled with Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config`; tokens live in the `@theme` block of `src/styles/global.css`).

- **Content lives in `src/data/profile.ts`** (`profile` + `nav`); pages and `Nav.astro` render from it. Its header says `docs/index.md` is the source of truth — change both together. `README.md` mirrors the same bio (minus contact).
- **`src/layouts/Layout.astro`** wraps every page: meta/OG tags, `<Font>` preload, `<ClientRouter />` (view transitions), skip link, `Nav`. Props are `title`, `description` (defaults to `profile.bio`) and `noindex` (drops the canonical link; used by `404`); the JSON-LD `Person` block is emitted on `/` only. On `lg+` the page is exactly one screen tall (`lg:h-dvh`) and `<main>` scrolls internally, so keep page content compatible with that.
- **`src/components/Nav.astro`** holds inline Lucide icon paths keyed by route and draws the "ABU" block-pixel wordmark from the pixel list in `src/data/wordmark.ts`. Adding a nav entry means updating `nav` in `profile.ts` _and_ the `icons` map. It renders two navs: a desktop bar (`md+`) where home is the logo and contact is a hard-coded button, both filtered out of the link list, and a mobile icon dock that lists every `nav` entry.
- **Design system: `DESIGN.md`** (terminal/manpage look: all-monospace, cream canvas, hairline borders, no shadows/gradients). Colors in `global.css` `@theme` are copied from it. The font is self-hosted JetBrains Mono, configured via `fonts` in `astro.config.mjs` (`--font-jetbrains`), standing in for Berkeley Mono. `DESIGN.md` was written for a larger marketing site, so it specs components that do not exist here (testimonials, inputs, charts); take tokens and rules from it, not a component inventory. `Nav.astro` follows the same rules: a sharp hairline-bordered bar/dock, 4px radius on the interactive elements inside, no shadow.
- **Theme**: dark mode is opt-in via `html.dark`, saved in `localStorage.theme`, not the OS setting. The inline script in `Layout.astro` defines a global `applyTheme()` that sets the class and the `theme-color` meta from storage; it runs before paint and on `astro:before-swap`, and `ThemeToggle.astro` calls it after flipping the stored value. Any new theme-dependent state must survive `ClientRouter` swaps.
- **Client scripts run once**: with `ClientRouter`, a component `<script>` does not re-run on navigation while the DOM is replaced. Bind listeners on `document` with delegation (as `ThemeToggle.astro` does; it is also rendered twice, once per nav) or on a `transition:persist` element, not on elements that get swapped.
- **`Starfield.astro`** is a fixed canvas with `transition:persist` so it keeps animating across navigations; it reads `--color-ink` from the root and follows the theme.
- **`AsciiWordmark.astro`** (home page only) is the site's one dark surface and its only 3D element: three.js renders the wordmark as blocks into a `COLS` x `ROWS` render target, and the script prints the pixels as ASCII into a `<pre>`, so the result is still monospace text. Motion (`motion`, the vanilla build of Framer Motion; there is no React here) animates the rotation: spring into the resting pose, sway, spring back after a drag. The server-rendered `<pre>` holds a flat wordmark as the no-JS/no-WebGL fallback. It mounts on `astro:page-load` and frees its GL context once its `<pre>` leaves the DOM. three.js and Motion load on `/` only (about 155 kB gzipped); keep them out of `Layout.astro`.
- **`PageTitle.astro`** is the shared page `<h1>` (terminal typing effect, sized by `--n` = text length); use it instead of hand-rolled headings.
- **SEO routes**: `src/pages/sitemap.xml.ts` is generated from `nav`, and `robots.txt.ts` points at it; both depend on `site` in `astro.config.mjs`. New pages need a `nav` entry to appear in the sitemap.
- **Page motion** is plain CSS in `global.css` (`.rise` staggered entrance via `--i`, `.reveal` and `.scroll-progress` via scroll timelines), all gated on `prefers-reduced-motion: no-preference`. The Motion library is used only inside `AsciiWordmark.astro`.

## Conventions

Project rules in `.claude/rules/astro.rule.md` apply; the ones most likely to matter: Tailwind utility classes only (**never `@apply`**), TypeScript, semantic HTML/ARIA, minimal client JS. That file is a generic Astro ruleset: where it disagrees with this repo (it mentions `@astrojs/tailwind`, `tailwind.config.cjs`, content collections, framework components), follow what is described above.
