import type { VisualizationMeta } from "./schema";

export const visualizations: VisualizationMeta[] = [
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