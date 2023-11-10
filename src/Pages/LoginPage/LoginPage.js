import React, { useContext, useState,useRef } from "react";
import { useHistory } from "react-router-dom";
import { PermissionContext } from "../../Context";
import "./LoginPage.scss";

import {
  Box,
  Typography,
  Card,
  TextForm,
  Container,
  AlbaButton,
} from "@platform/service-ui-libraries";

function LoginPage() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateFields = useRef([]);
  // const validateFields = useRef({})
  let history = useHistory();
  const { users, setLocal, local } = useContext(PermissionContext);
  console.log("users", users);
  
  const validateProfileForm = () => {
    const resultData = validateFields.current.map((refs) => {
      console.log("ref",refs)
      if (!refs) {
        return true;
      } else {
        return refs?.checkValidation();
      }
    });
    return resultData.every(Boolean);
  };
  
  
  const handleLogin = () => {
    if(validateProfileForm()){

      const user = users.find(
        (user) => user.email === userEmail && user.password === password
        );
        if (user) {
          localStorage.setItem("useLogedId", JSON.stringify(user));
          setLocal(!local);
          history.push("/home");
        } else {
          alert("Invalid credentials. Please try again.");
        }
      }
  };
  return (
    <Box className="loginCard">
      <Card
        sx={{ minWidth: 275 }}
        className="tile"
        style={{ backgroundColor: "white" }}
      >
        <Container maxWidth="xs">
          <Box>
            <Typography>THREE MUSKETEERS</Typography>
            <form>
              <TextForm
                ref={(e)=>{
                  console.log(e)
                  validateFields.current[0] =e;
                }}
                label="Email"
                variant="filled"
                fieldValue={userEmail}
                placeholder="Email"
                onChange={(e) => setUserEmail(e)}
                id="desc"
                validationsDetail={{
                  validations:{
                    required:true,
                    whiteSpace:true,
                    // email:true
                  }
                }
              }
              // validationFunc={validateForm}
              />

              
              <TextForm
              ref={(e)=>{
                validateFields.current[1]=e
              }}
                label="Password"
                variant="filled"
                fieldValue={password}
                placeholder="Password"
                onChange={(e)=>setPassword(e)}
                id="desc"
                validationsDetail={{
                  validations:{
                    required:true,
                    whiteSpace:true,
                    // password:true
                  }
                }}
              />
              <AlbaButton
                variant="success"
                className="button"
                onClick={handleLogin}
              >
                Log In
              </AlbaButton>
            </form>
          </Box>
        </Container>
      </Card>
    </Box>
  );
}
export default LoginPage;
