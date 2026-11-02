# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Bun is the package manager (`bun.lock`). Node >= 22.12.

```sh
bun install
bun run dev                   # dev server in the foreground, http://localhost:4321
bun run build                 # static build to dist/
bun run preview               # serve the build

bun run test                  # unit tests (vitest), no server needed
bunx vitest run tests/unit/profile.test.ts     # one file
bunx vitest run -t 'has a GitHub link'         # one test by name

bun run test:e2e              # Playwright (Python), needs a running server
bun run test:e2e contact_lists stack_lists   # only tests whose function name contains one of the words
```

`astro` is not on `PATH`, so call it through `bunx`. To keep a server running across commands, start it in background mode and manage it with the matching subcommands (`astro preview` has the same ones):

```sh
bunx astro dev --background   # http://localhost:4321
bunx astro dev status | logs | stop
```

There is no lint or typecheck script. Formatting follows `.prettierrc` (tabs, single quotes, semicolons, no parens on single-arg arrows), but Prettier is not a dependency.

### E2E setup

The e2e suite is a plain Python script, not pytest. It expects a venv at `.venv/` (gitignored):

```sh
python3 -m venv .venv
.venv/bin/pip install -r tests/e2e/requirements.txt
.venv/bin/playwright install chromium
```

`BASE_URL` overrides the target (default `http://localhost:4321`) and `SHOTS_DIR` the screenshot directory (default `/tmp/abu-page-e2e`). The target can be the dev server or `bun run preview`. A test fails on any console error, page error, or failed request, not only on its own assertions. Tests register with `@test()` or `@test("mobile")`, which picks the 1280x800 or 375x740 viewport.

## Architecture

A static Astro 7 personal site with no UI framework and no content collections. Client JS is Astro's `<ClientRouter />` (view transitions), the theme scripts, and the WebGL background. Astro docs: https://docs.astro.build

**One data source.** `src/data/profile.ts` holds the facts the site prints (name, role, location, stack, skills, links, projects). Pages are thin templates over it, so those changes go there, not into page markup. The connecting prose is still inline in the pages (the hero lede in `index.astro`, the paragraphs in `about.astro`, the intro line in `contact.astro`, the lede and labels in `stack.astro`). `profile.ts` cites `docs/index.md` as its source, but that file no longer exists. `README.md` (the only file in git history) is a short bio that has drifted from `profile.ts` (for example, it still lists NodeJS), so treat `profile.ts` as the source of truth.

Pages look some entries up by label, so these are load-bearing:

- `stack` group labelled `Databases`: used by `about.astro`
- `links` entry labelled `GitHub`: used by the hero button in `index.astro`
- each link's `text` must equal its `href` minus the scheme and `www.` (asserted in `tests/unit/profile.test.ts`)

**Projects is conditional.** While `profile.projects` is empty, `Nav.astro` omits the Projects link and `projects.astro` redirects to `/`. Adding one entry turns both on.

**Duplicated expectations.** `tests/e2e/test_site.py` hardcodes the name, page titles, headings, link hrefs, the age, and skill and stack lists (`PAGES`, `LINKS`, and inline lists). It also selects by markup: `nav.links`, `.hero .intro`, `.prose`, `li.row strong`, and `dl dt` / `dl dd` on the stack page. Changing `profile.ts`, a page title, or that markup means updating that file as well.

**Layout and nav.** Every page wraps `src/layouts/Layout.astro` (takes `title` and `description`), which renders `PulseBeams`, `Nav`, and a `<main>` slot. `Nav.astro` renders two navs from two separate link lists:

- `header.nav` with `nav.links` (desktop bar), then `ThemeToggle` and the Contact button, which stay visible at every width
- `nav.mobile-dock`, a fixed bottom pill shown at 768px and below, which adds a Home tab and has no Contact entry

So each of `/about`, `/skills`, `/stack` appears twice in the markup and `/contact` once, and the unit tests count on that. A new page has to be added to both `desktopLinks` and `mobileLinks` (plus an icon branch for the dock). `global.css` reserves `padding-bottom: 84px` on `body` at the same breakpoint so the dock never covers content.

`aria-current` matching strips a trailing slash because built pages have one and dev pages do not. `current()` never marks `/`, so on the home page no link has `aria-current`, and a unit test asserts that. The dock highlights its active tab with a separate `.active` class, which does cover Home.

