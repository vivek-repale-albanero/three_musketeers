
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/GameRedirect.scss'

const userData = [
  { id: 1, name: 'User 1', password: 'password1', gamePermission: false, csvPermission: false, csvDownlodPermission: false, startGamePermission: false, resetGamePermission: false },
  { id: 2, name: 'User 2', password: 'password2', gamePermission: false, csvPermission: false, csvDownlodPermission: false, startGamePermission: false, resetGamePermission: false },
  { id: 3, name: 'User 3', password: 'password3', gamePermission: false, csvPermission: false, csvDownlodPermission: false, startGamePermission: false, resetGamePermission: false },
  { id: 4, name: 'User 4', password: 'password4', gamePermission: false, csvPermission: false, csvDownlodPermission: false, startGamePermission: false, resetGamePermission: false },
  { id: 5, name: 'User 5', password: 'password5', gamePermission: false, csvPermission: false, csvDownlodPermission: false, startGamePermission: false, resetGamePermission: false },
];

const GamePageRedirect = () => {
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('useLogedId')) || '');
  const [FirstUsername, setFirstUsername] = useState('');
  const [secondUsername, setSecondUsername] = useState('');

  const [cellCount, setCellCount] = useState(""); // Set default cell count
  const history = useHistory()
  const handleStartGame = () => {
    


    if (secondUsername && cellCount && FirstUsername) {
      localStorage.setItem('gamedetails', JSON.stringify({ secondUser: secondUsername, cellCount: cellCount, firstUser:FirstUsername }))
      window.location.href='/game'
    } else {
      alert('Fill all the details')
    }
  };

  console.log(secondUsername,FirstUsername,cellCount)

  return (
    <div className='parent'>
      <div className='child'>
        <h3>Hey, welcome {username.name}</h3>
         <select value={FirstUsername} onChange={(e) => setFirstUsername(e.target.value)}>
          <option>Player 1</option>
          {userData.map((item) => {
            return  <option key={item.id} value={item.name}>{item.name}</option>
            
          })}
        </select>
        <select value={secondUsername} onChange={(e) => setSecondUsername(e.target.value)}>
          <option value="">Player 2</option>
          {userData.map((item) => {
            return <option key={item.id} value={item.name}>{item.name}</option>

          })}
        </select>
        <label>How Many cell you wants play put it here ?</label>
        <input
          placeholder="Enter Cell Numbers you want to play"
          value={cellCount}
          onChange={(e) => setCellCount(e.target.value)}
          type="number"
        />
        <button onClick={handleStartGame}>Start New Game</button>
      </div>
    </div>
  );
};

export default GamePageRedirect;
