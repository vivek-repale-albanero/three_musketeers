import React from 'react'
import '../styles/Tictac.scss'
import GameBoard from '../components/TicTactoe/Gameboard'
import Gameplayer from '../components/TicTactoe/Gameplayer'
import Layout from '../Layout/Layout'


function TicTacPage() {
  return (
    <Layout>
      <div className='Main'>
        <GameBoard />
    
      </div>
      </Layout>
  
  )
}

export default TicTacPage