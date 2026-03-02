# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # Dev server with Turbopack
yarn build            # Production build
yarn format           # Format with Biome
yarn lint             # Lint with Biome
yarn check            # Full Biome check (lint + format + assist)
yarn ts:check         # TypeScript type checking
yarn gen:imports      # Regenerate entry imports from db/entries/
yarn db:validate      # Validate database entry slugs
```

## Architecture

This is a **Next.js 15 App Router** portfolio site with a custom **2D camera navigation system** — the entire home page is a pannable/zoomable canvas of cards, not a traditional scrolling page.

### Camera System (`src/providers/CameraProvider/`)

The core abstraction. `CameraProvider` wraps the home page and manages:
- **Camera state** — `{x, y}` position, viewport CSS transform, 4 grid transforms (x1–x4) for infinite-scroll illusion
- **Controls** — `ScrollControls`, `KeyboardControls`, `DragControls`, `ToucheControls` handle all input types
- **Viewport + Grid** — `Viewport` applies the CSS transform; `Grid` renders 4 translated copies of the card grid
- State is React Context + useState with action functions (`actionOnScroll`, `actionToggleModal`)

### Entry/Card System

Content is data-driven. Each portfolio piece, the profile, contact info, CV, etc. is an **Entry** typed in `src/db/types.ts`:
- Entry variants: `shot | contact | map | cv | profile | gallery | technologies`
- All entries live in `src/db/entries/` as individual TypeScript files
- `src/db/index.ts` exports the combined `entries` array and helper functions (`getEntry`, `getEntryBySlug`)
- The home page (`src/app/(home)/page.tsx`) maps entries to card components via a switch on `entry.variant`
- Cards are positioned on the grid via CSS `grid-area` using each entry's `area` field (e.g. `s1`, `l2`)

### Layout & Scaling

The virtual canvas is 4368×3318px with a 2448×1638px viewport (defined in `src/config/index.ts`). Responsive scaling is handled via CSS breakpoints in `src/app/app.css` (`.responsive-scale`) — supports mobile through 5K+ displays.

### Routing

- `/` — Interactive camera-based portfolio grid
- `/[slug]` — Individual project detail pages (statically generated from shot entries)
- `/cv` — CV page
- `/api/projects` — JSON endpoint returning all entries

### Animations

GSAP is used throughout for modal enter/exit, gallery stagger, hover effects, and text reveals. Animation logic lives alongside the components that use it.

## Code Style

- **Biome** for linting and formatting — single quotes, no semicolons, 2-space indent, 120-char line width
- **Tailwind CSS v4** via PostCSS with custom `@utility` definitions in `app.css`
- **Path alias:** `@/*` maps to `src/*`
- Object keys are auto-sorted by Biome (`useSortedKeys: "on"`)
- Imports are auto-organized by Biome
- `noExplicitAny` is off for .ts/.tsx files; `noConsole` is a warning
- Class name merging uses `cn()` utility (`src/utils/cn.ts`) — combines clsx + tailwind-merge

## Adding Content

To add a new portfolio shot:
1. Create an entry file in `src/db/entries/` following the `EntryShot` type
2. Run `yarn gen:imports` to regenerate the imports
3. Run `yarn db:validate` to verify slugs
