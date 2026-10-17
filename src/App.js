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
  const [currentScore, setCurrentScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState([]);
  const [lives, setLives] = useState(0);
  const playgroundRef = useRef();

  useEffect(() => {
    if (!isStarted || gameOver) return;

    if ( // Collision Check
      snake[snake.length - 1].x === 100 ||
      snake[snake.length - 1].x === -4 ||
      snake[snake.length - 1].y === 100 ||
      snake[snake.length - 1].y === -4 ||
      isHittingBody(snake)
    ) {

      if (lives === 0) {
        setGameOver(true);

        // adds score to scoreboard
        setScores((prev) => [currentScore, ...prev]);
      }
      else {
        setLives(lives - 1) 

        // Respawn the snake
        setSnake(initialSnake.snake);
        setLastDirection(initialSnake.direction);
      };
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
    else {
      setFoodPosition(
        randomFoodPosition())
        setCurrentScore(currentScore+1);

      if (lives < 3 && currentScore > 1 && (currentScore + 1) % 10 == 0)
        setLives(lives + 1);
    }

    setSnake(tempSnake);
  };

  return (
    <div className='gameScreen'>
      <Scoreboard
        score={currentScore}
        lives={lives}
        scoreList={scores}
        isPlaying={!gameOver} />
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
                setCurrentScore(0);
                setLives(0);
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
    </div>
  );
}

export default App;