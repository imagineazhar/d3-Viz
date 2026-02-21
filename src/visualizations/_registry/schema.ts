export type VisualizationStatus = "draft" | "published";
export type VisualizationComplexity = "starter" | "intermediate" | "advanced";

export interface VisualizationMeta {
  id: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  route: string;
  status: VisualizationStatus;
  complexity: VisualizationComplexity;
  loader: () => Promise<VisualizationModule>;
}

export interface VisualizationModule {
  mount: (el: HTMLElement, options?: Record<string, unknown>) => void;
  unmount: (el: HTMLElement) => void;
}

export function getAssetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${relativePath.replace(/^\/+/, "")}`;
}