import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout/Layout";
import UsersPage from "./Pages/UsersPage";
import PermissionPage from "./Pages/PermissionPage";
import PrivateCsvEditRoute from "./components/PrivateCsvEditRoute";
import CsvPage from "./Pages/CsvPage";
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
          <Route exact path="/id/main" render={()=><Layout/>}/>
          <Route exact path="/authorization" render={()=>(<PermissionPage />)}/>
          <Route exact path="/csv" render={() =>
            //  <PrivateCsvEditRoute>
          <CsvPage />
        // </PrivateCsvEditRoute>
      } />
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
