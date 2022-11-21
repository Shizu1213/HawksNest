import { useEffect, useState } from 'react';
import map_entrance_walls from './screens/map_entrance_v3.png';
import map_entrance from './screens/map_entrance_v1.png';
import star_bucks from './screens/star_bucks_v1.png';

import MapEntrance from './Components/MapEntrance';
import './App.css';

export default function App() {
  const [backgroundImage, setBackGroundImage] = useState(`url(${map_entrance_walls})`)

  return (
    <div className='Screen'>
      <MapEntrance area={backgroundImage} changeArea={setBackGroundImage} />
    </div>
  );
}


