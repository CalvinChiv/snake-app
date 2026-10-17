import React from "react";

function Scoreboard({ score }) {

    const scoreStyle = {
        position: "relative",
        fontSize: "2rem",
        top: -10,
        backgroundColor: "rgb(255, 255, 255)",
        color: "#eb2d2d",
        opacity: 0.5,
    };

    return (
        <div style={scoreStyle}>Score: {score}</div>
    )
}

export default Scoreboard;