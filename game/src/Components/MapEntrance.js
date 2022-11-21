import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import map_entrance from '../screens/map_entrance_v3.png';
import star_bucks from '../screens/star_bucks_v1.png';

import person from '../images/normal.png';
import down_a from '../images/down_a.png';
import down_b from '../images/down_b.png';

import left_a from '../images/left_a.png';
import left_b from '../images/left_b.png';
import left_c from '../images/left_c.png';

import right_a from '../images/right_a.png';
import right_b from '../images/right_b.png';

import '../App.css';

export default function App(props) {
    //Game State
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

    const [playerCoords, setPlayerCoords] = useState({ x: 25, y: 25 });

    const [playerImage, setPlayerImage] = useState(person);
    const [playerMessage, setPlayerMessage] = useState("Hello World the earth is flat and Bitcoin should be legal tender and");

    const [isSprinting, setIsSprinting] = useState(false)
    const [wallCollision, setWallCollision] = useState(false)

    const [isMovingHorizontally, setIsMovingHorizontally] = useState(false)
    const [isMovingVertically, setIsMovingVertically] = useState(false)

    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);
    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);

    const [mapEntranceWalls, setEntranceWalls] = useState([{ x: 0, y: 0 }]);

    //Set up Game 
    useEffect(() => {
        //Define Walls for main entrance
        for(let x = 0; x < 990; x = x + 5){
            mapEntranceWalls.push({x: x, y: 510})
        }


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
                default:
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
                default:
                    break;
            }
        }
        //Add event handlers on page load
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('keydown', handleMovementState);
        window.addEventListener('keyup', handleKeyRelease);

        //Remove event handlers when not being used
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
                if (playerCoords.x >= 1480) {
                    props.changeArea(`url(${star_bucks})`)
                    setPlayerCoords({ x: 5, y: playerCoords.y })
                }
                break;
            case `url(${star_bucks})`:
                if (playerCoords.x < 0) {
                    props.changeArea(`url(${map_entrance})`)
                    setPlayerCoords({ x: 1475, y: playerCoords.y })
                }
                break;
        }
    }

    //Wall Handler
    const checkWallCollision = () => {
        switch (props.area) {
            case `url(${map_entrance})`:
                mapEntranceWalls.forEach(wall => {
                    if(playerCoords.x == wall.x && playerCoords.y== wall.y)  setWallCollision(true);

                })
            
        }
    }
    const mapEntranceCollisionHandler = () => {

        //Top left walls
        //if (playerCoords.y < 255 && playerCoords.x < 245) setPlayerCoords({ x: playerCoords.x, y: playerCoords.y + 10 })
        
    }
    //Keyboard Movement
    const horrizontalMovement = () => {
        const ogPos = playerCoords;
        if (isMovingLeft) {
            if (playerImage == left_a) setPlayerImage(left_b)
            else if (playerImage == left_b) setPlayerImage(left_c)
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

        //Check Game Walls
        checkWallCollision();
        if(wallCollision == true) {
            setPlayerCoords(ogPos);
            setWallCollision = false;
        }

        return playerCoords.x
    }
    const verticalMovement = () => {
        const ogPos = playerCoords;
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
        checkAreaChange()
        //Check Game Walls
        checkWallCollision()
        if(wallCollision == true) {
            setPlayerCoords(ogPos);
            setWallCollision = false;
        }
        return playerCoords.y
    }
    //Textbox Component for writing messages
    const TextBox = () => {
        return (<form className='TextBox' >
            <input type="text" onChange={(e) => { setPlayerMessage(e.target.value) }} value={playerMessage} style={{ backgroundColor: 'transparent', color: 'yellow', borderRadius: 20, width: '98%', height: '75%', borderColor: 'blue', position: 'relative' }}></input>
        </form>)
    }
    const Player = () => {
        return (<div>
            <motion.img
                src={playerImage}
                initial={{ marginLeft: playerCoords.x, marginTop: playerCoords.y }}
                animate={{ marginLeft: isMovingHorizontally ? horrizontalMovement() : playerCoords.x, marginTop: isMovingVertically ? verticalMovement() : playerCoords.y }}
                transition={{ duration: .01, type: "keyframes" }}
                style={{ position: 'relative', width: 60, height: 80, outline: '1px solid black' }}>
            </motion.img>
            <motion.div className='PlayerMessage' style={{ left: playerCoords.x - 40, top: playerCoords.y - 55 }}>{playerMessage}</motion.div>
        </div>)
    }
    const Wall = (props) => {
        return(<div style={{ position: 'absolute', left: props.x + 60, top: props.y + 80, width: 5, height: 5, backgroundColor: 'yellow'}}></div>)
    }

    return (
        <div className='GameView' style={{ backgroundImage: props.area, backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}>
            {playerCoords.x} {playerCoords.y}

            <Player />
            <TextBox />
        </div>
    );
}


