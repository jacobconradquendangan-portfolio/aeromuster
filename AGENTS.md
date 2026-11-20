# AGENTS.md


## Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Production build: `npm run build`


## Coding & Verification Conventions
- Use strict TypeScript (`strict: true` in `tsconfig.json`); prefer explicit prop and data types over `any`.
- App state lives in `lib/app-context.tsx` (React context, no external store). Update it immutably — never mutate arrays or objects in place.
- Every screen renders inside the shared `AppFrame` (`components/app-frame.tsx`), which provides the 440 px mobile column, fixed background artwork and bottom tab bar. Do not introduce a second layout shell.
- Images are plain `<img>` tags pointing at `public/img/<name>`; add new artwork there (no `next/image`, no remote URLs).
- Style with Tailwind v4 utilities plus the theme tokens and component classes in `app/globals.css` (`.card`, `.tile`, `.header-grad`, `.ribbon`, `.panel-light`, `html.large-text`). Reuse existing tokens instead of hard-coded new palettes.
- Shared data (notices, services, procedures) belongs in `lib/data.ts`; UI primitives and all glyphs belong in `components/`.
- Before finishing any task, run `npx tsc --noEmit` and `npm run lint`, and fix all errors.

## Git Version Control
- **Strict Manual Git Policy:** Never run `git commit`, `git push`, `git reset --hard`, or any destructive Git command automatically.
- At the end of a completed task, provide a concise, conventional commit message (e.g., `feat(map): fit floor plans to card width`) so the user can review and commit manually.