import React from 'react';

export default function ScoreBoard ({winner, draw, player, time}) {

    return (
    	<div className="score-board">
    		<div className="timeEl">Time Left: {time}s</div>
    		<div className="turn">Player: {player ? "X":"O"}</div>
    		{
				winner ? <div className="winner">Winner: {winner}</div> :
				draw ? 
				<div className="winner">Draw</div> : ''
			}
    	</div>
    );
};


