import { useEffect, useState } from "react";
import Cell from "./Cell.js";
import { Button, Grid } from "@material-ui/core";
import Title from './Title.js'
import X from '../../assests/x.png'
import O from '../../assests/o.png'
import React from 'react'
import '../../styles/Gameboard.scss'
import CalculatingRounds from "./CalculatingRounds.js";
import CustomButton from "./CustomButton.js";

const GameBoard = () => {
  const [UserCellsInput, setseconduserAndcell] = useState(JSON.parse(localStorage.getItem('gamedetails')) || '');
  const [cells, setCells] = useState((generateCells(Number(UserCellsInput.cellCount))));;
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('useLogedId')) || '');
  const [rounds, setrounds] = useState([])
  const [game, setgame] = useState("Not started")
  const[roundcount, setroundcount]=useState(1)


  const handleCellClick = (row, col) => {
    const cellsCopy = [...cells];
    if (cellsCopy[row][col] || winner) {
      alert("Cell is Already Selected");
      return;
    }
    cellsCopy[row][col] = xIsNext ? "X" : "O";
    setCells(cellsCopy);
    setXIsNext(!xIsNext);
    setgame("in Progress")

  };




  function generateCells(size) {
    const newCells = Array.from({ length: size }, () => Array(size).fill(null));
    return newCells;
  };




  const calculateWinner = (squares) => {
    const size = squares.length;
    console.log(squares)
    // Rows
    for (let i = 0; i < size; i++) {
      let row = '';
      for (let j = 0; j < size; j++) {
        row += squares[i][j];
      }
      console.log(row)
      if (row === "X".repeat(size) || row === "O".repeat(size)) {
        return squares[i][0];
      }
    }

    // Columns
    for (let i = 0; i < size; i++) {
      let col = '';
      for (let j = 0; j < size; j++) {
        col += squares[j][i];
      }
      if (col === "X".repeat(size) || col === "O".repeat(size)) {
        return squares[0][i];
      }
    }

    // Diagonals
    let diagonal1 = '';
    let diagonal2 = '';
    for (let i = 0; i < size; i++) {
      diagonal1 += squares[i][i];
      diagonal2 += squares[i][size - i - 1];
    }
    if (diagonal1 === "X".repeat(size) || diagonal1 === "O".repeat(size)) {
      return squares[0][0]; // Returns the winner symbol 'X' or 'O'
    }
    if (diagonal2 === "X".repeat(size) || diagonal2 === "O".repeat(size)) {
      return squares[0][size - 1]; // Returns the winner symbol 'X' or 'O'
    }

    return null; // No winner yet

  };



  // Function to reset the current game
  const handleResetGame = () => {
    setCells((generateCells(Number(UserCellsInput.cellCount))));
    setWinner(null);
    setXIsNext(true);
  };



  // Use useEffect to check for winner or draw scenario after every cell update
  useEffect(() => {
    const winner = calculateWinner(cells);
    const isDraw = cells.every(cell => cell.every(subcell => subcell !== null));
    console.log("winner", winner)
    if (winner) {
      setWinner(winner);
      alert(`Hurray! Winner is ${winner}`);
      setCells((generateCells(Number(UserCellsInput.cellCount))));
      setWinner(null);
      setgame(`hey the Winner is ${winner}`)
      setrounds((prev)=>[...prev,{status:`winner ${winner}`,round:`Round${roundcount}`}])
      setgame("Not Started")
      setroundcount(roundcount+1)
    }
    else if (isDraw) {
      alert("Game Over! It's a Draw.");
      setCells((generateCells(Number(UserCellsInput.cellCount))));
      setrounds((prev)=>[...prev,{status:"Draw",round:`Round${roundcount}`}])
      setWinner(null);
    }

  }, [cells]);


  // Display winner or current player's turn
  let status = winner ? `Winner: ${winner}` : `${xIsNext ? "X" : "O"}`;



  return (
    <div className={`GameBoardDiv size-${UserCellsInput.cellCount}`}>
      <div className="TicTactoe">
        <Title>Tic Tac Toe Game</Title>
        <div className="PlayerTurnDiv">Next Turn: <div>{status}</div></div>
        <Grid container spacing={3} >
          {cells?.map((row, rowIndex) => (
            <Grid className="Row"container key={rowIndex} spacing={2}>
              {row?.map((cell, colIndex) => (
                <Grid className="Column"item xs={Math.floor(1/ UserCellsInput.cellCount)} key={colIndex}>
                  <Cell cell={cell} onClick={() => handleCellClick(rowIndex, colIndex)} />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
        <div className="GameButtonDiv">
          <CustomButton onClick={handleResetGame}>Reset Game</CustomButton>
          <CustomButton  >Undo</CustomButton>
          {/* <CustomButton  >redu </CustomButton> */}

        </div>
      </div>
      <div className="Rounds">
        <CalculatingRounds Rounds = {rounds} roundCount={roundcount} progress={game} />
      </div>
    </div>
  );
};



export default GameBoard;

