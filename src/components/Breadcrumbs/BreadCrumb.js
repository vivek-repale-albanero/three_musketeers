import React from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import { Breadcrumbs, Typography } from "@material-ui/core";
import "./BreadCrumb.scss"

function BreadCrumb() {
    const location = useLocation();
    const pathName = location.pathname.split("/").filter((path) => path);
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {pathName.map((path, index) => {
                const isLast = index === pathName.length - 1;
                const to = `/${pathName.slice(0, index + 1).join("/")}`;
                console.log(typeof (path[pathName.length - 1]), "index")
                // if(isLast && typeof(path)==="number")

                return (
                    <>
                        {/* <Link onClick={() => history.push("/home")}>Home</Link> */}
                        {(isLast)? (
                        <Typography key={to}
                            style={{ fontSize: "15px" }}
                        >
                            {path}
                        </Typography>
                        ) : (
                        <Link underline="hover" className="Link_Text" key={to} to={to}>
                            {path}
                        </Link>
                        )}
                    </>
                )
            })}
        </Breadcrumbs>
    )
}

export default BreadCrumb;