import React, { useMemo, useState,useContext,useEffect } from "react";
import Layout from "../Layout/Layout";
import { Table } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import CustomTable from "../components/ShoaibPracticeComp/CustomTable";
import { MissingPageContext, PermissionContext } from "../Context";
import data from "../Pages/ORGdata.json";
import "../styles/MissingPage.scss";
function ShoaibCompoPractice() {
  const { setBreadCrumbProps,breadCrumbSet } = useContext(PermissionContext);
  const [orgdata, setorgdata] = useState(data);
  const [singleorg, setsingleorg] = useState([]);
  const [Allmember, setAllMember] = useState([]);

  const location = useLocation();

  useEffect(()=>{
    const loc = breadCrumbSet(location)
   const pathName = location.pathname.split("/").filter((path) => path);
  if(pathName.length > 1){
    setBreadCrumbProps({navLinks:[...loc.navprev],activeLink:{name:loc.end}})
  }else{
         setBreadCrumbProps({navLinks:[],activeLink:{name:loc.end}})
  }
},[location])
  const OrganizationData = useMemo(() => {
    return {
      orgdata,
      setorgdata,
      singleorg,
      setsingleorg,
      Allmember,
      setAllMember,
    };
  }, [orgdata, setorgdata, singleorg, setsingleorg, Allmember, setAllMember]);
  return (
    <MissingPageContext.Provider value={OrganizationData}>
        <Layout>
        <dov>
          {/* <DialogTitle>Organization Details</DialogTitle> */}
          <div className="PlatformTableDiv">
            <CustomTable />
          </div>
        </dov>
    </Layout>
      </MissingPageContext.Provider>
  );
}

export default ShoaibCompoPractice;

