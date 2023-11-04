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




export default function Root() {
  const currentUser = JSON.parse(localStorage.getItem("useLogedId"))
  const [users, setUsers] = useState([]);
    
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
  
  // //data from local storage
    console.log("currentUser",currentUser)
  
  const permission = useMemo(() => {
    return {users,currentUser}
  }, [users,currentUser])
  return (
    <BrowserRouter>
    <PermissionContext.Provider  value={permission}>

      <CssBaseline />
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>

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

         

        </Switch>
      </React.Suspense>
        </PermissionContext.Provider>
    </BrowserRouter>
  );
}
