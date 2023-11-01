import React,{ useContext } from "react";

import { PermissionContext } from "../Context/PermissionContext";
import {Redirect} from "react-router-dom"

function PrivateCsvEditRoute({children}) {
    const { csvAuth } = useContext(PermissionContext);
    if(!csvAuth){
        alert("Please Athorize for Csv Edit Permission")
        return(<Redirect to="/authorization" />
        )
    }

      return children
  }
  export default PrivateCsvEditRoute;