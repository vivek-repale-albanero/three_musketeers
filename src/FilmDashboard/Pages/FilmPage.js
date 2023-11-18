import React, { useContext, useState } from "react";
import {  AlbaButton, PageLoader, Container } from "@platform/service-ui-libraries";
import { Table } from "@platform/primary-table";
import DashboardLayout from "../DashboardLayout";
import { FilmDashboard } from "../../Context";
import FilmContainer from "../Components/FilmContainer";
import "./FilmPage.scss";
import { Typography } from "@material-ui/core";

function FilmPage() {
  const { filmData, isFilmDataLoading } = useContext(FilmDashboard);
  const [isGrid, setIsGrid] = useState(true);

  const viewGrid = () =>{
    if(!isFilmDataLoading){
        setIsGrid(true)
    }
  }
  const viewList = () =>{
    if(!isFilmDataLoading){
        setIsGrid(false)
    }
  }

  const filmListMetaData= (actions)=>{
    return{
        columns:[
            { name: "Name", id: "title" },
            { name: "Director", id: "director" },
            { name: "Release Date", id: "release_date" },
            { 
          name: "Actions",
          isComponent: true,
          componentId: "ACTION_PANEL",
          props: {
            actions: [
                {
                    icon: "more_vert",
                    title: "View Details",
                    isComponent: true,
                    componentId: "CLICK_ACTION",
                  },
            ]
          }
            }
        ],
        data: actions?.data,
    }
  }



  console.log(filmData);
  return (
    <>
      <DashboardLayout>
        {/* <Container> */}
        {isFilmDataLoading ? (
          <PageLoader />
        ) : (
          <div className="filmPage">
            <div className="viewSelect">
                <Typography variant="h2">Films</Typography>
                <div className="viewButton">
                   <AlbaButton variant={isGrid?"secondary":"primary"} onClick={viewGrid}>Grid</AlbaButton>
                   <AlbaButton variant={!isGrid?"secondary":"primary"} onClick={viewList}>List</AlbaButton>
                </div>
            </div>
            <Container >
              <div className="FilmPage_Container">
                {isGrid&&filmData.map((film, index) => (
                  <FilmContainer key={index} film={film} />
                ))}
                {!isGrid&& <Table 
                     tableProps={{
                        ...filmListMetaData({}),
                        data:filmData,
                     }}
                />}
              </div>
            </Container>
          </div>
        )}
        {/* </Container> */}
      </DashboardLayout>
    </>
  );
}

export default FilmPage;
