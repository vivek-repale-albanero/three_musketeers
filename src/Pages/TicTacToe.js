import React,{useContext,useEffect} from 'react'
import { useLocation } from "react-router-dom";

import '../styles/Tictac.scss'
import GameBoard from '../components/TicTactoe/Gameboard'
import Gameplayer from '../components/TicTactoe/Gameplayer'
import Layout from '../Layout/Layout'
import BreadCrumb from '../components/Breadcrumbs/BreadCrumb'
import { Box, Typography } from '@material-ui/core'
import { PermissionContext } from '../Context'


function TicTacPage() {
  const { setBreadCrumbProps,breadCrumbSet } = useContext(PermissionContext);
  const location = useLocation();
  useEffect(()=>{
    const loc = breadCrumbSet(location)
   const pathName = location.pathname.split("/").filter((path) => path);
  if(pathName.length > 1){
    setBreadCrumbProps({navLinks:[...loc.navprev],activeLink:{name:loc.end}})
  }else{
         setBreadCrumbProps({navLinks:[],activeLink:{name:loc.end}})
  }
},[location])


  return (
    <Layout>
      <Box className="title">
        <Typography style={{fontSize:"24px"}}>
          Enjoy your Game!!!
      {/* <BreadCrumb/> */}
        </Typography>
      </Box>
      <div className='Main'>
        <GameBoard />
    
      </div>
      </Layout>
  
  )
}

export default TicTacPage