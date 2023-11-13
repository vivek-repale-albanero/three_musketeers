import React, { useEffect, useRef, useState } from "react";
import { AlbaAutocomplete } from "@platform/service-ui-libraries";
import "../../styles/MissingPage.scss";
import { Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { fetchOrgData } from "../../api/api";
import { GetRows } from "../MissingPage/OrganizationTable";
function AlbaAutoCompl({ data, page, pageSize }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loding, setLoding] = useState(false);
  const [defaultVal, setDefaultVal] = useState([]);
  const [options, setoptions] = useState([]);
  const Autoref= useRef(null)
  // const options = data.reduce((acc, item, i) => {
  //   let newobj={
  //     ...item,
  //   }
  //    newobj.label=item.OrgName
  //    acc.push(newobj)
  //   return acc;
  // }, []);
  const fetchData = async () => {
    const { response, error } = await fetchOrgData({ page, pageSize });
    if (response?.statusText == "OK") {
      let GetMassageData = GetRows(response?.data);
      setoptions(
        GetMassageData.map((item) => {
          return { ...item, label: item.OrgName };
        })
      );
    } else {
      setJsonData([]);
      console.log(error, "error", "Something went wrong in fetchmetdata");
      ShowSnackbar(true, "error", "Something Went Wrong in fetchmetdata");
    }
  };
  console.log(options, "options");
  // const handleSearchFiles = async (e) => {
  //   const { searchText, setLoadingList, setAvailableOptions } = e;
  //   setAvailableOptions(options);
  //   // console.log(e, "e");
  // };
  const handleProductsTableChange = (items) => {
    console.log("getting item", items);
    setSelectedItems(items);
    // console.log(Autoref.current.checkValidation(),"ref")
    // setDefaultVal([...defaultVal, ...items]);
    // setProducts(items);
  };
  const handleItemSelected = (value) => {
    // console.log(value);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <AlbaAutocomplete
        options={options}
        // defaultVal={defaultVal}
        updateValue={(val) => handleProductsTableChange(val.selectedItems)}
        multiple={true}
        selectAll={true}
        customListRender={({ availableItems, handleItemSelected }) => {
          return availableItems.map((item) => (
            <div style={{padding:"2px 5px", borderRadius:"10px",backgroundColor:"#778899",color:"white", margin:"5px"}} key={item.id} onClick={(value) => handleItemSelected(item)}>
              <h6>{item.label}</h6>
            </div>
          ));
        }}
      />
    </div>
  );
}
export default AlbaAutoCompl;