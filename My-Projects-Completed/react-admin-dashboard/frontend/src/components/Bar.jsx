import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Bar = () => {
  const newData = [
    { date: "2023-10-01", totalClicks: 12 },
    { date: "2023-10-02", totalClicks: 18 },
    { date: "2023-10-03", totalClicks: 25 },
    { date: "2023-10-04", totalClicks: 8 },
    { date: "2023-10-05", totalClicks: 15 },
    { date: "2023-10-06", totalClicks: 50 },
    { date: "2023-10-08", totalClicks: 15 },
    { date: "2023-10-012", totalClicks: 23},
    { date: "2023-10-24", totalClicks: 40},
    { date: "2023-10-27", totalClicks: 11 },

  ];

  const svgRef = useRef();

  useEffect(() => {
    const w = 1000;
    const h = 500;
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const dates = newData.map((d) => d.date);
    const totalClicks = newData.map((d) => d.totalClicks);

    const xScale = d3.scaleBand().domain(dates).range([0, w]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(totalClicks)]).nice().range([h, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    const barsGroup = svg.append("g").attr("class", "bars");

    const bars = barsGroup.selectAll(".bar");

    bars
      .data(newData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.date))
      .attr("y", (d) => yScale(d.totalClicks))
      .attr("width", xScale.bandwidth() * 0.6)
      .attr("height", (d) => h - yScale(d.totalClicks))
      .attr("class", "bar")
      .attr("fill", "aqua");

    // Add text labels for totalClicks on hover
    bars
      .on("mouseover", function (event, d) {
        const totalClicksValue = d.totalClicks;
        const x = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
        const y = parseFloat(d3.select(this).attr("y")) - 5;

        // Append a tooltip with text and background color changes
        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", x)
          .attr("y", y)
          .text(totalClicksValue)
          .style("text-anchor", "middle")
          .style("fill", "white") // Text color
          .style("background-color", "black"); // Background color
      })
      .on("mouseout", function () {
        // Remove the tooltip text on mouseout
        svg.select(".tooltip").remove();
      });
  }, [newData]);

  return (
    <div style={{ width: "1000px", marginBottom: "20px" }} className="bar">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Bar;