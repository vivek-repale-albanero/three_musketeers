import React,{ useContext } from "react";

import { PermissionContext } from "../Context/PermissionContext";
import {Redirect} from "react-router-dom"

function PrivateCsvEditRoute({children}) {
    const { csvAuth } = useContext(PermissionContext);
<<<<<<< HEAD
    if(!csvAuth){
        alert("Please Athorize for Csv Edit Permission")
        return(<Redirect to="/authorization" />
        )
    }
=======
    // if(!csvAuth){
    //     alert("Please Athorize for Csv Edit Permission")
    //     return(<Navigate to ="/authorization"/>)
    // }
>>>>>>> b203cf9c2d0ed764531dcff03826c3703ed86cff

      return children
  }
  export default PrivateCsvEditRoute;