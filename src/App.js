import './App.css';
import { useState } from 'react';
import * as d3 from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { ColorLegend } from "./ColorLegend";

const width = Math.max(600, window.innerWidth - 20)
const height = window.innerHeight - 20;
const margin = { top: 70, right: 175, bottom: 100, left: 150 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right; 
const fadeOpacity = 0.2;

const xValue = d => d.sepal_length;
const xAxisLabel = 'Sepal Length';

const yValue = d => d.sepal_width;
const yAxisLabel = 'Sepal Width';

const colorValue = d => d.species;
const colorLegendLabel = "Species";

const circleRadius = 7;

const siFormat = d3.format(".2s");
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('.0', '');

function App() {
  const [hoveredValue, setHoveredValue] = useState(null);
  const data  = useData();
  
  if (!data) {
    return <pre>Loading...</pre>
  }

  const filteredData = data.filter(d => hoveredValue === colorValue(d));

  const xScale = d3.scaleLinear()
  .domain(d3.extent(data, xValue))
  .range([0, innerWidth])
  .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = d3.scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>

        <AxisBottom 
          xScale={xScale} 
          innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />

        <text 
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
          textAnchor="middle"
          className="axis-label"
        >{yAxisLabel}</text>

        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth}
          tickOffset={5}
        />

        <text 
          x={innerWidth / 2} 
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
          className="axis-label"
        >{xAxisLabel}</text>

        <g transform={`translate(${innerWidth + 40})`}>
          <text 
            textAnchor="middle"
            className="axis-label"
            x={33}
            y={-23}
          >{colorLegendLabel}</text>

          <ColorLegend 
            tickSpacing={20}
            tickSize={circleRadius}
            tickTextOffset={9}
            colorScale={colorScale}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>

        <g opacity={hoveredValue ? fadeOpacity : 1}>
          <Marks 
            data={data} 
            xScale={xScale} 
            xValue={xValue} 
            yScale={yScale} 
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
        <Marks 
          data={filteredData} 
          xScale={xScale} 
          xValue={xValue} 
          yScale={yScale} 
          yValue={yValue}
          colorScale={colorScale}
          colorValue={colorValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
        
      </g>
    </svg>
    )
}

export default App;
