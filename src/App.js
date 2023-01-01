import './App.css';
import * as d3 from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = Math.max(600, window.innerWidth - 20)
const height = window.innerHeight - 20;
const margin = { top: 70, right: 70, bottom: 100, left: 150 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right; 

const xValue = d => d.timestamp;
const xAxisLabel = 'Time';

const yValue = d => d.temperature;
const yAxisLabel = 'Temperature';

const xAxisTickFormat = d3.timeFormat("%a");

function App() {
  const data  = useData();
  
  if (!data) {
    return <pre>Loading...</pre>
  }

  const xScale = d3.scaleTime()
  .domain(d3.extent(data, xValue))
  .range([0, innerWidth])
  .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

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

        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={4}
        />
        
      </g>
    </svg>
    )
}

export default App;
