import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import map_entrance from '../screens/map_entrance_v1.jpg';
import star_bucks from '../screens/star_bucks_v1.png';
import person from '../images/person_v1.png';

import '../App.css';

export default function App(props) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
    const [playerCoords, setPlayerCoords] = useState({ x: 600, y: 480 });
    const [isMoving, setIsMoving] = useState(false);

    const [isMovingHorizontally, setIsMovingHorizontally] = useState(false)
    const [isMovingVertically, setIsMovingVertically] = useState(false)

    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);
    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);


    useEffect(() => {
        // get global mouse coordinates
        const handleWindowMouseMove = event => {
            setGlobalCoords({
                x: event.screenX,
                y: event.screenY,
            });
        };
        //Managing movement state on key up and key down
        const handleMovementState = event => {
            switch(event.keyCode){
                case 37:
                    setIsMovingLeft(true)
                    setIsMovingHorizontally(true)
                    break;
                case 38:
                    setIsMovingUp(true)
                    setIsMovingVertically(true)
                    break;
                case 39:
                    setIsMovingRight(true)
                    setIsMovingHorizontally(true)
                    break;
                case 40:
                    setIsMovingDown(true)
                    setIsMovingVertically(true)
                    break;
            }
        }
        const handleKeyRelease = event => {
            switch(event.keyCode){
                case 37:
                    setIsMovingLeft(false)
                    setIsMovingHorizontally(false)
                case 38:
                    setIsMovingUp(false)
                    setIsMovingVertically(false)
                case 39:
                    setIsMovingRight(false)
                    setIsMovingHorizontally(false)
                case 40:
                    setIsMovingDown(false)
                    setIsMovingVertically(false)
                    break;
            }
        }
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('keydown', handleMovementState);
        window.addEventListener('keyup', handleKeyRelease);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('keydown', handleMovementState);
            window.removeEventListener('keyup', handleKeyRelease);
        };

    }, []);

    //Handles cords of mouse
    const handleMouseMove = event => {
        setCoords({
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop,
        });
    };

    //Mouse Movement
    const moveCharacter = () => {
        setPlayerCoords({ x: globalCoords.x - 720, y: globalCoords.y - 600 })
        setIsMoving(false)
    }
    //Keyboard Movement
    const horrizontalMovement = () => {
        if(isMovingLeft){
            setPlayerCoords({ x: playerCoords.x -5, y: playerCoords.y})
            setIsMovingLeft(false)
        }
        if(isMovingRight){
            setPlayerCoords({ x: playerCoords.x + 5, y: playerCoords.y})
            setIsMovingRight(false)
        }
        setIsMovingHorizontally(false)
        return playerCoords.x
    }
    const verticalMovement = () => {
        if(isMovingUp){
            setPlayerCoords({ x: playerCoords.x , y: playerCoords.y - 5})
            setIsMovingUp(false)
        }
        if(isMovingDown){
            setPlayerCoords({ x: playerCoords.x, y: playerCoords.y + 5})
            setIsMovingDown(false)
        }
        setIsMovingVertically(false)
        return playerCoords.y
    }
    
    return (
        <div className='App' onClick={() => setIsMoving(true)} onMouseMove={handleMouseMove} style={{ backgroundImage: props.area, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} >
            {coords.x} {coords.y} {isMovingLeft.toString()}
            <motion.img
                src={person}
                initial={{ left: playerCoords.x, top: playerCoords.y }}
                animate={{ left: isMovingHorizontally ? horrizontalMovement() : playerCoords.x, top: isMovingVertically ? verticalMovement() : playerCoords.y}}
                transition={{ duration: .0001, type: "keyframes" }} 
                style={{ position: 'absolute', width: 60, height: 80 }}>
            </motion.img>
        </div>
    );
}


