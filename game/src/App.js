import { useEffect, useState } from 'react';

import map_entrance from './screens/map_entrance_v1.jpg';
import star_bucks from './screens/star_bucks_v1.png';

import MapEntrance from './Components/MapEntrance';
import './App.css';

export default function App() {
  const [backgroundImage, setBackGroundImage] = useState(`url(${map_entrance})`)
  
  return (
    <MapEntrance area= {backgroundImage} />
  );
}


