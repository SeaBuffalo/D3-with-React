export const ColorLegend = ({ 
  colorScale, 
  tickSpacing = 20, 
  tickSize = 10, 
  tickTextOffset = 20,
  onHover,
  hoveredValue,
  fadeOpacity
}) => 
  colorScale.domain().map((domainValue, i) => (
    <g 
      transform={`translate(0,${i * tickSpacing})`} 
      key={colorScale(domainValue)}
      className="tick"
      onMouseEnter={() => onHover(domainValue)}
      onMouseOut={() => onHover(null)}
      opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
    >
      <circle 
        fill={colorScale(domainValue)}
        r={tickSize}
      />
      <text dy=".32em" x={tickTextOffset}>{domainValue}</text>
    </g>
  ));
