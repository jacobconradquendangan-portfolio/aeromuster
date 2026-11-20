# AGENTS.md


## Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Production build: `npm run build`


## Coding & Verification Conventions
- Use strict TypeScript; avoid `any` in SVG scene-graph schemas and path generator functions.
- Do not mutate Zustand state arrays directly; return new layer arrays on reorder, toggle, or color updates.
- Before finishing any task, run `npx tsc --noEmit` and `npm run lint`, and fix all errors.

## Git Version Control
- **Strict Manual Git Policy:** Never run `git commit`, `git push`, `git reset --hard`, or any destructive Git command automatically.
- At the end of a completed task, provide a concise, conventional commit message (e.g., `feat(engine): add procedural botanical layer generator`) so the user can review and commit manually.