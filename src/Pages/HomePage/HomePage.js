import React, { useState, useEffect, useContext, useRef } from "react";
import Layout from "../../Layout/Layout";
import { Container,Typography,Button,Icon } from "@material-ui/core";
import {AlbaButton} from "@platform/service-ui-libraries";
import "./HomePage.scss"
import { PermissionContext } from "../../Context";

function HomePage() {
  const {setBreadCrumbProps}=useContext(PermissionContext) 

  useEffect(()=> setBreadCrumbProps({ navLinks: [], activeLink: { name: "home" } }),[]  )
  return (
    <>
      <Layout>
        {/* <div className="container backGround" >
      <div className="text-wrapper">
        <p className={`text ${isFirstText ? 'text-up' : 'text-down'}`}>
          This is the first text
        </p>
        <p className={`text ${isFirstText ? 'text-down' : 'text-up'}`}>
          This is the second text
        </p>
      </div>
    </div> */}
    <div className="app">
      <header className="bg_home">
        <Container maxWidth="sm">
          <Typography variant="h4" className="desc">
            Welcome to Three Musketeers
          </Typography>
          <Typography variant="body1" className="description">
            Get started by exploring our awesome features.
          </Typography>
          <AlbaButton variant="primary"  className="explore-button">
            <Icon>west</Icon> 
            Explore
          </AlbaButton>
        </Container>
      </header>
    </div>
        </Layout>
        </>
    )
}

export default HomePage;