import React, { useContext, useState, useEffect } from "react";
import {
  AlbaButton,
  PageLoader,
  Container,
  Typography,
  TextForm,
  Icon
} from "@platform/service-ui-libraries";
import { Table } from "@platform/primary-table";
import DashboardLayout from "../DashboardLayout";
import { FilmDashboard } from "../../Context";
import FilmContainer from "../Components/FilmContainer";
import "./FilmPage.scss";
import ViewForm from "../Components/ViewForm";
import {
  getFilmDataAPI,
  getPeopleDataAPI,
  getPlanetDataAPI,
  getSpeciesDataAPI,
  getStarshipsDataAPI,
  getVehiclesDataAPI,
} from "../../api/api";
import { useHistory, useLocation } from "react-router-dom";
import image0 from "../../../public/assets/image0.jpg";
import image1 from "../../../public/assets/image1.jpg";
import image2 from "../../../public/assets/image2.jpg";
import image3 from "../../../public/assets/image3.jpg";
import image4 from "../../../public/assets/image4.jpg";
import image5 from "../../../public/assets/image5.jpg";
import image6 from "../../../public/assets/image6.jpg";
import image7 from "../../../public/assets/image7.jpg";
import image8 from "../../../public/assets/image8.jpg";
import image9 from "../../../public/assets/image9.jpg";




