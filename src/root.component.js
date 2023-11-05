import React, { useMemo, useState, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import CsvPage from "./Pages/CsvPage";
import PermissionPage from "./Pages/PermissionPage";
import "../src/styles/overrides.scss";
import "../src/styles/styles.scss"
import LoginPage from "./Pages/LoginPage/LoginPage";
import UsersPage from "./Pages/UsersPage/UsersPage";
import GamePageRedirect from "./Pages/GamePageRedirect";
import TicTacPage from "./Pages/TicTacToe";
import MissingPage from "./Pages/MissingPage";

import { PermissionContext } from "./Context";
import PrivateCsvEditRoute from "./components/PrivateCsvEditRoute"
import PrivateGameRoute from "./components/PrivateGameRoute";
import axios from "axios";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import HomePage from "./Pages/HomePage/HomePage";





export default function Root() {
  const [currentUser,setCurrentUser]=useState({})
  const [users, setUsers] = useState([]);
  const [local,setLocal]=useState(false)
  const[unAuthMsg,setUnAuthMsg]=useState("You are not Authorized")
  useEffect(() => {
    fetch('http://localhost:3000/users')
    .then((res) => res.json())
    .then((data) => {
      setUsers(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);
  async function getCurrentUser(currentUserId){
    const response = await axios.get(`http://localhost:3000/users/${currentUserId.id}`)
    const data = response.data;
    setCurrentUser(data)
   
  }
  useEffect(()=>{
    let currentUserId=JSON.parse(localStorage.getItem("useLogedId"))
    setCurrentUser(JSON.parse(localStorage.getItem("useLogedId")))

  },[local])
  
  // //data from local storage
    console.log("currentUser",currentUser)
  
  const permission = useMemo(() => {
    return {users,setUsers,currentUser,setCurrentUser,setLocal,local,unAuthMsg,setUnAuthMsg}
  }, [users,currentUser,setCurrentUser,setLocal,local,setUnAuthMsg,unAuthMsg])
  return (
    <BrowserRouter>
    <PermissionContext.Provider  value={permission}>

      <CssBaseline />
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>
          <Route exact path="/home" render={() =>(<HomePage/>)} />
          <Route exact path="/csv" render={() => 
          <PrivateCsvEditRoute>
          
          <CsvPage />
           </PrivateCsvEditRoute>
        } 
        />
          <Route exact path="/authorization/:id" render={()=>(<PermissionPage />)}/>
          
          <Route exact path="/auth/login" render={() => <LoginPage />} />
          <Route exact path="/users" render={()=> <UsersPage/>}/>
          <Route exact path="/gameredirect" render={()=> 
          <PrivateGameRoute><GamePageRedirect/></PrivateGameRoute>} />
          <Route exact path="/game" render={()=> <TicTacPage/>} />
          <Route exact path="/missing" render={()=> <MissingPage/>} />

          <Route exact path="/unauth" render={()=> <UnauthorizedPage/>} />

        </Switch>
      </React.Suspense>
        </PermissionContext.Provider>
    </BrowserRouter>
  );
}
