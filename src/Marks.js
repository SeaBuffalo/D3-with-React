export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat }) => {
  return data.map(d => 
    <rect 
      x={0} 
      y={yScale(yValue(d))} 
      width={xScale(xValue(d))} 
      height={yScale.bandwidth()}
      key={yValue(d)}
      className="mark"
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  )
}