import './App.css';
import * as d3 from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = Math.max(600, window.innerWidth - 20)
const height = window.innerHeight - 20;
const margin = { top: 70, right: 70, bottom: 100, left: 150 };
const xAxisLabelOffset = 68;
const yAxisLabelOffset = 60;
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right; 

const xValue = d => d["Reported Date"];
const xAxisLabel = 'Time';

const yValue = d => d["Total Dead and Missing"];
const yAxisLabel = "Total Dead and Missing";

const xAxisTickFormat = d3.timeFormat("%m/%d/%Y");
// d["Total Dead and Missing"] = +d["Total Dead and Missing"];
// d["Reported Date"] = new Date(d["Reported Date"]);

function App() {
  const data  = useData();
  
  if (!data) {
    return <pre>Loading...</pre>
  }

  const xScale = d3.scaleTime()
  .domain(d3.extent(data, xValue))
  .range([0, innerWidth])
  .nice();

    const [start, stop] = xScale.domain();

    const binnedData = d3.bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(d3.timeMonths(start, stop))(data)
    .map(array =>({
      y: d3.sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(binnedData, d => d.y)])
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>

        <AxisBottom 
          xScale={xScale} 
          innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat}
          tickOffset={15}
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
          binnedData={binnedData} 
          innerHeight={innerHeight}
          xScale={xScale} 
          yScale={yScale} 
          tooltipFormat={xAxisTickFormat}
          circleRadius={2}
        />
        
      </g>
    </svg>
    )
}

export default App;
