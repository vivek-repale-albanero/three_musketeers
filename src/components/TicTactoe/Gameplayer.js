import React, { useState } from 'react'

function Gamplayer() {

    const[userdetails,setuserdetails]=useState(JSON.parse(localStorage.getItem('gamedetails')))


    console.log(userdetails)
  return (
    <div className='GameplayerDiv'>
      <h1>Let`s Go Players</h1>
        <div>{userdetails.firstUser}</div>
        <div>{userdetails.secondUser}</div>
    </div>
  )
}

export default Gamplayer