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

This is a **Next.js 16 App Router** portfolio site with a custom **2D camera navigation system** — the entire home page is a pannable/zoomable canvas of cards rendered with **WebGL (React Three Fiber)**, not a traditional scrolling page.

### Camera System (`src/providers/CameraProvider/`)

`CameraProvider` owns the camera and its input, with no rendering of its own:
- **Camera state** — `{x, y}` position, `origin`, zoom `scale`, `isModalOpen` (React Context + useState, actions `actionOnScroll`, `actionOnZoom`, `actionToggleModal`)
- **Controls** — `ScrollControls`, `KeyboardControls`, `DragControls`, `ToucheControls`, `ZoomControls`
- `CameraSession` parks the camera across route changes

### Scene (`src/scene/`)

`<Scene />` lives in the `(home)` route-group layout, shared by `/`, `/[slug]` and `/cv`, so the canvas survives navigating between them: off `/` it stops drawing, the camera controls pause and an expanded card waits under the page for the way back. It only mounts on `/` (a cold landing on a page never loads WebGL). `Scene.tsx` + `index.ts` at the root, everything else in domain folders:
- `camera/` — `CameraBridge` copies the DOM camera into a per-frame `view`; `CameraRig` points the orthographic camera; world ↔ screen helpers
- `grid/` — the grid template (mirrors the old CSS `grid-template-areas`), area rects, the tile `PERIOD`, geometry helpers
- `entity/` — `Entity` repeats one card across 4 slots for the endless canvas; `Surface` (card body + pointer hit target), `Layer`, `TextLayer`, `PaperLayer`
- `cards/` — one folder per entry variant (`shot`, `profile`, `contact`, `technologies`, `map`, `gallery`, `cv`), components + hooks
- `graphics/` — materials, textures (images, SVGs and Canvas 2D text), `shaders/*.glsl` (loaded as strings via `raw-loader`, see `next.config.ts`)
- `canvas/` — the R3F `Canvas`, the renderer with the backdrop blur pass, the modal backdrop
- `morph/` — the card flying from the grid into its modal (WebGL until it lands, then handed to the DOM in one frame)
- `modal/` — the DOM modal the morph lands in (and expands from into its page, and back), and the gallery modal
- `ambient/` — the pages' ambient light, one element kept alive across the hand-over between modal and page
- `state/` — zustand store (open card, gallery) and the mutable per-frame `morph` state
- `interaction/` — cursor, hotspots inside a card, external links

Per-frame values (camera, morph progress, tweens) live in plain mutable objects read in `useFrame`, never in React state.

### Entry/Card System

Content is data-driven. Each portfolio piece, the profile, contact info, CV, etc. is an **Entry** typed in `src/db/types.ts`:
- Entry variants: `shot | contact | map | cv | profile | gallery | technologies`
- All entries live in `src/db/entries/` as individual TypeScript files
- `src/db/index.ts` exports the combined `entries` array and helper functions (`getEntryBySlug`)
- `src/scene/cards/Cards.tsx` maps entries to card entities via a switch on `entry.variant`
- Cards are placed by their `area` field (e.g. `s1`, `l2`) using the template in `src/scene/grid/layout.ts`

### Layout & Scaling

One grid tile is 2448×1638px (`Config.viewport`), repeated in both directions. The breakpoint scale (`calculateScale` in `CameraProvider/const`) times the zoom gives CSS pixels per grid pixel.

### Routing

- `/` — Interactive camera-based portfolio grid
- `/[slug]` — Individual project detail pages (statically generated from shot entries), in the `(home)` group
- `/cv` — CV page, in the `(home)` group
- `/ico` — Business details, entered from the dock through a view transition
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
