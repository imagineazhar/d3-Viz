export function createSearchBox(initialValue: string, onChange: (value: string) => void): HTMLElement {
  const input = document.createElement("input");
  input.className = "search-input";
  input.type = "search";
  input.value = initialValue;
  input.placeholder = "Search by title, tag, or description";
  input.setAttribute("aria-label", "Search visualizations");
  input.addEventListener("input", () => onChange(input.value));
  return input;
}