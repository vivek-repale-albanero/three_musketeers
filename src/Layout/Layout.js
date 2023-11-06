// Layout.js
import React from 'react';
// import { Outlet } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { AddCircleOutlineIcon, Drawer, List, ListItem, ListItemIcon, ListItemText, Card, Avatar, Icon, Button } from '@material-ui/core';
import "./Layout.scss"
// import {HomeIcon,DashboardIcon,SettingsIcon} from ''
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import HomeIcon from '@mui/icons-material/Home';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import SettingsIcon from '@mui/icons-material/Settings';

const Layout = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));
  let history = useHistory();
  const handleLogout = () => {
    history.push("/");
    localStorage.removeItem("useLogedId")
  }
  return (
    <div >
      <Drawer variant="permanent">
        <Card className='userCard' >
          <div className='userInfo'>
            <Avatar>
              {loggedUser.user.userName[0]}
            </Avatar>
            <div>
              {loggedUser.user.firstName}
            </div>
            <Button color='secondary' onClick={handleLogout} >Logout</Button>
          </div>
        </Card>

        <List>
        <ListItem button component={Link} to="/home">
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              <Icon>group</Icon>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          {(loggedUser.Permission.csvPermission.allow) ?
            <ListItem button component={Link} to="/csv">
              <ListItemIcon>
                <Icon>backup_table</Icon>
              </ListItemIcon>
              <ListItemText primary="Csv-Upload" />
            </ListItem>
            : null
          }
          {(loggedUser.Permission.gamePermission.allow) ?
            <ListItem button component={Link} to="/gameredirect">
              <ListItemIcon>
                <Icon>casino</Icon>
              </ListItemIcon>
              <ListItemText primary="TicTacToe" />
            </ListItem> :
            null
          }
          {(loggedUser.Permission.missing.allow) ?
            <ListItem button component={Link} to="/missing">
              <ListItemIcon>
                <Icon>corporate_fare</Icon>
              </ListItemIcon>
              <ListItemText primary="Organisation Info" />
            </ListItem> :
            null
          }
        </List>
      </Drawer>
      <div style={{ marginLeft: '15%' }}>
        {/* <Outlet /> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
