import type { VisualizationModule } from "./schema";

type SvelteInstance = { $destroy: () => void };
type SvelteComponentCtor = new (options: {
  target: HTMLElement;
  props?: Record<string, unknown>;
}) => SvelteInstance;

type SvelteModule = { default: SvelteComponentCtor };

export function createSvelteLoader(
  loader: () => Promise<unknown>
): () => Promise<VisualizationModule> {
  return async () => {
    const mod = (await loader()) as SvelteModule;
    let app: SvelteInstance | undefined;

    return {
      mount: (el, options) => {
        app = new mod.default({
          target: el,
          props: options ?? {}
        });
      },
      unmount: (el) => {
        app?.$destroy();
        app = undefined;
        el.innerHTML = "";
      }
    };
  };
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
