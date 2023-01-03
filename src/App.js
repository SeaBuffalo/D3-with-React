import './App.css';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './Marks';

const width = 1000;
const height = 550;


function App() {
  const worldAtlas  = useWorldAtlas();
  const cities = useCities();

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>
  }

  return (
    <svg 
    width={width} 
    height={height} >
        <Marks worldAtlas={worldAtlas} cities={cities} />
    </svg>
    )
}

export default App;
