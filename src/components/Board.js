import React from 'react';
import Oimage from '../images/O.png'
import Ximage from '../images/X.png'

export default function Board ({board, handleClick}) {

	const boardEls = board.map((card, id)=>{
		const styles = {}
		if(card.val === "X" && card.isSelected)
			styles.backgroundImage = `url(${Ximage})`		
		if(card.val === "O" && card.isSelected)
			styles.backgroundImage = `url(${Oimage})`	
		return (
			<div 
				key={id} 
				className='card item' 
				onClick={()=>handleClick(id)}
				style={styles}
			></div>
		)
	})
    return (
    	<div className="board">
    		{boardEls}
    	</div>
    );
};

