import * as d3 from "d3";

import type { VisualizationModule } from "../_registry/schema";
import { snapshots } from "./data";

let timer: number | undefined;

export const mount: VisualizationModule["mount"] = (el) => {
  const width = 760;
  const height = 430;
  const margin = { top: 30, right: 20, bottom: 30, left: 100 };

  const svg = d3
    .select(el)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("role", "img")
    .attr("aria-label", "Animated ranked bar chart");

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(snapshots.flatMap((s) => s.map((d) => d.value))) ?? 0])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleBand<string>()
    .domain(snapshots[0].map((d) => d.label))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

  const axis = svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(6).tickSizeOuter(0));

  axis.selectAll("text").attr("fill", "#9fb3d9");
  axis.selectAll("line,path").attr("stroke", "#4a5f8e");

  const layer = svg.append("g");

  const render = (index: number) => {
    const frame = [...snapshots[index]].sort((a, b) => b.value - a.value);
    y.domain(frame.map((d) => d.label));

    const bars = layer.selectAll<SVGRectElement, (typeof frame)[number]>("rect").data(frame, (d) => d.label);

    bars
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", margin.left)
            .attr("y", (d) => y(d.label) ?? 0)
            .attr("height", y.bandwidth())
            .attr("width", 0)
            .attr("fill", "#4fd1c5"),
        (update) => update,
        (exit) => exit.remove()
      )
      .transition()
      .duration(800)
      .attr("y", (d) => y(d.label) ?? 0)
      .attr("width", (d) => x(d.value) - margin.left);

    const labels = layer.selectAll<SVGTextElement, (typeof frame)[number]>("text").data(frame, (d) => d.label);

    labels
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("x", margin.left - 8)
            .attr("y", (d) => (y(d.label) ?? 0) + y.bandwidth() / 2)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .attr("fill", "#e5eefc")
            .text((d) => `${d.label} ${d.value}`),
        (update) => update,
        (exit) => exit.remove()
      )
      .transition()
      .duration(800)
      .attr("y", (d) => (y(d.label) ?? 0) + y.bandwidth() / 2)
      .tween("text", function (d) {
        const label = d3.select(this as SVGTextElement);
        const text = label.text();
        const current = Number(text.split(" ").at(-1)) || 0;
        const i = d3.interpolateNumber(current, d.value);
        return (t) => {
          label.text(`${d.label} ${Math.round(i(t))}`);
        };
      });
  };

  render(0);

  let step = 1;
  timer = window.setInterval(() => {
    render(step % snapshots.length);
    step += 1;
  }, 1300);
};

export const unmount: VisualizationModule["unmount"] = (el) => {
  if (timer) {
    window.clearInterval(timer);
    timer = undefined;
  }
  el.innerHTML = "";
};