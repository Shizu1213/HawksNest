import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import map_entrance from '../screens/map_entrance_v1.jpg';
import star_bucks from '../screens/star_bucks_v1.png';
import person from '../images/person_v1.png';

import '../App.css';

export default function App(props) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
    const [playerCoords, setPlayerCoords] = useState({ x: 700, y: 480 })
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


    const moveCharacter = () => {
        setPlayerCoords({ x: globalCoords.x - 720, y: globalCoords.y - 600 })
        setIsMoving(false)
    }


    return (
        <div className='App' onClick={() => setIsMoving(true)} onMouseMove={handleMouseMove} style={{ backgroundImage: props.area, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
            {coords.x} {coords.y} {isMoving.toString()}

            <motion.img
                src={person}
                initial={{ left: playerCoords.x, top: playerCoords.y }}
                animate={{ x: isMoving ? moveCharacter() : playerCoords.x, y: isMoving ? moveCharacter() : playerCoords.y }}
                transition={{ duration: 1, type: "spring" }} style={{ position: 'absolute', width: 60, height: 80 }}>
            </motion.img>
        </div>
    );
}


