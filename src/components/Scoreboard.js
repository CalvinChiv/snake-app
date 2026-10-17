import React from "react";

function Scoreboard({ score, lives, scoreList, isPlaying }) {

    const scoreStyle = {
        position: "static",
        fontSize: "2rem",
        top: '100',
        backgroundColor: "rgba(255, 255, 255, 0.76)",
        height: 150,
        width: 500,
        margin: 25,
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'auto',
        border: '1px solid black'
    };

    var content = <div><p>Score: {score}</p>
        <p>lives: {lives}</p>
    </div>;

    if (!isPlaying) {
        content = <div>{scoreList.map((score, i) => {
            return <p>Snake {scoreList.length - i}: {score}</p>
        })}</div>;
    }

    return <div style={scoreStyle}>{content}</div>;
}

export default Scoreboard;