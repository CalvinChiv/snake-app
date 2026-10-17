import { useEffect, useRef, useState } from 'react';
import './App.css';
import Food from './components/Food';
import Snake from './components/Snake';
import Tongue from './components/Tongue';
import Scoreboard from './components/Scoreboard';

const randomFoodPosition = () => {
  const pos = { x: 0, y: 0 };
  let x = Math.floor(Math.random() * 96);
  let y = Math.floor(Math.random() * 96);
  pos.x = x - (x % 4);
  pos.y = y - (y % 4);
  return pos;
};

const initialSnake = {
  snake: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 8, y: 0 },
  ],
  direction: "ArrowRight",
  speed: 100,
};

function isHittingBody(snake) {
  let hitBody = false;

  for (let i = 0; i < snake.length - 2; i++) {
    if (snake[i].x === snake[snake.length - 1].x && snake[i].y === snake[snake.length - 1].y) {
      hitBody = true;
    }
  };

  return hitBody;
}

function App() {
  const [snake, setSnake] = useState(initialSnake.snake);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState([]);
  const playgroundRef = useRef();

  useEffect(() => {
    if (!isStarted || gameOver) return;

    if (
      snake[snake.length - 1].x === 100 ||
      snake[snake.length - 1].x === -4 ||
      snake[snake.length - 1].y === 100 ||
      snake[snake.length - 1].y === -4 ||
      isHittingBody(snake)
    ) {
      setGameOver(true);

      // adds score to scoreboard
      setScores((prev) => [...prev, + snake.length - 3]);

      return;
    }
    const interval = setInterval(move, initialSnake.speed);
    return () => clearInterval(interval);
  });

  const move = () => {
    const tempSnake = [...snake];
    let x = tempSnake[tempSnake.length - 1].x,
      y = tempSnake[tempSnake.length - 1].y;

    switch (lastDirection) {
      case "ArrowUp":
        y -= 4;
        break;
      case "ArrowRight":
        x += 4;
        break;
      case "ArrowDown":
        y += 4;
        break;
      case "ArrowLeft":
        x -= 4;
        break;
      default:
        break;
    }

    tempSnake.push({
      x,
      y,
    });

    if (x !== foodPosition.x || y !== foodPosition.y) tempSnake.shift();
    else setFoodPosition(randomFoodPosition());
    setSnake(tempSnake);
  };

  return (
    <> {/* fragment is our whole app */}
      <Scoreboard score={snake.length - 3} />
      <div
        className="App"
        onKeyDown={(e) => setLastDirection(e.key)}
        ref={playgroundRef}
        tabIndex={0}>
        {!isStarted && (
          <>
            <button
              onClick={() => {
                setIsStarted(true);
                playgroundRef.current.focus();
              }}
              type="submit"
            >
              Start
            </button>
            <div className="arrow-msg text">Press Arrow Keys to Play!</div>
          </>
        )}
        {gameOver && (
          <>
            <div className='game-over text'>Game Over!</div>
            <button
              onClick={() => {
                setIsStarted(true);
                setGameOver(false);
                setSnake(initialSnake.snake);
                setLastDirection(initialSnake.direction);
                playgroundRef.current.focus();
              }}
              type='submit'
            >
              Restart
            </button>
          </>
        )}

        {/* Renders */}
        <Snake snake={snake} lastDirection={lastDirection} />
        <Tongue snake={snake} lastDirection={lastDirection} />

        {!gameOver && (
          <>
            <Food position={foodPosition} />
          </>
        )}
      </div>
    </>
  );
}

export default App;