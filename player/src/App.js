import { useEffect, useState } from 'react';
import './App.css';

function Move(e){
  alert(e.keyCode);
}

export default function App() {
  const [coords, setCoords] = useState({x: 0, y: 0});
  const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});

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

  const handleMouseMove = event => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      {coords.x} {coords.y}
      <div className="Person" style={{left: coords.x, top: coords.y}}></div>

    </div>
  );
}


