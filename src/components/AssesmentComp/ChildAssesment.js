import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AlbaAutocomplete,
  Typography,
  AlbaButton,
  TextForm,
  Icon,
} from "@platform/service-ui-libraries";
import TreeNode from "./SingleChildTree.js";
import TemporaryDrawer from "./Draw.js";
import Draw from "./Draw.js";
import { PermissionContext } from "../../Context.js";
import { v4 as uuidv4 } from "uuid";

function ChildAss({ data }) {
  const { ParentList, SetParentList } = data;
  const [selectedItems, setSelectedItems] = useState([]);
  const { defaultVal, setDefaultVal } = useContext(PermissionContext);
  const [child, setchild] = useState({id:"",name:""});
  const [toggle, settoggle] = useState(false);
  const childRef = useRef({});
  const Childtext = useRef({});
  const [OpenDrawer, setOpenDrawaer] = useState(false);

  const CloseDrawer = () => {
    setOpenDrawaer(false);
  };

  const OpenDrawerFunc = () => {
    setOpenDrawaer(true);
  };

  const handleProductsTableChange = (items) => {
    setSelectedItems(items);
    console.log(items, "items");
    // let defaultvalue = items.map((item) => {
    //   if (item.id === selectedItems[0].id) {
    //     return {
    //       ...selectedItems,
    //       child: [...selectedItems[0].child, child],
    //     };
    //   }
    // });
    setDefaultVal(items);
    // }else{
    //   setDefaultVal(items);

    // }
  };

  const handlAddChildClick = () => {
    // console.log(childRef.current.checkValidation());
    if (childRef.current.parentChild.checkValidation()) {
      settoggle(true);
    }
  };

  useEffect(() => {}, []);

  const handleAddNewChild = () => {
    if (Childtext.current.childChild.checkValidation()) {
      let NewParentList = ParentList.map((item) => {
        if (item.id === defaultVal[0].id) {
          return { ...item, child: [...item.child, {...child}] };
        } else {
          return item;
        }
      });



      SetParentList(NewParentList);
      setDefaultVal(prevDefaultVal => {
        return prevDefaultVal.map(item => ({ ...item, child: [...item.child, child] }));
      })
     
      setchild({id:"",name:""});
    }
  };
  
  return (
    <div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "100px",
        }}
        onClick={OpenDrawerFunc}
      >
        <Icon>visibility</Icon>
      </div> */}

      {OpenDrawer && (
        <Draw CloseDrawer={CloseDrawer} data={ParentList} open={OpenDrawer} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ width: "80%" }}>
          <AlbaAutocomplete
            options={ParentList.map((item) => {
              return { ...item, label: item.parentName };
            })}
            label={"Select an option"}
            defaultValue={defaultVal}
            updateValue={(val) => handleProductsTableChange(val.selectedItems)}
            multiple={false}
            selectAll={true}
            ref={(e) => (childRef.current.parentChild = e)}
            validationsDetail={{
              validations: {
                whiteSpace: true,
                required: true,
              },
            }}
            shr
          />
        </div>
        <div style={{ marginTop: "22px" }}>
          <AlbaButton onClick={handlAddChildClick} variant="success">
            Add Child
          </AlbaButton>
        </div>
      </div>
      <div>
        {selectedItems.length > 0 ? (
          <div>
            <p style={{ margin: "20px" }}>
              Parent Name :{" "}
              <span
                style={{
                  display: "inline-block",
                  padding: "1px 2px",
                  backgroundColor: "#219D28",
                  borderRadius: "20px",
                  width: "20%",
                  color: "white",
                  margin: "5px auto",
                }}
              >
                {selectedItems[0]?.parentName}
              </span>
            </p>
            <dl>
              {/* Map through each root data and render a TreeNode for each */}

              <TreeNode
                data={ParentList.filter(
                  (item) => item.id == selectedItems[0]?.id
                )}
              />
            </dl>
          </div>
        ) : defaultVal.length > 0 ? (
          <div>
            <p
              style={{ margin: "20px" }}
            >
              Parent Name:{" "}
              <span
                style={{
                  display: "inline-block",
                  padding: "1px 2px",
                  backgroundColor: "#219D28",
                  borderRadius: "20px",
                  width: "20%",
                  color: "white",
                  margin: "5px auto",
                }}
              >
                {defaultVal[0]?.parentName}
              </span>
            </p>

            <ul>
              {/* Map through each root data and render a TreeNode for each */}

              <TreeNode data={defaultVal} />
            </ul>
          </div>
        ) : null}
        {toggle && (
          <div style={{ display: "flex", justifyContent: "space-evenly", alignContent:"center" }}>
            <div>
              <TextForm
                placeholder={"Add New Child"}
                label="Add New Child"
                fieldValue={child.name}
                onChange={(e) => setchild({id:uuidv4(),name:e})}
                ref={(e) => (Childtext.current.childChild = e)}
                validationsDetail={{
                  validations: {
                    whiteSpace: true,
                    required: true,
                  },
                }}
                fullWidth
                maxWidth={"md"}
              />
            </div>
            <div style={{height:"40px",marginTop:"35px"}}>
              <AlbaButton variant="success" onClick={handleAddNewChild}>+</AlbaButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChildAss;
