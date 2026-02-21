import * as d3 from "d3";

import type { VisualizationModule } from "../_registry/schema";
import { links, nodes, type LinkDatum, type NodeDatum } from "./data";

type SimNode = NodeDatum & d3.SimulationNodeDatum;
type SimLink = LinkDatum & d3.SimulationLinkDatum<SimNode>;

let cleanup: (() => void) | undefined;

function nodeX(node: string | SimNode): number {
  return typeof node === "string" ? 0 : node.x ?? 0;
}

function nodeY(node: string | SimNode): number {
  return typeof node === "string" ? 0 : node.y ?? 0;
}

export const mount: VisualizationModule["mount"] = (el) => {
  const width = 760;
  const height = 430;

  const svg = d3
    .select(el)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Force directed network");

  const color = d3.scaleOrdinal<number, string>().domain([1, 2, 3]).range(["#4fd1c5", "#ffb357", "#8ab4ff"]);

  const simNodes: SimNode[] = nodes.map((d) => ({ ...d }));
  const simLinks: SimLink[] = links.map((d) => ({ ...d }));

  const sim = d3
    .forceSimulation<SimNode>(simNodes)
    .force("link", d3.forceLink<SimNode, SimLink>(simLinks).id((d) => d.id).distance(120))
    .force("charge", d3.forceManyBody<SimNode>().strength(-240))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg
    .append("g")
    .selectAll<SVGLineElement, SimLink>("line")
    .data(simLinks)
    .join("line")
    .attr("stroke", "#6e84b5")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", (d) => 0.6 + d.weight * 0.8);

  const node = svg
    .append("g")
    .selectAll<SVGCircleElement, SimNode>("circle")
    .data(simNodes)
    .join("circle")
    .attr("r", 11)
    .attr("fill", (d) => color(d.group))
    .call(
      d3
        .drag<SVGCircleElement, SimNode>()
        .on("start", (event, d) => {
          if (!event.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  const labels = svg
    .append("g")
    .selectAll<SVGTextElement, SimNode>("text")
    .data(simNodes)
    .join("text")
    .attr("font-size", 11)
    .attr("fill", "#e5eefc")
    .attr("text-anchor", "middle")
    .attr("dy", 22)
    .text((d) => d.id);

  sim.on("tick", () => {
    link
      .attr("x1", (d) => nodeX(d.source))
      .attr("y1", (d) => nodeY(d.source))
      .attr("x2", (d) => nodeX(d.target))
      .attr("y2", (d) => nodeY(d.target));

    node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
    labels.attr("x", (d) => d.x ?? 0).attr("y", (d) => d.y ?? 0);
  });

  cleanup = () => {
    sim.stop();
  };
};

export const unmount: VisualizationModule["unmount"] = (el) => {
  cleanup?.();
  cleanup = undefined;
  el.innerHTML = "";
};