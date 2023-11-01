
import '../../styles/Gameboard.scss'

import React from 'react'

const CustomButton = ({children, onClick}) => {
  return (
    
      <button className='CustomGameButton' onClick={onClick}>
        {children}
      </button>
    
  );
};

export default CustomButton;
