import type { VisualizationMeta } from "./schema";
import { createSvelteLoader, slugToTitle } from "./svelte";

const manualVisualizations: VisualizationMeta[] = [
  {
    id: "bar-chart-race",
    title: "Bar Growth Pulse",
    description: "Animated ranked bars showing score progression across weekly snapshots.",
    tags: ["bar", "animation", "ranking"],
    createdAt: "2026-02-21",
    updatedAt: "2026-02-21",
    thumbnail: "thumbnails/bar-chart-race.png",
    route: "/viz/bar-chart-race",
    status: "published",
    complexity: "starter",
    loader: () => import("../bar-chart-race/index")
  },
  {
    id: "force-network",
    title: "Connected Signals",
    description: "Force-directed network with weighted links and cluster-oriented placement.",
    tags: ["network", "force", "relationships"],
    createdAt: "2026-02-21",
    updatedAt: "2026-02-21",
    thumbnail: "thumbnails/force-network.png",
    route: "/viz/force-network",
    status: "published",
    complexity: "intermediate",
    loader: () => import("../force-network/index")
  }
];

const svelteEntries = import.meta.glob("../*/index.svelte");
const dateStamp = "2026-02-21";

const svelteVisualizations: VisualizationMeta[] = Object.entries(svelteEntries).map(
  ([path, loader]): VisualizationMeta => {
    const slug = path.split("/")[1] ?? "svelte-viz";
    return {
      id: slug,
      title: slugToTitle(slug),
      description: "Svelte visualization module.",
      tags: ["svelte"],
      createdAt: dateStamp,
      updatedAt: dateStamp,
      thumbnail: `thumbnails/${slug}.png`,
      route: `/viz/${slug}`,
      status: "published",
      complexity: "intermediate",
      loader: createSvelteLoader(loader)
    };
  }
);

export const visualizations: VisualizationMeta[] = [
  ...manualVisualizations,
  ...svelteVisualizations
];
