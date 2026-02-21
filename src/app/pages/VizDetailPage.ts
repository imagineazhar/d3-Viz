import type { VisualizationMeta } from "../../visualizations/_registry/schema";

export interface VizDetailPageResult {
  element: HTMLElement;
  cleanup: () => void;
}

export async function createVizDetailPage(
  meta: VisualizationMeta,
  onBack: () => void
): Promise<VizDetailPageResult> {
  const root = document.createElement("section");

  const back = document.createElement("button");
  back.className = "back-link";
  back.type = "button";
  back.textContent = "<- Back to gallery";
  back.addEventListener("click", onBack);

  const title = document.createElement("h2");
  title.className = "app-title";
  title.style.fontSize = "clamp(1.3rem, 2vw, 2rem)";
  title.textContent = meta.title;

  const layout = document.createElement("div");
  layout.className = "detail-layout";

  const chartSurface = document.createElement("div");
  chartSurface.className = "surface canvas-host";

  const side = document.createElement("aside");
  side.className = "surface";
  side.innerHTML = `
    <h3 style="margin-top:0">Details</h3>
    <p>${meta.description}</p>
    <p><strong>Status:</strong> ${meta.status}</p>
    <p><strong>Complexity:</strong> ${meta.complexity}</p>
    <p><strong>Created:</strong> ${meta.createdAt}</p>
    <p><strong>Updated:</strong> ${meta.updatedAt}</p>
    <p><strong>Tags:</strong> ${meta.tags.join(", ")}</p>
    <h4>Source Notes</h4>
    <p>Data and implementation notes live in this visualization folder README.</p>
  `;

  layout.append(chartSurface, side);
  root.append(back, title, layout);

  const mod = await meta.loader();
  mod.mount(chartSurface, {});

  return {
    element: root,
    cleanup: () => mod.unmount(chartSurface)
  };
}