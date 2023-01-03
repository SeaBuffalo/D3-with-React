import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ worldAtlas: {land, interiors}, cities }) => (
  <g className="marks" >
    <path className="sphere" d={path({ type: "Sphere" })}/>
    <path className='graticules' d={path(graticule())} />
    {land.features.map((feature, i) => ( 
      <path 
        d={path(feature)}
        className="land"
        key={`path: ${i}`} />
    ))}
    <path className='interiors' d={path(interiors)} />
    {cities.map(d => {
      const [x,y] = projection([d.lng, d.lat]);
      return (
      <circle 
        cx={x} 
        cy={y} 
        r={1} 
        key={x + y}
      />)
    })}
  </g>
);
