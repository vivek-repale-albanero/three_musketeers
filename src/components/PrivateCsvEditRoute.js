import React,{ useContext } from "react";

import {Redirect} from "react-router-dom"
import { PermissionContext } from "../Context";

function PrivateCsvEditRoute({children}) {

    const { currentUser} = useContext(PermissionContext);
    if(!currentUser.Permission.csvPermission.subModules.csvPagePermission){
        alert("Please Athorize for Csv Page Permission")
        return(<Redirect to="/users" />
        )
    }

      return children
  }
  export default PrivateCsvEditRoute;