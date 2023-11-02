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
        <img className="vs"src='https://media3.giphy.com/media/pE33F8QYDb7XGemuen/giphy.gif?cid=ecf05e4797cf539cprl9ltv4no8si4nmo0ewwcj84cnfnjkj&ep=v1_stickers_search&rid=giphy.gif&ct=s' />
        <div>{userdetails.secondUser}
         {/* <img className='user' src={two} /> */}
        </div>
    </div>
  )
}

export default Gamplayer