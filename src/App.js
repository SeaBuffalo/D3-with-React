import './App.css';
import { scaleSqrt, max } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './Marks';

const width = 1000;
const height = 500;


function App() {
  const worldAtlas  = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>
  }

  const sizeValue = d => d.population = +d.population;
  const maxRadius = 15;
  const sizeScale = scaleSqrt()
  .domain([0, max(cities, sizeValue)])
  .range([0, maxRadius]);

  return (
    <svg 
      width={width} 
      height={height} >
        
        <Marks 
          worldAtlas={worldAtlas}  
          cities={cities} 
          sizeScale={sizeScale}
          sizeValue={sizeValue}/>
    </svg>
    )
}

export default App;
