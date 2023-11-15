import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChildAss from "./ChildAssesment";
import { AlbaButton, Icon, TextForm,Typography } from "@platform/service-ui-libraries";
import SeeAllParentDetail from "./SeeAllParentDetail";
function ParentAss() {
  const [ParentList, SetParentList] = useState([]);
  const [ParentData, SetParentData] = useState({
    id: uuidv4(),
    parentName: "",
    child: [],
  });
  const [Open, setOpen] = useState(false);
  // const [Icon, setIcon] = useState(false);
  const ParentRef = useRef({});

  const HandleClick = () => {
    if (ParentRef.current.parentInput.checkValidation()) {
      SetParentList([...ParentList, ParentData]);
      SetParentData({ id: uuidv4(), parentName: "", child: [] });
    }
  };

  //   console.log(ParentList,"ParentList")

  const componentRendering = () => {
    setOpen(!Open);
  };
  return (
    <div>
      <div style={{margin:"50px auto 0",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <AlbaButton variant="success"onClick={componentRendering} icon={Open?"close":"visibility"}>
        </AlbaButton>
      </div>

      {Open ? (
        <SeeAllParentDetail data={ParentList} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
            padding: "25px",
            margin: "10px",
            height:"750px"
          }}
        >
          <div
            style={{  height: "700px", width: "40%",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",overflowY:"auto" }}
          >
            <div style={{ padding: "40px", display: "flex" }}>
              <TextForm
                label={"Enter Parent Name"}
                placeholder="Enter Parent Name"
                fieldValue={ParentData?.parentName}
                onChange={(e) =>
                  SetParentData({
                    ...ParentData,
                    parentName: e,
                  })
                }
                ref={(e) => (ParentRef.current.parentInput = e)}
                validationsDetail={{
                  validations: {
                    whiteSpace: true,
                    required: true,
                  },
                }}
                fullWidth
                maxWidth={"md"}
                // className="TextFormInputWatch"
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ height: "100px" }}></div>
                <AlbaButton variant="success" onClick={HandleClick}>
                  +
                </AlbaButton>
              </div>
            </div>

            <div>
              {ParentList.length > 0 &&
                ParentList.map((item, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        padding:"1px 2px",
                        backgroundColor: "#219D28",
                        borderRadius: "20px",
                        width: "20%",
                        color: "white",
                        margin: "5px auto",
                      }}
                    >
                      <p>{item.parentName}</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            style={{  height: "700px", width: "40%", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <div style={{ width: "70%", margin: "50px auto" }}>
              <ChildAss data={{ ParentList, SetParentList }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentAss;
