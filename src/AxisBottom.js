
export const AxisBottom = ({xScale, innerHeight, tickFormat}) => {
   return xScale.ticks().map(tickValue => (
  <g 
    transform={`translate(${xScale(tickValue)},0)`}
    key={`group: ${tickValue}`}
    className="tick">
    <line 
      y2={innerHeight} 
      key={`line: ${tickValue}`}
    />
    <text 
      dy=".71em" 
      y={innerHeight + 3} 
      style={{textAnchor: 'middle'}}
      key={tickValue}
    >{tickFormat(tickValue)}</text>
  </g>
  ))
}