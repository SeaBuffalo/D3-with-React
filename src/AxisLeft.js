export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => {
  return yScale.ticks().map(tickValue => (
    <g 
      className="tick"
      key={`group: ${tickValue}`}
      transform={`translate(0,${yScale(tickValue)})`}>
      <line 
        x2={innerWidth} 
        key={`line: ${tickValue}`}
      />
      <text
        style={{textAnchor: 'end'}}
        dy=".32em"
        x={-tickOffset}
        key={tickValue}
      >{tickValue}</text>
    </g>
  ))
}