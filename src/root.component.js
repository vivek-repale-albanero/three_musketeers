import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import CsvPage from "./Pages/CsvPage";
import PermissionPage from "./Pages/PermissionPage";
export default function Root() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>
          <Route exact path="/csv" render={() => 
          // <PrivateCsvEditRoute>
          <CsvPage />
        // </PrivateCsvEditRoute>
      } 
        />
          <Route exact path="/authorization" render={()=>(<PermissionPage />)}/>
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
