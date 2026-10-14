import React from "react";

function Tongue({ snake, lastDirection }) {
    let _left, _top, _width = 0, _height = 0;
    const headX = snake[snake.length - 1].x, headY = snake[snake.length - 1].y;

    switch (lastDirection) {
        case "ArrowUp":
            _width = 3;
            _height = 9;
            _left = `${headX + 2.1}%`;
            _top = `${headY - 1}%`;
            break;
        case "ArrowRight":
            _width = 9;
            _height = 3;
            _left = `${headX + 4}%`;
            _top = `${headY + 2}%`;
            break;
        case "ArrowDown":
            _width = 3;
            _height = 9;
            _left = `${headX + 2.1}%`;
            _top = `${headY + 4}%`;
            break;
        case "ArrowLeft":
            _width = 9;
            _height = 3;
            _left = `${headX - 1}%`;
            _top = `${headY + 2.1}%`;
            break;
        default:
            break;
    }

    return (
        <div
            style={
                {
                    width: `${_width}px`,
                    height: `${_height}px`,
                    left: _left,
                    top: _top,
                    backgroundColor: 'red',
                    position: 'absolute',
                    zIndex: 1,
                }
            }
        />
    );
}

export default Tongue;