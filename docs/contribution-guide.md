# Contribution Guide

## Add visualization workflow

1. Create scaffold: `npm run new:viz -- <slug>`.
2. Implement render/unmount contract in `index.ts`.
3. Keep data local (`data.ts`) or fetch external data with source notes.
4. Add registry metadata in `_registry/visualizations.ts`.
5. Add thumbnail in `public/thumbnails`.

## Add Svelte visualization workflow

1. Place entry component at `src/visualizations/<slug>/index.svelte`.
2. Add thumbnail `public/thumbnails/<slug>.png`.
3. Add `README.md` in the same folder with data/source notes.
4. Start dev server and open `#/viz/<slug>`.

## Quality gates

- `npm run typecheck`
- `npm run lint`
- `npm run build`
