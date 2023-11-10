import React, { useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import { Table } from "@material-ui/core";
import CustomTable from "../components/ShoaibPracticeComp/CustomTable";
import { MissingPageContext } from "../Context";
import data from "../Pages/ORGdata.json";
import "../styles/MissingPage.scss";
import { DialogTitle } from "@platform/service-ui-libraries";
function ShoaibCompoPractice() {
  const [orgdata, setorgdata] = useState(data);
  const [singleorg, setsingleorg] = useState([]);
  const [Allmember, setAllMember] = useState([]);
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

