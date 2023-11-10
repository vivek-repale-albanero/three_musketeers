import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../Context";
import "./LoginPage.scss";

import {
  Typography,
  Card,
  TextField,
  Button,
  Container,
  AlbaButton,
} from "@platform/service-ui-libraries";

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const { users, setLocal, local } = useContext(PermissionContext);
  console.log("users", users);
  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === userEmail && user.password === password
    );
    // console.log("user",user)
    if (user) {
      // console.log(user)
      localStorage.setItem("useLogedId", JSON.stringify(user));
      setLocal(!local);
      // alert('login sucessfull');
      history.push("/home");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="loginCard">
      <Card
        sx={{ minWidth: 275 }}
        className="tile"
        style={{ backgroundColor: "white" }}
      >
        <Container maxWidth="xs">
          <div>
            <Typography>THREE MUSKETEERS</Typography>
            <AlbaButton variant="success">Test</AlbaButton>
            <AlbaButton variant="danger">Test</AlbaButton>
            <AlbaButton variant="primary">Test</AlbaButton>
            <AlbaButton variant="secondary">Test</AlbaButton>
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
                className="button"
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
