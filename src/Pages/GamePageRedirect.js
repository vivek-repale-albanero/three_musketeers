import styled from '@emotion/styled';
import React, { useContext, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { PermissionContext } from '../Context/PermissionContext';

const Container = styled.div`
  font-family: sans-serif;
  border: 1px solid red;
  padding: 70px;
  width: 100%;
  margin: auto;

  .child {
    border: 1px solid black;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }

  input,
  select {
    display: block;
    padding: 10px;
    margin: 10px;
  }
`;

const GamePageRedirect = () => {
  const {
    startTicTac
  } = useContext(PermissionContext);
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('useLogedId')) || '');
  const [secondUsername, setSecondUsername] = useState('');
  const [cellCount, setCellCount] = useState('3'); // Set default cell count
  const navigate=useNavigate()
  const handleStartGame = () => {
    // Perform validation for the second username and cell count

    // Redirect to the game page with second username and cell count
   

    if(secondUsername && cellCount){
        navigate(`/game`);

        localStorage.setItem('gamedetails',JSON.stringify({secondUser:secondUsername,cellCount:cellCount}))

    }else{
        alert('Fill all the details')
    }
  };

  return (
    <Container>
      <div className='child'>
        <h3>Hey, welcome {username.name}</h3>
        <input type="text" value={username.name} disabled />
        <input
          type="text"
          placeholder="Enter Second Username"
          value={secondUsername}
          onChange={(e) => setSecondUsername(e.target.value)}
        />
        <select value={cellCount} onChange={(e) => setCellCount(e.target.value)}>
          <option value="3">3x3</option>
          <option value="6">6x6</option>
          <option value="9">9x9</option>
          <option value="11">11x11</option>
        </select>
        <button onClick={handleStartGame} disabled={!startTicTac}>Start New Game</button>
      </div>
    </Container>
  );
};

export default GamePageRedirect;
