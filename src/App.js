import {useState} from "react";

function Square({value,onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice();
        (xIsNext) ? nextSquares[i] = 'X' : nextSquares[i] = 'O';
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    (winner) ? status = 'Ganador: ' + winner : status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((step, move) => {
        let description;
        (move)>0 ? description = 'Ir al movimiento #' + move : description = 'Ir al inicio del juego';

        return (
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]; // 8 possible winning combinations

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]; // destructure
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // return winner
        }
    }
    return null; // no winner
}

/*TODO
Solo para el movimiento actual, muestra «Estás en el movimiento #…» en lugar de un botón
Vuelve a escribir Board para usar dos bucles para crear los cuadrados en lugar de codificarlos.
Agrega un botón de alternancia que te permita ordenar los movimientos en orden ascendente o descendente.
Cuando alguien gane, resalta los tres cuadrados que causaron la victoria (y cuando nadie gane, muestra un mensaje indicando que el resultado fue un empate).
Muestra la ubicación de cada movimiento en el formato (columna, fila) en la lista del historial de movimientos.
 */