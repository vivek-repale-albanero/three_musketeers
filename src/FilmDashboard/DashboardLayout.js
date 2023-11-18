import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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


import { getFilmDataAPI } from "../api/api";
import "./DashboardLayout.scss";
import { FilmDashboard } from "../Context";





function DashboardLayout({ children }) {
//        const [filmData,setFilmData] = useState([])
//        const [isFilmDataLoading,setIsFilmDataLoading] = useState(false)

//    const eswar = "eswar"

    const {setFilmData,setIsFilmDataLoading} = useContext(FilmDashboard)

       const getFilms = async() =>{ 
        setIsFilmDataLoading(true)
        const response =  await getFilmDataAPI()
          if(response.status ===200){
            console.log(response)
            setFilmData(response.data.results)
            setIsFilmDataLoading(false)
          }else{
            setIsFilmDataLoading(false)
            console.log(response)
          }
       }



       useEffect(()=>{

       },[])
//    console.log(fimData)
// const filmDash = useMemo(()=>{
//     return{
//         eswar,
//         filmData,
//         isFilmDataLoading 
//     }
// },[ eswar,
//     filmData,
//     isFilmDataLoading
// ]);
  return (
    // <FilmDashboard.Provider value={filmDash}>

    <div className="sidebar">
      <Drawer variant="permanent">
        <div className="logoCard">
          <Card component={Link} to="/dashboard">
            <div className="logo">
              <div>
                <Typography  varaiant="secondary">Star Wars</Typography>
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
                <AccordionDetails >
                  <div className="option_icon">
                    <Icon>play_circle</Icon>
                  </div>
                  <div className="option_name">
                    <Typography onClick={getFilms}>Films Name</Typography>
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
              <div className="accord_menu">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>groups</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>People Name</Typography>
                  </div>
                </AccordionDetails>
              </div>
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
              <div className="accord_menu">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>public</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Planets Name</Typography>
                  </div>
                </AccordionDetails>
              </div>
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
              <div className="accord_menu">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>emoji_nature</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Species Name</Typography>
                  </div>
                </AccordionDetails>
              </div>
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
              <div className="accord_menu">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>flight_takeoff</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Starships Name</Typography>
                  </div>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>
          <div className="accord_option">
            <Accordion>
              <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                <div className="accord_icon">
                  <Icon>folder</Icon>
                </div>
                <Typography>Spaceships</Typography>
              </AccordionSummary>
              <div className="accord_menu">
                <AccordionDetails>
                  <div className="option_icon">
                    <Icon>rocket</Icon>
                  </div>
                  <div className="option_name">
                    <Typography>Spaceships Name</Typography>
                  </div>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>
        
        </List>
      </Drawer>
      <div style={{ marginLeft: "15%" }}>{children}</div>
    </div>
    // </FilmDashboard.Provider>
  );
}

export default DashboardLayout;
