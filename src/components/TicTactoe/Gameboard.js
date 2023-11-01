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
  const [turn, setturn] = useState(true)
  const [rounds, setrounds] = useState([])
  // Function to handle a cell click

  const handleCellClick = (row, col) => {
    const cellsCopy = [...cells];
    if (cellsCopy[row][col] || winner) {
      alert("Cell is Already Selected");
      return;
    }

    cellsCopy[row][col] = xIsNext ? X : O;
    setCells(cellsCopy);
    setXIsNext(!xIsNext);
    // setrounds((prev)=>[])
  };



  function generateCells(size) {
    const newCells = Array.from({ length: size }, () => Array(size).fill(null));
    console.log(newCells)
    return newCells;
  };



  console.log(UserCellsInput)
  const calculateWinner = (squares) => {


    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };



  // Function to reset the current game
  const handleResetGame = () => {
    setCells((generateCells(Number(UserCellsInput.cellCount))));
    setWinner(null);
    setXIsNext(true);
  };

  console.log(cells)
  // Use useEffect to check for winner or draw scenario after every cell update
  useEffect(() => {
    const winner = calculateWinner(cells);
    const isDraw = cells.every(cell => cell.every(subcell => subcell !== null));
    console.log(isDraw)
    if (winner) {
      setWinner(winner);
      alert(`Hurray! Winner is ${winner}`);
      setCells((generateCells(Number(UserCellsInput.cellCount))));
      setWinner(null);
    }
    else if (isDraw) {
      alert("Game Over! It's a Draw.");
      setCells((generateCells(Number(UserCellsInput.cellCount))));
      setWinner(null);
    }

  }, [cells]);

  // Display winner or current player's turn
  let status = winner ? `Winner: ${winner}` : `${xIsNext ? X : O}`;


  return (

    <div className="GameBoardDiv">
      <div className="TicTactoe">
        <Title />
        <div className="PlayerTurnDiv">Next Turn: <div><img height="30px" src={status} alt="" /></div></div>
        <Grid container spacing={2} width={'70%'} margin={'auto'}>
          {cells?.map((row, rowIndex) => (
            <Grid container item xs={12} key={rowIndex}>
              {row?.map((cell, colIndex) => (
                <Grid item xs={Math.floor(12 / UserCellsInput.cellCount)} key={colIndex}>
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

        <CalculatingRounds />

      </div>

    </div>
  );
};

export default GameBoard;

