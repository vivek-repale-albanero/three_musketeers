import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { PermissionContext } from '../Context/PermissionContext';
import {TextField,Button,Container,Card} from '@material-ui/core'
// import "../styles/LoginPage.scss"
function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();
  const { users } = useContext(PermissionContext);
  const handleLogin = () => {
    const user = users.find((user) => user.email === userEmail && user.password === password);
    if (user) {
      localStorage.setItem("useLogedId", JSON.stringify(user));
      // setGameAuth(user.gamePermission);
      // setCsvAuth(user.csvPermission);
      // console.log("gameAuth", gameAuth);
      // console.log("csvAuth", csvAuth);
      alert('login sucessfull');
      history.push("/authorization");
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
  return (
    <div className='loginCard'>
      <Card sx={{ minWidth: 275 }} className='tile'>
    <Container maxWidth="xs"  >    
      <div >
      <h1>THREE MUSKETEERS</h1>
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className='button'
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
    </Card>
    </div>
  );
}
export default LoginPage;