import React, { useState } from 'react'
import one from '../../assests/1.png'
import two from '../../assests/2.jpg'
import vs  from '../../assests/vs.png'
import Title from './Title'
function Gamplayer({ userdetails }) {
  const [user1, user2] = userdetails
  console.log("dettt",userdetails)
  console.log("details", user1, "user2",user2)

  return (
    <div className='GameplayerDiv'>
      <div className='Titleclass'>

      <Title>Let`s Go</Title>
      </div>
      <div className='Card1'>
        <h3>
          Name: {`${user1.user.firstName} ${user1.user.lastName}`}
        </h3>
        <p>Username: {user1.user.userName}</p>

        <p>Email: {user1.email}</p>
        <p>Age: {user1.age}</p>


        { }

        {/* <img  className='user'src={one} /> */}
      </div>
      <img className="vs" src={vs} />
      <div className='Card2'>
        <h3>
        Name:{`${user2.user.firstName} ${user2.user.lastName}`}
        </h3>
        <p>Username: {user2.user.userName}</p>
        <p>Email: {user2.email}</p>
        <p>Age: {user2.age}</p>
        {/* <img className='user' src={two} /> */}
      </div>
    </div>
  )
}

export default Gamplayer