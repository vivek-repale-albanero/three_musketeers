import React from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import { Breadcrumbs,Typography } from "@material-ui/core";

function BreadCrumb (){
    const location = useLocation();
    const pathName = location.pathname.split("/").filter((path)=>path);
    return(
       <Breadcrumbs>
         {pathName.map((path,index)=>{
            const end = index === pathName.length-1;
            const to = `/${pathName.slice(0,index+1).join("/")}`;

            return(
                (end)? (
                    <Typography key={to}>
                        {path}
                    </Typography>
                ) : (
                    <Link key={to} to={to}>
                        {path}
                    </Link>
                )
            )
         })}
       </Breadcrumbs>
    )
}

export default BreadCrumb;