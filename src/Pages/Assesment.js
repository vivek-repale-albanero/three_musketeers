import React from "react";
import Layout from "../Layout/Layout";
import ParentAss from "../components/AssesmentComp/ParentAssessment";
import ChildAss from "../components/AssesmentComp/ChildAssesment";
import '../styles/Assesment.scss'
function Assesment() {

  return (
    <Layout>
      <div className="MainAss">
        <div><ParentAss /></div>
      </div>
    </Layout>
  );
}

export default Assesment;
