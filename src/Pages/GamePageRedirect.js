
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/GameRedirect.scss'
import Layout from '../Layout/Layout';
import Title from '../components/TicTactoe/Title';
import '@babel/polyfill';


const GamePageRedirect = () => {
  const [userData, setUserData]=useState([])
  const [PlayingDetails, setPlayingDetails] = useState({FirstUsername:"",secondUsername:"",cellCount:null});
  async function FetchUsers() {
    try {
      let response = await fetch('http://localhost:3000/users');
      console.log(response)
      if (response.ok) {
        let userDataa = await response.json();
        setUserData(userDataa);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(()=>{
    FetchUsers()
  },[])


  const handleStartGame = () => {
   
    if (PlayingDetails.cellCount < 3) {
      alert('Please select at least 3 cell')
      return
    }

    if(PlayingDetails.secondUsername === PlayingDetails.FirstUsername) {
      alert("you wanted to play with your self ? no right!!! so why are you selected same username !!!")
      return
    }

    

    
    if (PlayingDetails.secondUsername && PlayingDetails.cellCount && PlayingDetails.FirstUsername) {
      let UsersDetails = userData.filter((item) =>item.user.userName==PlayingDetails.FirstUsername || item.user.userName==PlayingDetails.secondUsername)
  
      localStorage.setItem('gamedetails', JSON.stringify({ userdetails: UsersDetails, cellCount: PlayingDetails.cellCount }))
      setPlayingDetails({FirstUsername:"",secondUsername:"",cellCount:0})
      window.location.href = '/game'
    } else {
      alert('Fill all the details')
    }
  };

 

 
  return (
    <Layout>
      <div className='parent'>
        <div className='child'>
          <Title>Welcome </Title>
          <select value={PlayingDetails.FirstUsername} onChange={(e) => setPlayingDetails({...PlayingDetails,FirstUsername:e.target.value})}>
            <option>Player 1</option>
            {userData.map((item) => {
              return <option key={item.id} value={item.name}>{item.user.userName}</option>

            })}
          </select>
          <select value={PlayingDetails.secondUsername} onChange={(e) => setPlayingDetails({...PlayingDetails,secondUsername:e.target.value})}>
            <option value="">Player 2</option>
            {userData.map((item) => {
              return <option key={item.id} value={item.name}>{item.user.userName}</option>

            })}
          </select>
          <label>How Many cell you wants play put it here ?</label>
          <input
            placeholder="Enter Cell Numbers you want to play"
            value={PlayingDetails.cellCount}
            onChange={(e) =>setPlayingDetails({...PlayingDetails,cellCount:e.target.value})}
            type="number"
            maxLength="1"

          />
          <button onClick={handleStartGame}>Start New Game</button>
        </div>
      </div>
    </Layout>
  );
};

export default GamePageRedirect;
