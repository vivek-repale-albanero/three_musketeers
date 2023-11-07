import { useContext, useEffect, useState } from "react";
import Cell from "./Cell.js";
import Title from "./Title.js";
import React from "react";
import "../../styles/Gameboard.scss";
import CalculatingRounds from "./CalculatingRounds.js";
import CustomButton from "./CustomButton.js";
import Gamplayer from "./Gameplayer.js";
import { Redirect } from "react-router-dom";
import { PermissionContext } from "../../Context.js";

const GameBoard = () => {
  const { setUnAuthMsg } = useContext(PermissionContext);
  const { currentUser } = useContext(PermissionContext);
  const [UserCellsInput, setseconduserAndcell] = useState(
    JSON.parse(localStorage.getItem("gamedetails")) || ""
  );
  const [cells, setCells] = useState(
    generateCells(Number(UserCellsInput.cellCount))
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("useLogedId")) || ""
  );
  const [rounds, setrounds] = useState([]);
  const [game, setgame] = useState("Not Started");
  const [roundcount, setroundcount] = useState(1);
  const { userdetails } = UserCellsInput;
  const [a, b] = userdetails;

  const handleCellClick = (row, col) => {
    const cellsCopy = [...cells];
    if (cellsCopy[row][col] || winner) {
      alert("Cell is Already Selected");
      return;
    }
    cellsCopy[row][col] = xIsNext ? "X" : "O";
    setCells(cellsCopy);
    setXIsNext(!xIsNext);
    setgame("in Progress");
  };

  function generateCells(size) {
    const newCells = Array.from({ length: size }, () => Array(size).fill(null));
    return newCells;
  }

  const calculateWinner = (squares) => {
    const size = squares.length;
    // Rows
    for (let i = 0; i < size; i++) {
      let row = "";
      for (let j = 0; j < size; j++) {
        row += squares[i][j];
      }

      if (row === "X".repeat(size) || row === "O".repeat(size)) {
        return squares[i][0];
      }
    }

    // Columns
    for (let i = 0; i < size; i++) {
      let col = "";
      for (let j = 0; j < size; j++) {
        col += squares[j][i];
      }
      if (col === "X".repeat(size) || col === "O".repeat(size)) {
        return squares[0][i];
      }
    }

    // Diagonals
    let diagonal1 = "";
    let diagonal2 = "";
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
    if (!currentUser.Permission.gamePermission.subModules.gameResetPermission) {
      setUnAuthMsg("Please Athorize for Game Reset Permission");
      return <Redirect to="/unauth" />;
    }
    setCells(generateCells(Number(UserCellsInput.cellCount)));
    setWinner(null);
    setXIsNext(true);
  };

  // Use useEffect to check for winner or draw scenario after every cell update
  useEffect(() => {
    const winner = calculateWinner(cells);
    const isDraw = cells.every((cell) =>
      cell.every((subcell) => subcell !== null)
    );
    if (winner) {
      const realwinner =
        a.user.firstName == status ? b.user.firstName : a.user.firstName;
      console.log(realwinner, "realwinner");
      setWinner(realwinner);
      alert(`Hurray! Winner is ${realwinner}`);
      setCells(generateCells(Number(UserCellsInput.cellCount)));
      setWinner(null);
      setgame(`hey the Winner is ${realwinner}`);
      setrounds((prev) => [
        ...prev,
        { status: `winner ${realwinner}`, round: `Round${roundcount}` },
      ]);
      setgame("Not Started");
      setroundcount(roundcount + 1);
    } else if (isDraw) {
      alert("Game Over! It's a Draw.");
      setCells(generateCells(Number(UserCellsInput.cellCount)));
      setrounds((prev) => [
        ...prev,
        { status: "Draw", round: `Round${roundcount}` },
      ]);
      setWinner(null);
    }
  }, [cells]);

  // Display winner or current player's turn
  let status = winner
    ? `Winner: ${winner}`
    : `${xIsNext ? a.user.firstName : b.user.firstName}`;

  console.log(status, "winner winner chicken dinner");
  return (
    <div className={`GameBoardDiv size-${UserCellsInput.cellCount}`}>
      <div className="UserCards">
        <Gamplayer userdetails={UserCellsInput.userdetails} />
      </div>
      <div className="TicTactoe">
        <div className="tictocdiv">
          <Title>Tic Tac Toe Game</Title>
          <div className="PlayerTurnDiv">
            Next Turn: <div>{status}</div>
          </div>
          <div className="MainGridDiv">
            {cells?.map((row, rowIndex) => (
              <div className="Row" key={rowIndex} spacing={2}>
                {row?.map((cell, colIndex) => (
                  <div className="Column" key={colIndex}>
                    <Cell
                      cell={cell}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="GameButtonDiv">
            <CustomButton onClick={handleResetGame}>Reset Game</CustomButton>
            <CustomButton>Undo</CustomButton>
            {/* <CustomButton  >redu </CustomButton> */}
          </div>
        </div>
      </div>
      <div className="Rounds">
        <CalculatingRounds
          Rounds={rounds}
          roundCount={roundcount}
          progress={game}
        />
      </div>
    </div>
  );
};

export default GameBoard;
