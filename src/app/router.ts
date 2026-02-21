import { createAppShell } from "./layout/AppShell";
import { createGalleryPage } from "./pages/GalleryPage";
import { createVizDetailPage } from "./pages/VizDetailPage";
import { visualizations } from "../visualizations/_registry/visualizations";

function normalizeHash(raw: string): string {
  if (!raw || raw === "#") return "/";
  const value = raw.replace(/^#/, "");
  return value.startsWith("/") ? value : `/${value}`;
}

export function startRouter(host: HTMLElement): void {
  const shell = createAppShell();
  host.appendChild(shell.root);

  let cleanup: (() => void) | undefined;

  const navigate = (route: string) => {
    window.location.hash = route;
  };

  const render = async () => {
    cleanup?.();
    cleanup = undefined;
    shell.view.innerHTML = "";

    const route = normalizeHash(window.location.hash);

    if (route === "/") {
      shell.view.appendChild(createGalleryPage(visualizations, navigate));
      return;
    }

    const match = visualizations.find((v) => v.route === route);
    if (!match) {
      const fallback = document.createElement("div");
      fallback.className = "surface";
      fallback.innerHTML = "<h2>Not found</h2><p>Visualization route was not found.</p>";
      shell.view.appendChild(fallback);
      return;
    }

    const detail = await createVizDetailPage(match, () => navigate("/"));
    cleanup = detail.cleanup;
    shell.view.appendChild(detail.element);
  };

  window.addEventListener("hashchange", () => {
    void render();
  });

  if (!window.location.hash) {
    navigate("/");
  } else {
    void render();
  }
}