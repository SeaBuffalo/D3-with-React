export const AxisLeft = ({yScale}) => {
  return yScale.domain().map(tickValue => (
    <g className="tick" key={`group: ${tickValue}`}>
      <text
        style={{textAnchor: 'end'}}
        dy=".32em"
        x={-3}
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        key={tickValue}
      >{tickValue}</text>
    </g>
  ))
}