import { createSearchBox } from "../components/SearchBox";
import { createTagFilter } from "../components/TagFilter";
import { createVizCard } from "../components/VizCard";
import type { VisualizationMeta } from "../../visualizations/_registry/schema";

function sortNewest(items: VisualizationMeta[]): VisualizationMeta[] {
  return [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function createGalleryPage(
  visualizations: VisualizationMeta[],
  onOpen: (route: string) => void
): HTMLElement {
  let search = "";
  let selectedTag = "all";

  const root = document.createElement("section");
  const filters = document.createElement("div");
  filters.className = "filters";

  const allTags = Array.from(new Set(visualizations.flatMap((v) => v.tags))).sort((a, b) => a.localeCompare(b));
  const cards = document.createElement("div");
  cards.className = "card-grid";

  const renderCards = () => {
    const term = search.trim().toLowerCase();
    const filtered = sortNewest(visualizations).filter((v) => {
      const matchTag = selectedTag === "all" || v.tags.includes(selectedTag);
      const haystack = `${v.title} ${v.description} ${v.tags.join(" ")}`.toLowerCase();
      const matchSearch = term.length === 0 || haystack.includes(term);
      return matchTag && matchSearch;
    });

    cards.innerHTML = "";

    if (filtered.length === 0) {
      const empty = document.createElement("p");
      empty.className = "surface";
      empty.textContent = "No visualizations match this filter.";
      cards.appendChild(empty);
      return;
    }

    filtered.forEach((meta) => cards.appendChild(createVizCard(meta, onOpen)));
  };

  const renderFilters = () => {
    filters.innerHTML = "";
    const searchInput = createSearchBox(search, (value) => {
      search = value;
      renderCards();
    });
    const tagFilter = createTagFilter(allTags, selectedTag, (tag) => {
      selectedTag = tag;
      renderFilters();
      renderCards();
    });
    filters.append(searchInput, tagFilter);
  };

  renderFilters();
  renderCards();
  root.append(filters, cards);
  return root;
}