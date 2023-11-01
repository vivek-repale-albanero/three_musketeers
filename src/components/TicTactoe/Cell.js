import { Grid, Paper } from "@material-ui/core";

import React from 'react'
import '../../styles/Gameboard.scss'
function Cell({ cell, onClick }) {
  return (

    <Paper
      className="GameCell"
      variant="outlined"
      onClick={onClick}
      
    >
      <img className="CellImage"src={cell} />
    </Paper>

  )
}

export default Cell



