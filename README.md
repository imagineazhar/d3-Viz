# D3 Viz Showcase

A scalable D3.js gallery built with TypeScript + Vite and deployed via GitHub Pages.

## Local development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

## Add a new visualization

1. Run `npm run new:viz -- my-viz-slug`.
2. Fill in `src/visualizations/<slug>/index.ts`, `data.ts`, and `README.md`.
3. Add metadata + lazy loader in `src/visualizations/_registry/visualizations.ts`.
4. Add a thumbnail at `public/thumbnails/<slug>.png`.

## Add existing Svelte visualizations

Store each entry visualization at:

- `src/visualizations/<slug>/index.svelte`

Auto-integration is enabled. Any `index.svelte` in a direct child folder under
`src/visualizations` is discovered and added to the gallery route:

- `#/viz/<slug>`

Optional recommended companion files:

- `src/visualizations/<slug>/README.md`
- `public/thumbnails/<slug>.png`

## Project highlights

- Metadata-driven gallery (search + tags + sort)
- Detail page per visualization
- Lazy-loaded visualization modules
- CI + GitHub Pages deployment workflows
