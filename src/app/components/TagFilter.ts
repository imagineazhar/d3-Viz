export function createTagFilter(
  tags: string[],
  selected: string,
  onSelect: (tag: string) => void
): HTMLElement {
  const wrap = document.createElement("div");
  wrap.className = "tag-list";

  const allTags = ["all", ...tags];
  allTags.forEach((tag) => {
    const button = document.createElement("button");
    button.className = "tag-pill";
    button.textContent = tag;
    button.type = "button";
    button.setAttribute("aria-pressed", String(tag === selected));
    button.addEventListener("click", () => onSelect(tag));
    wrap.appendChild(button);
  });

  return wrap;
}