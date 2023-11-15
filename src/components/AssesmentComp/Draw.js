
 import React from 'react'
 import Drawer from '@material-ui/core/Drawer';
import Layout from '../../Layout/Layout';
import './Draw.scss'
import {
  
  AlbaButton,
  
} from "@platform/service-ui-libraries";
import FileSystemNavigator from './Treee';
 function Draw({open,CloseDrawer,data}) {
   return (
     <Drawer open={open} onClose={CloseDrawer} anchor='right' >
      <div className='DrawerWrapper'> 
      
       <AlbaButton variant="danger" onClick={CloseDrawer}>Back</AlbaButton>
       <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}> <FileSystemNavigator data={data} /></div>
      </div>
       

      
       
     </Drawer>
    
   )
 }
 
 export default Draw
 
