import React from 'react'
import '../components/TicTacToe/Tictac.css'
import GameBoard from '../components/TicTacToe/Gamboard'
import '../components/TicTacToe/Tictac.css'
import Title from '../components/TicTacToe/Title'
function TicTacPage() {
  return (
    <div className='Main'>
      <div className='SubMain'>
        <Title />
        <GameBoard />
      </div>

    </div>
  )
}

export default TicTacPage