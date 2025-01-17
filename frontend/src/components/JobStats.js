import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const JobStats = ({ jobStats }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (Object.keys(jobStats).length > 0) {
      drawChart();
    }
  }, [jobStats]);

  const drawChart = () => {
    const data = Object.entries(jobStats).map(([category, count]) => ({
      category,
      count
    }));

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .nice()
      .range([height, 0]);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y));

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.count))
      .attr('fill', 'steelblue');
  };

  return (
    <div>
      <h2>Job Statistics</h2>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default JobStats;
