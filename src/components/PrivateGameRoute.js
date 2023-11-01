
import { PermissionContext } from "../Context/PermissionContext";
import { useContext } from "react";

function PrivateGameRoute({children}) {
    const { gameAuth } = useContext(PermissionContext);
    
    return children
  }
  export default PrivateGameRoute;