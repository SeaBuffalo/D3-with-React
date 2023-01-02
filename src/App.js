import './App.css';
import { useState } from 'react';
import * as d3 from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const width = Math.max(600, window.innerWidth - 75)
const height = window.innerHeight - 75;
const margin = { top: 70, right: 70, bottom: 100, left: 150 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 50;
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right; 
const attributes = [
  {value: "sepal_length", label: "Sepal Length"},
  {value:"sepal_width", label: "Sepal Width"},
  {value: "petal_length", label: "Petal Length"},
  {value:"petal-width", label: "Petal Width"},
  {value:"species", label: "Species"}
];

const getLabel = value => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) return attributes[i].label;
  }
};

const siFormat = d3.format(".2s");
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('.0', '');

function App() {
  const data = useData();

  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) {
    return <pre>Loading...</pre>
  }

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  return (
    <>
      <div className='menus-container'>
        <span className='dropdown-label'>X</span>
        <Dropdown
          options={attributes}
          value={xAttribute}
          onChange={({value}) => setXAttribute(value)}
          className="drop"
        />
        <span className='dropdown-label'>Y</span>
        <Dropdown 
          options={attributes}
          value={yAttribute}
          onChange={({value}) => setYAttribute(value)}
          className="drop"
        />
      </div>
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
            circleRadius={7}
          />
          
        </g>
      </svg>
    </>
    )
}

export default App;
