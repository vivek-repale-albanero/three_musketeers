import { Navigate } from "react-router-dom";
import { PermissionContext } from "../Context/PermissionContext";
import { useContext } from "react";

function PrivateGameRoute({children}) {
    const { gameAuth } = useContext(PermissionContext);
    // console.log(gameAuth)
    if(!gameAuth){
        alert("Please Athorize for Game Permission")
        return(<Navigate to ="/authorization"/>)
    }
    return children
  }
  export default PrivateGameRoute;