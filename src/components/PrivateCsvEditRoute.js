import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { PermissionContext } from "../Context";

function PrivateCsvEditRoute({ children }) {
    const {setUnAuthMsg}=useContext(PermissionContext)
  const { currentUser } = useContext(PermissionContext);
  console.log("currentUser from csv", currentUser);

  // Check if currentUser and required permissions exist
  if (!currentUser || !currentUser.Permission || !currentUser.Permission.csvPermission || !currentUser.Permission.csvPermission.subModules || !currentUser.Permission.csvPermission.subModules.csvPagePermission) {
    setUnAuthMsg("Please Authorize for Csv Page Permission");
    return <Redirect to="/unauth" />;
  }

  return children;
}

export default PrivateCsvEditRoute;
