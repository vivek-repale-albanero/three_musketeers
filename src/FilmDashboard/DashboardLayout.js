import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory,useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
  Icon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@platform/service-ui-libraries";

import "./DashboardLayout.scss";
import { FilmDashboard } from "../Context";

function DashboardLayout({ children }) {
  const location = useLocation();

  const { filmData, setFilmData, setIsFilmDataLoading } =
    useContext(FilmDashboard);


  return (

    <div className="sidebar">
      <Drawer variant="permanent">
        <div className="logoCard">
          <Card component={Link} to="/dashboard">
            <div className="logo">
              <div>
                <Typography varaiant="secondary">Star Wars</Typography>
              </div>
            </div>
          </Card>
        </div>

        <List>
          <div className="accord_option">
            <Accordion>
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className="accord_icon">
                  <Icon>folder</Icon>
                </div>
                <Typography>Films</Typography>
              </AccordionSummary>
                 <Box className="accord_menu" component={Link} to="/films">
                 <AccordionDetails>
                   <div className="option_icon">
                     <Icon>play_circle</Icon>
                   </div>
                   <div className="option_name">
                     <Typography>Films Name</Typography>
                   </div>
                 </AccordionDetails>
                </Box>
            </Accordion>
          </div>
          <div className="accord_option">
            <Accordion>
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className="accord_icon">
                  <Icon>folder</Icon>
                </div>
                <Typography>People</Typography>
              </AccordionSummary>
              <Box className="accord_menu" component={Link} to="/people">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>groups</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>People Name</Typography>
                  </div>
                </AccordionDetails>
              </Box>
            </Accordion>
          </div>
          <div className="accord_option">
            <Accordion>
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className="accord_icon">
                  <Icon>folder</Icon>
                </div>
                <Typography>Planets</Typography>
              </AccordionSummary>
              <Box className="accord_menu" component={Link} to="/planets">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>public</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Planets Name</Typography>
                  </div>
                </AccordionDetails>
              </Box>
            </Accordion>
          </div>
          <div className="accord_option">
            <Accordion>
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className="accord_icon">
                  <Icon>folder</Icon>
                </div>
                <Typography>Species</Typography>
              </AccordionSummary>
              <Box className="accord_menu" component={Link} to="/species">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>emoji_nature</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Species Name</Typography>
                  </div>
                </AccordionDetails>
              </Box>
            </Accordion>
          </div>
          <div className="accord_option">
            <Accordion>
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className="accord_icon">
                  <Icon>folder</Icon>
                </div>
                <Typography>Starships</Typography>
              </AccordionSummary>
              <Box className="accord_menu" component={Link} to="/starships">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>flight_takeoff</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Starships Name</Typography>
                  </div>
                </AccordionDetails>
              </Box>
            </Accordion>
          </div>
          <div className="accord_option">
            <Accordion>
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className="accord_icon">
                  <Icon>folder</Icon>
                </div>
                <Typography>Vehicles</Typography>
              </AccordionSummary>
              <Box className="accord_menu" component={Link} to="/vehicles">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>rocket</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Vehicles Name</Typography>
                  </div>
                </AccordionDetails>
              </Box>
            </Accordion>
          </div>
        </List>
      </Drawer>
      <div style={{ marginLeft: "15%" }}>{children}</div>
    </div>
  );
}

export default DashboardLayout;
