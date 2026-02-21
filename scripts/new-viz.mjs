import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npm run new:viz -- <viz-slug>");
  process.exit(1);
}

const base = join(process.cwd(), "src", "visualizations", slug);
if (existsSync(base)) {
  console.error(`Visualization '${slug}' already exists.`);
  process.exit(1);
}

mkdirSync(base, { recursive: true });

writeFileSync(join(base, "index.ts"), `import * as d3 from "d3";

import type { VisualizationModule } from "../_registry/schema";

export const mount: VisualizationModule["mount"] = (el) => {
  const width = 720;
  const height = 420;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("viewBox", \`0 0 \${width} \${height}\`)
    .attr("role", "img")
    .attr("aria-label", "${slug} visualization");

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 2)
    .attr("text-anchor", "middle")
    .attr("fill", "#f8fafc")
    .text("${slug}");
};

export const unmount: VisualizationModule["unmount"] = (el) => {
  el.innerHTML = "";
};
`);

writeFileSync(join(base, "data.ts"), "export const data = [];\n");

writeFileSync(join(base, "config.ts"), `export const config = {
  title: "${slug}",
  description: "Describe this visualization here."
};
`);

writeFileSync(join(base, "README.md"), `# ${slug}\n\nDescribe the data, encoding, and interaction model.\n`);

console.log(`Created visualization scaffold at src/visualizations/${slug}`);
console.log("Next: add metadata in src/visualizations/_registry/visualizations.ts");