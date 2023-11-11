import React, { useState, useContext } from "react";
import { Typography, AlbaAutocomplete } from "@platform/service-ui-libraries";
import { PermissionContext } from "../Context";
import { getAutoCompleteOptions } from "../api/api";
import "./AlbaAutoCompleteComp.scss"
function AlbaAutoCompleteComp() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [loding, setLoding] = useState(true);
  const { defaultVal, setDefaultVal } = useContext(PermissionContext);

  const handleSearch = async () => {
    setLoding(true);
    const { response, error } = await getAutoCompleteOptions();
    setLoding(false);
    setOptions(response.data);
  };
  const handleupdate = (e) => {
    setSelectedItems(e.selectedItems);
    setDefaultVal(e.selectedItems);
  };

  console.log("selectedItems", selectedItems);
  return (
    <div className="autoComp">
      <AlbaAutocomplete
        asyncSearchMode={true}
        dataTestId="alba-autocomplete"
        onType={handleSearch}
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
            //   <div
            //    className="join_table_list_item alba-autocomplete__list__item"
            //    onClick={() => handleItemSelected(option)}
            //    key={option.id}
            //  >
            //    <Typography
            //      variant="body1"
            //      style={{ fontWeight: "bold" }}
            //      className="text_element al-ellipsis"
            //    >
            //      {option?.label}
            //    </Typography>
            //  </div>
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
        updateValue={handleupdate}
      />
    </div>
  );
}
export default AlbaAutoCompleteComp;
