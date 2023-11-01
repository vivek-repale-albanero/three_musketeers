import React from 'react'
import '../styles/Tictac.scss'
import GameBoard from '../components/TicTactoe/Gameboard'
import Gameplayer from '../components/TicTactoe/Gameplayer'


function TicTacPage() {
  return (
    
      <div className='Main'>
        <Gameplayer />
        <GameBoard />
    
      </div>

  
  )
}

export default TicTacPage