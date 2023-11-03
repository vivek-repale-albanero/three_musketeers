import React, { useState } from 'react'
import one from'../../assests/1.png'
import two from'../../assests/2.jpg'

function Gamplayer() {

    const[userdetails,setuserdetails]=useState(JSON.parse(localStorage.getItem('gamedetails')))

    console.log("details",userdetails)

  return (
    <div className='GameplayerDiv'>
      <h1>Let`s Go Players</h1>
        <div>
        {userdetails.firstUser}
          {/* <img  className='user'src={one} /> */}
        </div>
        <img className="vs"src='https://media3.giphy.com/media/WT9IlKpENSEJoX6e0V/giphy.gif?cid=ecf05e4781cexe4spdnra18d9ancxu8t9cjhj8h90xofd4av&ep=v1_gifs_related&rid=giphy.gif&ct=s' />
        <div>{userdetails.secondUser}
         {/* <img className='user' src={two} /> */}
        </div>
    </div>
  )
}

export default Gamplayer