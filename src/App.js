import './App.css';
import * as d3 from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = Math.max(1500, window.innerWidth - 20)
const height = window.innerHeight - 20;
const margin = { top: 20, right: 70, bottom: 100, left: 300 };
const xAxisLabelOffset = 50;
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right; 
const yValue = d => d.Country;
const xValue = d => d.Population;
const siFormat = d3.format(".2s");
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('.0', '');

function App() {
  const data  = useData();
  
  if (!data) {
    return <pre>Loading...</pre>
  }

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom 
          xScale={xScale} 
          innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text 
          x={innerWidth / 2} 
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
          className="axis-label"
        >Newborns</text>
        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
    )
}

export default App;
