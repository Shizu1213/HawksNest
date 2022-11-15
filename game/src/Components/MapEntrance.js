import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import map_entrance from '../screens/map_entrance_v1.png';
import star_bucks from '../screens/star_bucks_v1.png';

import person from '../images/normal.png';
import down_a from '../images/down_a.png';
import down_b from '../images/down_b.png';
import left_a from '../images/left_a.png';
import left_b from '../images/left_b.png';
import right_a from '../images/right_a.png';
import right_b from '../images/right_b.png';

import '../App.css';

export default function App(props) {
    //Game State
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
    const [playerCoords, setPlayerCoords] = useState({ x: 600, y: 480 });

    const [playerImage, setPlayerImage] = useState(person);

    const [isSprinting, setIsSprinting] = useState(false)

    const [isMovingHorizontally, setIsMovingHorizontally] = useState(false)
    const [isMovingVertically, setIsMovingVertically] = useState(false)

    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);
    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);

    //Set up Game Coordinates
    useEffect(() => {
        // get global mouse coordinates
        const handleWindowMouseMove = event => {
            setGlobalCoords({
                x: event.screenX,
                y: event.screenY,
            });
        };
        //Managing movement state on key up and key down
        //Key Down
        const handleMovementState = event => {
            switch (event.keyCode) {
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
                case 16:
                    setIsSprinting(true)
                    break;
            }

        }
        //Key up
        const handleKeyRelease = event => {
            switch (event.keyCode) {
                case 37:
                    setIsMovingLeft(false)
                    setIsMovingHorizontally(false)
                    break;
                case 38:
                    setIsMovingUp(false)
                    setIsMovingVertically(false)
                    break;
                case 39:
                    setIsMovingRight(false)
                    setIsMovingHorizontally(false)
                    break;
                case 40:
                    setIsMovingDown(false)
                    setIsMovingVertically(false)
                    break;
                case 16:
                    setIsSprinting(false)
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

    //Area Change Handler
    const checkAreaChange = () => {
        switch (props.area) {
            case `url(${map_entrance})`:
                if (playerCoords.x >= 1220) {
                    props.changeArea(`url(${star_bucks})`)
                    setPlayerCoords({ x: 5, y: playerCoords.y })
                }
                break;
            case `url(${star_bucks})`:
                if (playerCoords.x <= 0) {
                    props.changeArea(`url(${map_entrance})`)
                    setPlayerCoords({ x: 1215, y: playerCoords.y })
                }
                break;
        }
    }
    //Wall Handler
    const checkWall = () => {
        switch (props.area) {
            case `url(${map_entrance})`:
        }
    }

    //Keyboard Movement
    const horrizontalMovement = () => {
        if (isMovingLeft) {
            if (playerImage == left_a) setPlayerImage(left_b)
            else setPlayerImage(left_a)
            setPlayerCoords({ x: isSprinting ? playerCoords.x - 10 : playerCoords.x - 5, y: playerCoords.y })
            setIsMovingLeft(false)
        }
        if (isMovingRight) {
            if (playerImage == right_a) setPlayerImage(right_b)
            else setPlayerImage(right_a)
            setPlayerCoords({ x: isSprinting ? playerCoords.x + 10 : playerCoords.x + 5, y: playerCoords.y })
            setIsMovingRight(false)
        }
        setIsMovingHorizontally(false)
        checkAreaChange()
        return playerCoords.x
    }
    const verticalMovement = () => {
        if (isMovingUp) {
            setPlayerCoords({ x: playerCoords.x, y: isSprinting ? playerCoords.y - 10 : playerCoords.y - 5 })
            setIsMovingUp(false)
        }
        if (isMovingDown) {
            if (playerImage == down_a) setPlayerImage(down_b)
            else setPlayerImage(down_a)
            setPlayerCoords({ x: playerCoords.x, y: isSprinting ? playerCoords.y + 10 : playerCoords.y + 5 })
            setIsMovingDown(false)
        }
        setIsMovingVertically(false)
        return playerCoords.y
    }

    return (
        <div className='PlayerView' style={{ backgroundImage: props.area, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            {playerCoords.x} {playerCoords.y}
            <motion.img
                src={playerImage}
                initial={{ left: playerCoords.x, top: playerCoords.y }}
                animate={{ left: isMovingHorizontally ? horrizontalMovement() : playerCoords.x, top: isMovingVertically ? verticalMovement() : playerCoords.y }}
                transition={{ duration: .01, type: "keyframes" }}
                style={{ position: 'absolute', width: 60, height: 80 }}>
            </motion.img>
        </div>
    );
}


