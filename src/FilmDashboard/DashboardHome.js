import React from "react";
import DashboardLayout from "./DashboardLayout";
import "./DashboardHome.scss"
import { Typography } from "@material-ui/core";
import logo from "../../public/assets/Star_wars.png"


function DashboardHome (){
  return(
    <>
    <DashboardLayout>
     <div className="home">
      <div className="Welcome_card">
      <div className="img_container">
        <div className="img_banner">
           <img src={logo} ></img>
        </div>
      </div>
      <div className="card_Heading">
          <Typography variant="h1">
            Welcome to star wars Dashboard
          </Typography>
      </div>
      <div className="card_text">
          <Typography> Star Wars is an American epic space opera multimedia franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon. </Typography>
      </div>
      </div>
     </div>

    </DashboardLayout>
    </>
  )
}


export default DashboardHome