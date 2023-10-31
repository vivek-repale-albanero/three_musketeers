import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import Login from "./components/Login";

export default function Root() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>
          <Route exact path="/auth/login" render={() => <Login />} />
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