function FilmPage() {
  const location = useLocation();
  const {
    setFilmData,
    setIsFilmDataLoading,
    filmData,
    isFilmDataLoading,
    peopleData,
    setPeopleData,
    renderData,
    setRenderData,
  } = useContext(FilmDashboard);
  const img = [image0,image1,image2,image3,image4,image5,image6,image7,image8,image9];
  const [isGrid, setIsGrid] = useState(true);
  const [search,setSearch]=  useState("")
  const [searchResult,setSearchResult] = useState([])
  const [viewModal, setViewModal] = useState({ status: false, data: {} ,ind:null});
  const [columns, setColumns] = useState([
    {
      name: "Actions",
      isComponent: true,
      componentId: "ACTION_PANEL",
      props: {
        actions: [
          {
            icon: "visibility",
            title: "View Details",
            isComponent: true,
            componentId: "CLICK_ACTION",
            onClick: (row) => {
              openView(row);
            },
          },
        ],
      },
    },
  ]);

  //  const showValues = Object.keys(renderData[0] || {}).map((val)=>({name:val,id:val}))
  //   console.log(showValues)
  //   // if(renderData){
  //    const showValues = Object.keys(renderData[0]).map((val)=>({name:val,id:val}))

  //    console.log("trim",showValues)
  //  }


  const heading = location.pathname.split("/");
  const createColumns = (obj) => {
    const showValues = Object.entries(obj).slice(0, 6);
    // console.log("render", showValues);
    const createdColumns = showValues.map((val) => ({ name: val[0], id: val[0] }));
    // console.log("createdColumn", createdColumns);
    setColumns((prevColumns) => [...createdColumns, ...prevColumns]);

    // setColumns([...createdColumns, ...columns]);
  };
  // if (renderData.length) {
  //     createColumns(renderData[0]);
  // }
  const getFilms = async () => {
    setIsFilmDataLoading(true);
    const response = await getFilmDataAPI();
    if (response.status === 200) {
      setRenderData(response.data.results);
      setIsFilmDataLoading(false);
    } else {
      setIsFilmDataLoading(false);
    }
  };

  const getPeople = async () => {
    setIsFilmDataLoading(true);
    const response = await getPeopleDataAPI();
    if (response.status === 200) {
      setRenderData(response.data.results);
      setIsFilmDataLoading(false);
    } else {
      setIsFilmDataLoading(false);
    }
  };
  const getPlanet = async () => {
    setIsFilmDataLoading(true);
    const response = await getPlanetDataAPI();
    if (response.status === 200) {
      setRenderData(response.data.results);
      setIsFilmDataLoading(false);
      // setTimeout(()=>{
      //     createColumns(renderData[0]);

      //   console.log("len",renderData.length)
      // },200)
      // if (renderData.length) {
      //     createColumns(renderData[0]);
      // }
    } else {
      setIsFilmDataLoading(false);
    }
  };

  const getSpecies = async () => {
    setIsFilmDataLoading(true);
    const response = await getSpeciesDataAPI();
    if (response.status === 200) {
      setRenderData(response.data.results);
      setIsFilmDataLoading(false);
    } else {
      setIsFilmDataLoading(false);
    }
  };

  const getStarships = async () => {
    setIsFilmDataLoading(true);
    const response = await getStarshipsDataAPI();
    if (response.status === 200) {
      setRenderData(response.data.results);
      setIsFilmDataLoading(false);
    } else {
      setIsFilmDataLoading(false);
    }
  };

  const getVehicles = async () => {
    setIsFilmDataLoading(true);
    const response = await getVehiclesDataAPI();
    if (response.status === 200) {
      setRenderData(response.data.results);
      setIsFilmDataLoading(false);
    } else {
      setIsFilmDataLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname == "/films") {
      getFilms();
    } else if (location.pathname == "/people") {
      getPeople();
    } else if (location.pathname == "/planets") {
      getPlanet();
    } else if (location.pathname == "/species") {
      getSpecies();
    } else if (location.pathname == "/starships") {
      getStarships();
    } else if (location.pathname == "/vehicles") {
      getVehicles();
    }
    // console.log("effe", renderData);
  
  }, [location.pathname]);
  // console.log("column", columns);

  const viewGrid = () => {
    if (!isFilmDataLoading) {
      setIsGrid(true);
    }
  };
  const viewList = () => {
    if (!isFilmDataLoading) {
      setIsGrid(false);
         const headers = renderData.slice(0,6)   
        //  console.log("head",headers)
         setColumns([
          {
            name: "Actions",
            isComponent: true,
            componentId: "ACTION_PANEL",
            props: {
              actions: [
                {
                  icon: "visibility",
                  title: "View Details",
                  isComponent: true,
                  componentId: "CLICK_ACTION",
                  onClick: (row) => {
                    console.log("row",row.id)
                    openView(row);
                  },
                },
              ],
            },
          },
        ])
          createColumns(headers[0]);

    }
  };
  const openView = (film,ind) => {
    // console.log("id",ind)
    setViewModal({ status: true, data: film ,ind});
  };

  const onCloseVIew = () => {
    setViewModal({ status: false, data: {} ,ind:null});
  };

  const onSearch = () =>{
     
         if(search.length>1){
           const filteredData = renderData.filter((item)=> Object.values(item).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(search.toLowerCase())
          ));
          //  console.log("filter",filteredData)
           setSearchResult(filteredData)
          }else if(e ===""){
            // console.log("renderDear",renderData)
            setSearch("")
          }
          setSearch("")
  }
  console.log("searchResult",searchResult)
  const filmListMetaData = (actions) => {
    return {
      columns: columns,
      data: actions?.data,
    };
  };
  return (
    <>
      <DashboardLayout>
        {/* <Container> */}
        {isFilmDataLoading ? (
          <PageLoader />
        ) : (
          <div className="filmPage">
            <div className="searchField">
               <div className="searchBar">
               <TextForm  variant="filled"
                fieldValue={search}
                placeholder="Search"
                onChange={(e)=>{ setSearch(e) }} />
                </div>
                <div className="searchBtn">
                <AlbaButton variant="primary" className="searchIcon" onClick={onSearch}><Icon>search</Icon></AlbaButton>
                </div>
                
            </div>
            <div className="viewSelect">
              <Typography variant="h2" className="pageHeading">
                {heading[1]}
              </Typography>
              <div className="viewButton">
                <AlbaButton
                  variant={isGrid ? "secondary" : "primary"}
                  onClick={viewGrid}
                >
                  Grid
                </AlbaButton>
                <AlbaButton
                  variant={!isGrid ? "secondary" : "primary"}
                  onClick={viewList}
                >
                  List
                </AlbaButton>
              </div>
            </div>

            <div className="filmPageContainer">

            <Container className="containercss">
              <div className="FilmPage_Container">
                {(isGrid && !searchResult.length)?
                  renderData.map((film, index) => (
                    <FilmContainer
                    key={index}
                    film={film}
                    openView={openView}
                    pathname={location.pathname}
                    img={img}
                    ind={index}
                    /> 
                    )):
                    null}
                    {(isGrid && searchResult.length)?
                  searchResult.map((film, index) => (
                    <FilmContainer
                    key={index}
                    film={film}
                    openView={openView}
                    pathname={location.pathname}
                    img={img}
                    ind={index}
                    /> 
                    )):
                    null}
                {!isGrid && (
                  <Table
                  tableProps={{
                    ...filmListMetaData({
                        openView,
                      }),
                      data: renderData,
                    }}
                    />
                    )}
                <ViewForm
                  viewModal={viewModal}
                  setViewModal={setViewModal}
                  onCloseVIew={onCloseVIew}
                  img={img}
                />
              </div>
            </Container>
                  </div>
          </div>
        )}
        {/* </Container> */}
      </DashboardLayout>
    </>
  );
}

export default FilmPage;
