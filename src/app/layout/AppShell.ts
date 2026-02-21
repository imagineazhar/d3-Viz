export function createAppShell(): { root: HTMLElement; view: HTMLElement } {
  const root = document.createElement("div");
  root.className = "app-shell";

  const header = document.createElement("header");
  header.className = "app-header";
  header.innerHTML = `
    <div>
      <h1 class="app-title">D3 Visualization Atlas</h1>
      <p class="app-subtitle">A curated gallery of interactive experiments and production-ready charts.</p>
    </div>
    <small style="color: var(--text-muted)">TypeScript + D3 + Vite</small>
  `;

  const view = document.createElement("main");

  root.append(header, view);
  return { root, view };
}