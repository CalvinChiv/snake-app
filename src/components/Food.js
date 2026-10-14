import React from 'react';

function Food(position) {
    return (
        <div>
            style={{
                width: '15px',
                height: '15px',
                backgroundColor: '#5ef7ff',
                margin: '3px',
                position: 'absolute',
                left: '${position.x}%',
                top: '${position.y}%',
                zIndex: 0,
            }}
        </div>
    );
}

export default Food;