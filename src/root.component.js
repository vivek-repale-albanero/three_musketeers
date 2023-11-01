import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import "../src/styles/overrides.scss";
import "../src/styles/styles.scss"
import LoginPage from "./Pages/LoginPage/LoginPage";
import UsersPage from "./Pages/UsersPage/UsersPage";
import GamePageRedirect from "./Pages/GamePageRedirect";
import TicTacPage from "./Pages/TicTacToe";

export default function Root() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>
          <Route exact path="/auth/login" render={() => <LoginPage />} />
          <Route exact path="/users" render={()=> <UsersPage/>}/>
          <Route exact path="/gameredirect" render={()=> <GamePageRedirect/>} />
          <Route exact path="/game" render={()=> <TicTacPage/>} />
          {/* <Route exact path="/id/main" render={()=>(
          
           
             
            
          
            )}/> */}
         
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
