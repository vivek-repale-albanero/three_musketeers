import React from "react";
import Layout from "../Layout/Layout";
import ParentAss from "../components/AssesmentComp/ParentAssessment";
import ChildAss from "../components/AssesmentComp/ChildAssesment";
import "../styles/Assesment.scss";
import ParacticeStyling from "../components/AssesmentComp/ParacticeStyling";
import Task from "../components/Task";
function Assesment() {
  return (
    <Layout>
      <div className="MainAss">
        {/* <div><ParentAss /></div> */}
        <Task />
      </div>
      {/* <ParacticeStyling /> */}
    </Layout>
  );
}

export default Assesment;
