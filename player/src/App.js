import { useEffect, useState } from 'react';
import './App.css';
import map_entrance from './screens/map_entrance_v1.jpg'

export default function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [playerCoords, setPlayerCoords] = useState({ x: 680, y: 530 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    // get global mouse coordinates
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };

  }, []);

  //Handles cords of mouse
  const handleMouseMove = event => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };
  
  //Event Listeners
  window.addEventListener('keydown', (event) => {
    setIsMoving(true)
    setPlayerCoords({x: playerCoords.x - 3, y: playerCoords.y})
  })
  window.addEventListener('keyup', (event) => {
    setIsMoving(false);
  })


  return (
    <div className="App" onMouseMove={handleMouseMove} style={{ backgroundImage: `url(${map_entrance})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
      {coords.x} {coords.y}
      <div className="Person" style={{ left: playerCoords.x, top: playerCoords.y }}></div>
    </div>
  );
}


