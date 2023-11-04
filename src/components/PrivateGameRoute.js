
import React,{ useContext } from "react";
import { PermissionContext } from "../Context";
import {Redirect} from "react-router-dom";
function PrivateGameRoute({children}) {
  const { currentUser} = useContext(PermissionContext);
  if(!currentUser.Permission.gamePermission.subModules.gamePagePermission){
    alert("Please Athorize for Game Page Permission")
    return(<Redirect to="/users" />
    )
}

    return children
  }
  export default PrivateGameRoute;