**View transitions.** Because of `<ClientRouter />`, navigation swaps the document in place: `<main>` fades (`transition:animate`), the header and dock carry a `transition:name` and morph between pages (they are re-rendered, not kept), and only `PulseBeams` uses `transition:persist`, so its canvas and WebGL context survive navigation. Consequences:

- A bundled `<script>` runs once per visit, not once per page. Per-page work needs the `astro:page-load` event, and click handlers should be delegated from `document`, as `ThemeToggle.astro` does.
- The swap replaces every attribute on `<html>` with the incoming page's, and an inline head script that is the same on both pages does not run again. State kept on `<html>` has to be re-applied in an `astro:after-swap` listener.

**Theme.** Light is the default and the OS preference is not consulted. Dark mode is the `html[data-theme='dark']` block in `global.css`, which overrides the color tokens. These pieces have to agree:

- the `is:inline` script in `Layout.astro`, which reads `localStorage.theme` and sets `data-theme` before first paint (and again on `astro:after-swap`)
- the `<script>` in `ThemeToggle.astro`, which flips `data-theme`, stores the choice, and adds `html.theme-transition` for 350ms so the color change animates
- the `theme-color` meta, whose two hex values are written out in both of those scripts and must match `--canvas` in each theme
- `PulseBeams.astro`, which hardcodes both canvas colors (and the beam colors) as RGB shader uniforms and watches `data-theme` with a `MutationObserver` to crossfade

**PulseBeams.** A fixed, full-viewport WebGL canvas behind everything (`z-index: 0`, `pointer-events: none`). It caps DPR at 2, picks the beam count from canvas width (640/1024 thresholds), pauses when the tab is hidden, renders a single still frame under `prefers-reduced-motion`, and re-initializes after a lost WebGL context. Page content must sit above it.

**PixelWord.** The nav wordmark is an SVG built from 5-row ASCII bitmaps in the `GLYPHS` map in `src/components/PixelWord.astro`. Only A, B, D, I, L, U, Z exist, and an unknown character throws at render. A unit test requires a glyph for every letter of `profile.firstName`.

**Unit tests** render components to HTML strings with `experimental_AstroContainer` and assert with regexes. `vitest.config.ts` uses Astro's `getViteConfig` so `.astro` imports resolve. They see server-rendered markup only, so anything a client script does (the theme, view transitions, the WebGL background) can only be checked in the e2e suite.

## Design system

`DESIGN.md` is the visual spec (a monospace, manpage-style system modelled on OpenCode's site). It describes OpenCode's own pages, so parts of it (the hamburger drawer, the TUI hero mockup) have no counterpart here. Its tokens are implemented as CSS custom properties at the top of `src/styles/global.css`; use those variables rather than literal colors or spacing. `DESIGN.md` names more tokens than `:root` defines (`spacing.xxs` and `colors.surface-dark` are not there, for example), and an undefined `var()` fails silently, so check `:root` before using one. A new color token needs a value in the `html[data-theme='dark']` block too. `:root` also holds site-specific tokens with no counterpart in the spec (`--nav-bar-*`, `--nav-link-*`, `--brand-badge-*`, `--theme-toggle-*`, `--dock-*`). Shared classes (`.container`, `.page`, `.row`, `.btn`, `.prose`) live in `global.css`, with page-specific rules in each file's scoped `<style>`.

`.row` is the shared list pattern: a three-column grid of a `[+]` marker, a `<strong>` label, and a `.detail`. Skills, Contact, and Projects use it as `<li class="row">`.

Conventions that come from the spec:

- One typeface everywhere: JetBrains Mono via Astro's fonts API (`astro.config.mjs`, exposed as `--font-mono`), standing in for Berkeley Mono.
- ASCII bracket markers (`[+]`, `[-]`) instead of icons or bullets.
- 4px radius on interactive elements, 1px hairline rules, no cards, shadows, or decorative imagery.
- Deliberate departures from those rules: the header bar is a floating 12px-radius panel with a shadow and backdrop blur; the mobile dock uses inline SVG icons, a fully rounded pill, and a drop shadow; `stack.astro` draws a hairline-bordered table with a header row, footer, and chips, as a `<dl>` with its own scoped styles; and `PulseBeams` is an animated background.
- Motion is short (0.15s to 0.3s) and `global.css` cancels all animation and transitions under `prefers-reduced-motion: reduce`.
- Breakpoints in use: 1024px (below it pages stop filling the viewport height), 850px (section spacing shrinks), 768px (desktop links hide and the dock appears), 640px (narrower gutter, `.row` drops to two columns).
