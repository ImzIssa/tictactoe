import React from "react"

export default function StartUp({startGame}) {
    return (
        <div className="container">
            <div className="header">Tic Tac Toe</div>
            <p>3x3</p>
            <button onClick={startGame}>Start</button>
        </div>
        
    )
}
