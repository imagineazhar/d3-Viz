import type { VisualizationMeta } from "../../visualizations/_registry/schema";
import { getAssetUrl } from "../../visualizations/_registry/schema";

export function createVizCard(meta: VisualizationMeta, onOpen: (route: string) => void): HTMLElement {
  const card = document.createElement("article");
  card.className = "viz-card";

  const button = document.createElement("button");
  button.type = "button";
  button.addEventListener("click", () => onOpen(meta.route));

  const img = document.createElement("img");
  img.className = "viz-thumb";
  img.src = getAssetUrl(meta.thumbnail);
  img.alt = `${meta.title} thumbnail`;
  img.loading = "lazy";

  const content = document.createElement("div");
  content.className = "viz-content";

  const title = document.createElement("h3");
  title.className = "viz-title";
  title.textContent = meta.title;

  const desc = document.createElement("p");
  desc.className = "viz-desc";
  desc.textContent = meta.description;

  const tags = document.createElement("div");
  tags.className = "viz-tags";
  meta.tags.slice(0, 3).forEach((tag) => {
    const chip = document.createElement("span");
    chip.className = "meta-chip";
    chip.textContent = tag;
    tags.appendChild(chip);
  });

  content.append(title, desc, tags);
  button.append(img, content);
  card.appendChild(button);

  return card;
}