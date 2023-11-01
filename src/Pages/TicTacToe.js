import React from 'react'
import '../styles/Tictac.scss'
import GameBoard from '../Components/TicTactoe/Gameboard'
import Gameplayer from '../Components/TicTactoe/Gameplayer'


function TicTacPage() {
  return (
    
      <div className='Main'>
        <Gameplayer />
        <GameBoard />
    
      </div>

  
  )
}

export default TicTacPage