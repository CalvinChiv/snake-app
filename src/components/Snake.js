import React from 'react';

function Snake({snake}) {
    console.log("Snake:", snake);
    console.log("Is array?", Array.isArray(snake));

    return(
        <div>
            {snake.map((box, i) => (
                <div
                    style={{
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#e9df23',
                        margin: '5px',
                        position: 'absolute',
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        zIndex: 1,
                    }}
                />
            ))}
        </div>
    );
}

export default Snake;