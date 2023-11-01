// Layout.js
import React from 'react';
// import { Outlet } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Drawer,List,ListItem,ListItemIcon,ListItemText,Card,Avatar,Icon } from '@material-ui/core';
import "../styles/Layout.scss"

const Layout = ({children}) => {
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));
  return (
    <div >
      <Drawer variant="permanent">
        <Card className='userCard' style={{background:"teal"}}>
          <div className='userInfo'>
          <Avatar>
          {(!loggedUser)?loggedUser.userName[0]:"User"}
          </Avatar>
          <div>
          {loggedUser.userName}
          </div>
          </div>         
        </Card>
          
        <List>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              {/* <HomeIcon /> */}
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/authorization">
            <ListItemIcon>
              {/* <DashboardIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Permissions" />
          </ListItem>
          <ListItem button component={Link} to="/csv">
            <ListItemIcon>
              {/* <DashboardIcon /> */}
            </ListItemIcon>
            <ListItemText primary="Csv-Upload" />
          </ListItem>
          <ListItem button component={Link} to="/game">
            <ListItemIcon>
              {/* <SettingsIcon /> */}
            </ListItemIcon>
            <ListItemText primary="TicTacToe" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ marginLeft: '240px' }}>
        {/* <Outlet /> */}
        {children}
        </div>
    </div>
  );
};

export default Layout;
