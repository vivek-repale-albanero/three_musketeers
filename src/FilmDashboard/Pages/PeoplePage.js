import React, { useState, useEffect, useContext } from "react";
import {  AlbaButton, PageLoader, Container,Typography } from "@platform/service-ui-libraries";
import { FilmDashboard } from "../../Context";
import DashboardLayout from "../DashboardLayout";
import { getPeopleDataAPI } from "../../api/api";
import ViewForm from "../Components/ViewForm";
import FilmContainer from "../Components/FilmContainer";

import "./FilmPage.scss";

function PeoplePage() {
  const { isFilmDataLoading, setIsFilmDataLoading, peopleData, setPeopleData } = useContext(FilmDashboard);

  const [isGrid, setIsGrid] = useState(true);
  const [viewModal, setViewModal] = useState({ status: false, data: {} });

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
  const openView = (film) =>{
    setViewModal({status:true,data:film})
  }
  const onCloseVIew = ()=>{
    setViewModal({status:false,data:{}})
  }

  const getPeople=async()=>{
    setIsFilmDataLoading(true)
    const response =  await getPeopleDataAPI()
      if(response.status ===200){
        // console.log("people",response.data.results)
        setPeopleData(response.data.results)
        setIsFilmDataLoading(false)
      }else{
        setIsFilmDataLoading(false)
        console.log(response)
      }
  }
//   console.log("people",peopleData)
  useEffect(()=>{
    getPeople()
   },[])
  return (
    <DashboardLayout>
        {isFilmDataLoading ? (
          <PageLoader />
        ) : ( 
          <div className="filmPage">
             <div> </div>
             <div className="viewSelect">
                 <Typography variant="h2" className="pageHeading">People</Typography>
                 <div className="viewButton">
                    <AlbaButton variant={isGrid?"secondary":"primary"} onClick={viewGrid}>Grid</AlbaButton>
                    <AlbaButton variant={!isGrid?"secondary":"primary"} onClick={viewList}>List</AlbaButton>
                 </div>
             </div>
             <Container >
               <div className="FilmPage_Container">
                 {isGrid&&peopleData.map((people, index) => (
                   <FilmContainer key={index} film={people} openView={openView}  pathname={location.pathname}/>
                 ))}
                 {/* {!isGrid&& <Table 
                      tableProps={{
                         ...filmListMetaData({
                           openView
                         }),
                         data:filmData,
                      }}
                />} */}
                 <ViewForm viewModal={viewModal} setViewModal={setViewModal} onCloseVIew={onCloseVIew}/>
               </div>
             </Container>
          </div>
        )}
    </DashboardLayout>
  );
}

export default PeoplePage;
