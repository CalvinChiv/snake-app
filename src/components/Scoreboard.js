import React from "react";

function Scoreboard({ score, scoreList, isPlaying }) {

    const scoreStyle = {
        position: "static",
        fontSize: "2rem",
        top: '100',
        backgroundColor: "rgba(255, 255, 255, 0.76)",
        height: 100,
        width: 200,
        margin: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={scoreStyle}>Score: {score}</div>
    )
}

export default Scoreboard;