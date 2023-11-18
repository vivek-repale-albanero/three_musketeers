import React, { useMemo, useState, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import CsvPage from "./Pages/CsvPage";
import PermissionPage from "./Pages/PermissionPage";
import "../src/styles/overrides.scss";
import "../src/styles/styles.scss"
import LoginPage from "./Pages/LoginPage/LoginPage";
import UsersPage from "./Pages/UsersPage/UsersPage";
import GamePageRedirect from "./Pages/GamePageRedirect";
import TicTacPage from "./Pages/TicTacToe";
import MissingPage from "./Pages/MissingPage";
import { BreadcrumbsBar } from '@platform/service-ui-libraries';
import { PermissionContext } from "./Context";
import PrivateCsvEditRoute from "./components/PrivateCsvEditRoute"
import PrivateGameRoute from "./components/PrivateGameRoute";
import UnauthorizedPage from "./Pages/UnauthorizedPage";
import HomePage from "./Pages/HomePage/HomePage";
import ShoaibCompoPractice from "./Pages/ShoaibCompoPractice";
import {fetchUsers} from "./api/api"
import EComPage from "./Pages/ECom";
import IntegrityAnalysisList from "./components/ComponentThatDisplaysTable";
import ColorDrag from "./Pages/ColorDragPage/ColorDrag";
import Signup from "./components/Signup/Signup";
import DynamicInputs from "./components/DynamicInputs/DynamicInputs";
import CsvPageAssess from "./Assessment/CsvPageAssess";
import MapPage from "./Pages/Map/MapPage";
import HomePageIMDB from "./Pages/HomePageIMDB/HomePageIMDB";






export default function Root() {
  const [breadcrumbProps,setBreadCrumbProps] = useState({navLinks:[],activeLink:{}})
  const [defaultVal, setDefaultVal] = useState([]);
  const [currentUser,setCurrentUser]=useState({})
  const [users, setUsers] = useState([]);
  const [local,setLocal]=useState(false)
  const[unAuthMsg,setUnAuthMsg]=useState("You are not Authorized")

  const breadCrumbSet = (location) =>{
    const pathName = location.pathname.split("/").filter((path) => path);
    // console.log(pathName[0])
        if(pathName.length > 1){
          console.log("mul")
            const end = pathName[pathName.length-1];
            const prev= pathName.slice(0,-1);
            const navPrev= prev.map((path)=>({name:path, route:path}))
            console.log("naVP",navPrev)
            return {end:end , navprev:navPrev}
        }else{
          console.log("single")
          const end = pathName[0]
          // console.log(pathName)
          return {end:end}
        }
    }

  const fetchAllUsers=async () => {
    const { response, error } = await fetchUsers();
    setUsers(response.data);
  }

  useEffect(() => {
    fetchAllUsers()
  },[]);

  useEffect(()=>{
    setCurrentUser(JSON.parse(localStorage.getItem("useLogedId")))
  },[local])
  
  const permission = useMemo(() => {
    return {users,setUsers,currentUser,setCurrentUser,setLocal,local,unAuthMsg,setUnAuthMsg,defaultVal, setDefaultVal,breadcrumbProps,setBreadCrumbProps,breadCrumbSet}
  }, [users,currentUser,setCurrentUser,setLocal,local,setUnAuthMsg,unAuthMsg,defaultVal, setDefaultVal,breadcrumbProps,setBreadCrumbProps,breadCrumbSet])
  return (
    <BrowserRouter>
    <PermissionContext.Provider  value={permission}>
      <CssBaseline />
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>
          <Route exact path="/home" render={() =>(<HomePage/>)} />
          <Route exact path="/csv" render={() => 
          <PrivateCsvEditRoute>
          <CsvPage />
           </PrivateCsvEditRoute>
        } 
        />
          <Route exact path="/users/authorization/:id" render={()=>(<PermissionPage />)}/>
          
          <Route exact path="/auth/login" render={() => <LoginPage />} />
          <Route exact path="/users" render={()=> <UsersPage/>}/>
          <Route exact path="/gameredirect" render={()=> 
          <PrivateGameRoute><GamePageRedirect/></PrivateGameRoute>} />
          <Route exact path="/gameredirect/game" render={()=> <TicTacPage/>} />
          <Route exact path="/missing" render={()=> <MissingPage/>} />

          <Route exact path="/unauth" render={()=> <UnauthorizedPage/>} />
          <Route exact path="/Compo" render={()=> <ShoaibCompoPractice/>} />


          <Route exact path="/e-com" render={()=> <EComPage/>} />
          <Route exact path='/table-demo' render={()=><IntegrityAnalysisList/>}/>
          <Route exact path='/task-anubhav' render={()=><ColorDrag/>}/>
          {/* Exporting from the component itself */}
          <Route exact path='/task-anubhav/signup' render={()=><Signup/>}/>
          <Route exact path='/task-anubhav/dynamic-inputs' render={()=><DynamicInputs/>}/>



          <Route exact path="/assess" render={()=> <CsvPageAssess/>}/>
          <Route exact path="/map" render={()=> <MapPage/>}/>

          
          {/* IMDB */}
          <Route exact path="/imdb-home" render={()=> <HomePageIMDB/>}/>


        </Switch>
      </React.Suspense>
        </PermissionContext.Provider>
    </BrowserRouter>
  );
}