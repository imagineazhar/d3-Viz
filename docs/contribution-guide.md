# Contribution Guide

## Add visualization workflow

1. Create scaffold: `npm run new:viz -- <slug>`.
2. Implement render/unmount contract in `index.ts`.
3. Keep data local (`data.ts`) or fetch external data with source notes.
4. Add registry metadata in `_registry/visualizations.ts`.
5. Add thumbnail in `public/thumbnails`.

## Quality gates

- `npm run typecheck`
- `npm run lint`
- `npm run build`