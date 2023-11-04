import { Button,Box} from '@material-ui/core'
// import {Stack} from '@material-ui/pickers';
import React from 'react'
import '../../styles/MissingPage.scss'
function AddButton({children ,onClick,style}) {
  return (
    
        <Button className="AddButton" style={style}variant='contained' color='teal'onClick={onClick}>{children}</Button>
    
  )
}

export default AddButton
