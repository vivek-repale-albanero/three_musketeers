import React from 'react'
import '../styles/Tictac.scss'
import GameBoard from '../components/TicTactoe/Gameboard'
import Gameplayer from '../components/TicTactoe/Gameplayer'
import Layout from '../Layout/Layout'
import BreadCrumb from '../components/Breadcrumbs/BreadCrumb'
import { Box, Typography } from '@material-ui/core'


function TicTacPage() {
  return (
    <Layout>
      <Box className="title">
        <Typography style={{fontSize:"24px"}}>
          Enjoy your Game!!!
      <BreadCrumb/>
        </Typography>
      </Box>
      <div className='Main'>
        <GameBoard />
    
      </div>
      </Layout>
  
  )
}

export default TicTacPage