export const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius = 10 }) => {
  return data.map((d, i) => 
    {
      return (<circle 
        cx={xScale(xValue(d))} 
        cy={yScale(yValue(d))} 
        r={circleRadius}
        className="mark"
        key={`circle: ${i}`}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>)
    }
  )
}