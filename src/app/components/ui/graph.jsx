import React, { useEffect, useRef } from "react";
import { forEach, some } from "lodash";
import * as d3 from "d3";
import { formatTitle } from "@/app/lib/util";

const ResultGraph = ({ paths }) => {
  const svgRef = useRef();

  function getWidth() {
    return document.querySelector("#graph-container").getBoundingClientRect()
      .width;
  }

  useEffect(() => {
    const color = d3.scaleOrdinal(d3.schemeDark2);
    const nodes = [];
    const links = [];
    const width = getWidth();

    const pathsLength = paths[0].length;
    const startingPage = formatTitle(paths[0][0]);
    const targetPageTitle = formatTitle(paths[0][pathsLength - 1]);

    paths.forEach((path) =>
      path.forEach((node, i) => {
        if (!some(nodes, ["id", formatTitle(node)])) {
          nodes.push({
            id: formatTitle(node),
            url: node,
            degree: i,
          });
        }

        if (i !== 0) {
          links.push({
            source: formatTitle(path[i - 1]),
            target: formatTitle(node),
          });
        }
      })
    );

    let svg = d3.select(svgRef.current);

    if (!svg.empty()) {
      svg.selectAll("*").remove();
    }

    svg = svg
      .attr("width", "100%")
      .attr("height", "600")
      .call(d3.zoom().on("zoom", zoomed))
      .append("g");

    const defs = svg.append("defs");

    // normal arrow
    defs
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    // end arrow
    defs
      .append("marker")
      .attr("id", "arrow-end")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 31)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, 600 / 2));

    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("marker-end", (d) => {
        if (d.target.id === targetPageTitle) {
          return "url(#arrow-end)";
        } else {
          return "url(#arrow)";
        }
      })
      .style("stroke", "#999")
      .style("stroke-opacity", 0.6);

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", (d) => {
        if (d.degree === 0 || d.degree === pathsLength - 1) {
          return 14;
        } else {
          return 10;
        }
      })
      .style("fill", (d) => color(d.degree.toString()))
      .style("stroke", "#ccc")
      .style("stroke-width", 1);

    node.on("click", (d) => {
      window.open(d.srcElement.__data__.url, "_blank");
    });

    const labels = svg
      .selectAll(".label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "start")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .style("font-size", "12px")
      .text((d) => d.id);

    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      labels
        .attr("x", (d) => {
          if (d.id === targetPageTitle || d.id === startingPage)
            return d.x + 16;
          else return d.x + 12;
        })
        .attr("y", (d) => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function zoomed(event) {
      svg.attr("transform", event.transform);
    }

    return () => simulation.stop();
  }, [paths]);

  return (
    <div className="flex justify-center w-full" id="graph-container">
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  );
};

export default ResultGraph;
