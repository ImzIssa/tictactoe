import React from 'react'
import Board from "./components/Board"
import StartUp from "./components/StartUp"
import ScoreBoard from "./components/ScoreBoard"

export default function App() {
    const [start, setStart] = React.useState(false)
    const [playerX, setPlayerX] = React.useState(true)
    const [board, setBoard] = React.useState(createBoard())
    const [winner, setWinner] = React.useState('')
    const [draw, setDraw] = React.useState(false)
    const [timeLeft, setTimeLeft] = React.useState(() => 25)


    if(start) playerX?console.log("Xs Turn"):console.log("Os Turn")
    //TO-DO: BETTER DISPLAY DESIGNG

    const startGame = () => setStart(true)

    function createBoard(){
        return [
            {"val": '',"isSelected":false}, 
            {"val": '',"isSelected":false},
            {"val": '',"isSelected":false},
            {"val": '',"isSelected":false},
            {"val": '',"isSelected":false},
            {"val": '',"isSelected":false},
            {"val": '',"isSelected":false},
            {"val": '',"isSelected":false},
            {"val": '',"isSelected":false},
        ]
    }
    function placeMove(id, xOrO) {
        setBoard(prevBoard => prevBoard.map((card, idx)=> {
            if(id === idx && !card.isSelected){
                setPlayerX(prev => !prev)
                return {val:xOrO, isSelected: !card.isSelected}
            }
            return card
        }));
        (!winner || !draw) && setTimeLeft(()=>25)
    } 

    React.useEffect(() => {
        console.log('apa')
        if(!start) return
        //check for draw
        board.every((card) => card.isSelected) && setDraw(true)                

        //check rows
        if (board[0].val === board[1].val && board[0].val === board[2].val && board[0].val !== '')
            setWinner(board[0].val)
        if (board[3].val === board[4].val && board[3].val === board[5].val && board[3].val !== '')
            setWinner(board[3].val)
        if (board[6].val === board[7].val && board[6].val === board[8].val && board[3].val !== '')
            setWinner(board[6].val)

        //check columns
        if (board[0].val === board[3].val && board[0].val === board[6].val && board[0].val !== '')
            setWinner(board[0].val)
        if (board[1].val === board[4].val && board[1].val === board[7].val && board[1].val !== '')
            setWinner(board[1].val)
        if (board[2].val === board[5].val && board[2].val === board[8].val && board[2].val !=='')
            setWinner(board[2].val)

        //check diagonals
        if (board[0].val === board[4].val && board[0].val === board[8].val && board[0].val !== '')
            setWinner(board[0].val)
        if (board[2].val === board[4].val && board[2].val === board[6].val && board[2].val !== '')
            setWinner(board[2].val)        
    },[board])

    React.useEffect(() => {
        if(!start) return
        const interval = setInterval(()=> {
            if(timeLeft > 0 && !winner && !draw){
                setTimeLeft(time => time-1)
            }else if(!winner && !draw) {
                console.log('random')
                clearInterval(interval)
                while (true){
                    const id = Math.floor(Math.random()*board.length)
                    if (!board[id].isSelected){
                        play(id);
                        break;
                    }
                }
            }else{
                clearInterval(interval)
            }
       }, 1000)
        return () => clearInterval(interval)
    }, [timeLeft, board])

    function reset(){
        setBoard(createBoard())
        setPlayerX(true)
        setWinner('')
        setDraw('')
        setTimeLeft(()=>25)
    }



    function play(id){
        if(!winner)
            playerX ? placeMove(id, 'X') : placeMove(id, 'O');
    }
    
    return (
        <div className="container">
            {!start && <StartUp startGame={startGame} /> }
            {start && 
                <>
                    <ScoreBoard 
                        winner={winner} 
                        player={playerX}
                        draw={draw}
                        time={timeLeft}
                    />
                    <Board board={board} handleClick={play} />

                    {
                    (winner || draw) &&
                        <button className="game-over-btn" onClick={reset}>
                            Restart
                        </button>
                    }
                </>
            }
        </div>
    )
}
