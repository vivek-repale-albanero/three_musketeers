import React, { useState } from "react";
import "./DynamicInputs.scss";
import {
  TextForm,
  CheckboxForm,
  SelectForm,
  AlbaAutocomplete,
} from "@platform/service-ui-libraries";
const DynamicInputsMetaData = [
  { type: "input", label: "Fisrt Name", value: "" },
  { type: "input", label: "Last Name", value: "" },

  { type: "checkbox", label: "Married", value: null },
  {
    type: "select",
    label: "Language",
    options: ["Java", "JavaScript", "Python"],
    value: "",
  },
  {
    type: "autocomplete",
    label: "Sports",
    options: ["Rugby", "Football", "Cricket", "Surfing"],
    value: [],
  },
];

function DynamicInputs() {
  const [formdata, setFormdata] = useState(DynamicInputsMetaData);

  //Input change function
  const handleInputChange = (input, index) => {
    // console.log('we got',input)
    // const filteredItem=formdata.filter(elem=>elem.label===label)
    setFormdata((prevState) =>
      prevState.map((elem, ind) => {
        if (ind === index) return { ...elem, value: input };
        return elem;
      })
    );
  };
  console.log(formdata);

  const handleAlbaAutocorrectChange = (items, index) => {
    console.log('itms in autocrect',items)
    setFormdata((prevState) =>
      prevState.map((elem, ind) => {
        if (ind === index) return { ...elem, value:items };
        return elem
      })
    );
  };

  return (
    <div className="__dynamicinputs">
      <div className="__dynamicinputs__wrapper">
        {DynamicInputsMetaData.map((item, index) => {
          //console.log('value in first name', item.value,'and meta data is', DynamicInputsMetaData)
          if (item.type === "input") {
            return (
              <TextForm
                key={item.label}
                label={item.label}
                id="outlined-helperText"
               fieldValue={item.value}
                onChange={(inputValue) => handleInputChange(inputValue, index)}
                variant="filled"
                placeholder="Johnny"
              />
            );
          }

          if (item.type === "checkbox") {
            return (
              <CheckboxForm
                key={item.label}
                label={item.label}
                fieldValue={item.value}
                onChange={(inputValue) => handleInputChange(inputValue, index)}
              />
            );
          }
          if (item.type === "select") {
            console.log("value in select",formdata, item.value);
            return (
              <SelectForm
                key={item.label}
                label={item.label}
                options={item.options.map((type) => {
                  return { label: type, value: type };
                })}
               // valueKey='alis'
                //labelKey={item.label}
                fieldValue={item.value}
                onChange={(inputValue) => handleInputChange(inputValue, index)}
              />
            );
          }
          if (item.type === "autocomplete") {
            return (
              <AlbaAutocomplete
                key={item.label}
                options={item.options.map((item, index) => {
                  return { id: index, label: item };
                })}
                // defaultVal={item.value.map((elem) => {
                //     console.log('items in default val',elem)
                //   return { ...elem, id: index, label: elem };
                // })}
                updateValue={(val) =>
                  handleAlbaAutocorrectChange(val.selectedItems, index)
                }
                multiple={true}
                selectAll={true}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default DynamicInputs;
