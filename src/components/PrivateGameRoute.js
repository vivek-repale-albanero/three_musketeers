
import React,{ useContext } from "react";
import { PermissionContext } from "../Context";
import {Redirect} from "react-router-dom";
function PrivateGameRoute({children}) {
  
  const { currentUser,setUnAuthMsg} = useContext(PermissionContext);
  if(!currentUser.Permission.gamePermission.subModules.gamePagePermission){
    setUnAuthMsg("Please Athorize for Game Page Permission")
    return(<Redirect to="/unauth" />
    )
}

    return children
  }
  export default PrivateGameRoute;