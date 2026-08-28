# AGENTS.md

Agent instructions for Mizuki — an Astro 7 blog with Svelte 5, Tailwind CSS v4, and Biome.

For behavioral guidelines (code quality, surgical changes, security), see `CLAUDE.md`.

## Quick Commands

```bash
pnpm dev            # Dev server on port 3000
pnpm build          # Full build (anime fetch + astro + pagefind + font check)
pnpm lint           # Biome check + auto-fix: biome check --write ./src
pnpm format         # Biome format: biome format --write ./src
pnpm type-check     # tsc --noEmit
pnpm check          # astro check
pnpm test           # Node built-in test runner (see below)
```

**Must use pnpm.** Enforced by `preinstall` hook. Do not use npm or yarn.

## Verification Order

CI runs these in parallel, but for local verification:

1. `pnpm lint` — catches style issues early
2. `pnpm type-check` — TypeScript strictness (strictNullChecks enabled)
3. `pnpm test` — runs a subset of tests
4. `pnpm build` — full production build

## Testing

Tests use **Node.js built-in test runner** (not vitest/jest). Files are in `tests/`.

```bash
# Run specific test files directly:
node --experimental-strip-types --test tests/markdown-enhancements.test.mjs
node tests/crypto.test.mjs  # separate because crypto tests need special handling

# Full test suite:
pnpm test
```

Some `.test.ts` files use `--experimental-strip-types`. When adding new tests, follow existing patterns in `tests/`.

## Code Style (Biome)

- **Indent**: tabs (not spaces)
- **Quotes**: double
- **Semicolons**: always
- **Trailing commas**: all
- **Line width**: 80
- **Line endings**: LF enforced via `.gitattributes`
- `.svelte` / `.astro` / `.vue` files: `useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` rules are **disabled**

## Path Aliases

Defined in `tsconfig.json`:
- `@components/*` → `src/components/*`
- `@assets/*` → `src/assets/*`
- `@constants/*` → `src/constants/*`
- `@utils/*` → `src/utils/*`
- `@i18n/*` → `src/i18n/*`
- `@layouts/*` → `src/layouts/*`
- `@/*` → `src/*`

## Architecture

### Content System

Two Astro content collections defined in `src/content.config.ts`:
- **`posts`** — blog posts in `src/content/posts/` (Markdown/MDX, supports `folder/index.md` or single file)
- **`spec`** — special pages (`about.md`, `friends.md`) in `src/content/spec/`

Post frontmatter schema is extensive — see `src/content.config.ts` for all fields (title, published, draft, image, tags, category, encrypted, password, etc.).

### Config Override System

Configs live in `src/config/`. The override system deep-merges defaults with overrides from `src/config/overrides/` (synced from external content repo via `pnpm sync-content`). Override files are gitignored.

When editing config, modify files in `src/config/` — never in `src/config/overrides/`.

### Data Files

Structured data lives in `src/data/`. Each file exports typed arrays:
- `skills.ts`, `projects.ts`, `devices.ts`, `anime.ts`, `friends.ts`, `timeline.ts`, `ai-tools.ts`, `diary.ts`

All data types are defined in `src/types/config.ts`.

### i18n

- Keys: `src/i18n/i18nKey.ts` (enum)
- Languages: `src/i18n/languages/{en,ja,zh_CN,zh_TW}.ts`
- Helper: `i18n(key)` from `src/i18n/translation.ts`

When adding user-facing strings, add the key to `i18nKey.ts` and all four language files.

### Client Scripts

Entry point: `src/scripts/swup-manager.ts`. Swup handles page transitions. Client-side effects live in `src/scripts/effects/`.

### Styles

Main entry: `src/styles/main.css` (imports Tailwind + 26 other CSS files). Uses Tailwind v4 `@import "tailwindcss"` syntax. Dark mode via `.dark` class.

## Gotchas

- **Build includes external data fetch**: `pnpm build` runs `scripts/update-anime.mjs` first, which fetches anime data from external APIs. Set `ENABLE_CONTENT_SYNC=false` to skip content sync in CI.
- **pnpm-lock.yaml**: Do not manually edit. Use `pnpm install` to update.
- **`.env` files**: Never commit. `.env.example` shows available vars.
- **Pagefind**: Search index is built after astro build in the `pnpm build` script. If you need to test search, run the full build.
- **Svelte components**: Use `vitePreprocess` from `@astrojs/svelte`. Astro + Svelte integration means components can use both Astro's `define:vars` and Svelte reactivity.
- **Image assets**: Banner images are large `.webp` files in `public/images/`. Do not add unnecessary large binaries.
- **Content sync**: External content repo is synced via `pnpm sync-content`. Do not manually create files in `src/config/overrides/`.
