import React, { useState, useContext, useEffect } from "react";
import { Typography, AlbaAutocomplete } from "@platform/service-ui-libraries";
import { PermissionContext } from "../Context";
import { getAutoCompleteOptions } from "../api/api";
import "./AlbaAutoCompleteComp.scss"
function AlbaAutoCompleteComp() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [loding, setLoding] = useState(false);
  const { defaultVal, setDefaultVal } = useContext(PermissionContext);
  const handleSearch = async () => {
    setLoding(true);
    const { response, error } = await getAutoCompleteOptions();
    setOptions(response.data);
    setLoding(false);
  };
  useEffect(()=>{
    handleSearch()
  },[])
  // console.log("options",options)
  const handleupdate = (val) => {
    setSelectedItems(val);
    setDefaultVal(val)
  };

  console.log("selectedItems", selectedItems);
  return (
    <div className="autoComp">
      <AlbaAutocomplete
        dataTestId="alba-autocomplete"
        placeholder="Placeholder"
        label="Autocomplete"
        loading={loding}
        defaultValue={defaultVal}
        customListRender={({ availableItems, handleItemSelected }) => {
          return availableItems.map((option) => {
            return (
              <div
                className="join_table_list_item alba-autocomplete__list__item options"
                onClick={() => handleItemSelected(option)}
                key={option.id}
              >
                <Typography
                  variant="body1"
                  className="text_element al-ellipsis optSty"
                >
                  {option?.label}
                </Typography>
              </div>
            );
          });
        }}
        options={options}
        multiple={true}
        selectAll={true}
        disabled={false}
        shrinkList={true}
        validationsDetail={{
          validations: {
            required: true,
          },
        }}
        updateValue={(e)=>handleupdate(e.selectedItems)}
      />
    </div>
  );
}
export default AlbaAutoCompleteComp;
