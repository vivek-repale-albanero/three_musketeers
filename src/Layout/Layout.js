import React from "react";
// import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@material-ui/core";
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
  return (
    <div style={{ display: "flex" }}>
      <Drawer variant="permanent">
        <List>
          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              {/* <HomeIcon /> */}
              <Icon>save</Icon>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={Link} to="/authorization">
            <ListItemIcon>{/* <DashboardIcon /> */}</ListItemIcon>
            <ListItemText primary="Permissions" />
          </ListItem>
          <ListItem button component={Link} to="/csv">
            <ListItemIcon>{/* <DashboardIcon /> */}</ListItemIcon>
            <ListItemText primary="Csv-Upload" />
          </ListItem>
          <ListItem button component={Link} to="/game">
            <ListItemIcon>{/* <SettingsIcon /> */}</ListItemIcon>
            <ListItemText primary="TicTacToe" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ marginLeft: "240px" }}>
        {/* <Outlet /> */}
        {children}
      </div>
    </div>
  );
};
export default Layout;
