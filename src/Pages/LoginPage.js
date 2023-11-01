import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { PermissionContext } from '../Context/PermissionContext';
import {TextField,Button,Container} from '@material-ui/core'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();
  const { setGameAuth, setCsvAuth, gameAuth, csvAuth, users } = useContext(PermissionContext);

  const handleLogin = () => {
    const user = users.find((user) => user.name === username && user.password === password);
    if (user) {
      localStorage.setItem("useLogedId", JSON.stringify(user));
      setGameAuth(user.gamePermission);
      setCsvAuth(user.csvPermission);
      console.log("gameAuth", gameAuth);
      console.log("csvAuth", csvAuth);
      alert('login sucessfull');
      history.push("/authorization");
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

  return (
    <Container maxWidth="xs">
      <h1 className="">THREE MUSKETEERS</h1>
      <div>
        <h1>Login</h1>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
