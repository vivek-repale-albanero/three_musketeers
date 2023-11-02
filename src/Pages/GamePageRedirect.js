
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/GameRedirect.scss'
import Layout from '../Layout/Layout';
import Title from '../components/TicTactoe/Title';

export const userData = [
  { id: 1, user:{userName: "Pritam2000",firstName:"Pritam",lastName:"Halder",},age:"25", email:"user1@gmail.com", password: 'password1', gamePermission: false, csvPermission: false, csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false },
  { id: 2, user:{userName: "Shoaib@1998",firstName:"Shoaib",lastName:"Mansoori"},age:"26", email:"user2@gmail.com", password: 'password2', gamePermission: false, csvPermission: false,csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false  },
  { id: 3, user:{userName: "Eswar@0110",firstName:"Eswar",lastName:"M"},age:"23", email:"user3@gmail.com", password: 'password3', gamePermission: false, csvPermission: false,csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false  },
  { id: 4, user:{userName: "Gopal_R",firstName:"Ram",lastName:"Gopal"},age:"32", email:"user4@gmail.com",  password: 'password4', gamePermission: false, csvPermission: false,csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false  },
  { id: 5, user:{userName: "Abc",firstName:"Abc",lastName:"Def"},age:"46", email:"user5@gmail.com", password: 'password5', gamePermission: false, csvPermission: false,csvDownlodPermission: false ,startGamePermission:false,resetGamePermission:false },
];
const GamePageRedirect = () => {
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('useLogedId')) || '');
  const [FirstUsername, setFirstUsername] = useState('');
  const [secondUsername, setSecondUsername] = useState('');

  const [cellCount, setCellCount] = useState(""); // Set default cell count
  const history = useHistory()
  const handleStartGame = () => {
    
console.log("username",username)
    if(cellCount<3){
      alert('Please select at least 3 cell')
      return
    }

    if (secondUsername && cellCount && FirstUsername) {
      let Firstone=userData.includes()
      localStorage.setItem('gamedetails', JSON.stringify({ secondUser: secondUsername, cellCount: cellCount, firstUser:FirstUsername }))
      window.location.href='/game'
    } else {
      alert('Fill all the details')
    }
  };

  console.log(secondUsername,FirstUsername,cellCount)

  return (
    <Layout>
    <div className='parent'>
      <div className='child'>
        <Title>Welcome </Title>
         <select value={FirstUsername} onChange={(e) => setFirstUsername(e.target.value)}>
          <option>Player 1</option>
          {userData.map((item) => {
            return  <option key={item.id} value={item.name}>{item.user.userName}</option>
            
          })}
        </select>
        <select value={secondUsername} onChange={(e) => setSecondUsername(e.target.value)}>
          <option value="">Player 2</option>
          {userData.map((item) => {
            return <option key={item.id} value={item.name}>{item.user.userName}</option>

          })}
        </select>
        <label>How Many cell you wants play put it here ?</label>
        <input
          placeholder="Enter Cell Numbers you want to play"
          value={cellCount}
          onChange={(e) => setCellCount(e.target.value)}
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
