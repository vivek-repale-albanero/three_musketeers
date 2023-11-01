import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout/Layout";
import UsersPage from "./Pages/UsersPage";

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
          <Route path="/users" render={()=> <UsersPage/>}/>
          <Route exact path="/id/main" render={()=>(
          <Layout>
            {/* <Switch>
              <Route exact path="/users" render={()=> <UsersPage/>}/>
            </Switch> */}
          </Layout>  
            )}/>
          {/* <Route
            exact
            path="/auth/404"
            render={() => <Page404 />}
          /> */}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
