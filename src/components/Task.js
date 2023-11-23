import React, { useEffect, useRef, useState } from "react";
import { AlbaButton } from "@platform/service-ui-libraries";

import {
  FwButton,
  FwFileUploader2,
  FwPopover,
  FwIcon,
  FwListOptions,
  FwForm,
  fWbutton,
  ToastController,
} from "@freshworks/crayons/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Typography,
} from "@material-ui/core";
import "../styles/Assesment.scss";
import axios from "axios";

function Task() {
  const fileUploader = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const statusOptions = useRef();
  const formRef = useRef(null);
  const toast = ToastController({ position: "top-right" });
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handlemouseOut = () => {
    setIsHovering(false);
  };
  window.onclick = function (event) {
    handlemouseOut();
  };
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const formSchema = {
    name: "Test Form",
    fields: [
      // {
      //   id: "2978f820-704b-46c7-9f88-110e14e34a8c",
      //   name: "name",
      //   label: "Your Name",
      //   type: "TEXT",
      //   position: 3,
      //   required: true,
      //   placeholder: "Name",
      //   choices: [],
      //   int: "Please provide a text of at max 100 characters",
      // },

      {
        id: "3978f820-704b-46c7-9f88-110e14e34a8c",
        name: "email",
        label: "Your Email",
        type: "EMAIL",
        position: 3,
        required: true,
        placeholder: "Email",
        // hint: "Please provide a text of at max 100 characters",
        choices: [],
      },

      {
        id: "6978f820-704b-46c7-9f88-110e14e34a8c",
        name: "subject",
        label: "Subject",
        type: "TEXT",
        position: 3,
        required: true,
        placeholder: "Subject",
        choices: [],
      },

      {
        id: "f319f86f-1b6a-49cb-b4b6-cf487be94595",
        name: "description",
        label: "Description",
        type: "PARAGRAPH",
        position: 7,
        required: true,
        hint: "Please enter the the discription of your concern",
        choices: [],
      },
    ],
  };

  var fields = formSchema?.fields?.map((field) => {
    // select expects `text` and `value` prop
    if (field.type === "DROPDOWN" || field.type === "MULTI_SELECT") {
      return {
        ...field,
        choices: field.choices?.map((f) => {
          return {
            ...f,
            text: f.value,
            value: f.id,
          };
        }),
      };
    } else return field;
  });

  var formSchema1 = {
    ...formSchema,
    fields: fields,
  };

  // console.log("fields", formSchema1);

  const handleFormSubmit = async (e) => {
    const { values, isValid, errors } = await formRef.current.doSubmit(e);
    let files = await fileUploader.current.getFiles();
    toast.trigger({ type: "success", content: "Successfullly submitted" });

    if (!isValid) {
      formRef.current.setFieldErrors({
        errors,
      });
      return;
    }
    const dynamicFormData = new FormData();
    dynamicFormData.append("email", values.email);
    dynamicFormData.append("subject", values.subject);
    dynamicFormData.append("description", values.description);
    dynamicFormData.append("status", 2);
    dynamicFormData.append("priority", 1);
    files.forEach((file, index) => {
      dynamicFormData.append("attachments[]", file.file);
    });

    axios
      .post(`https://albanero.freshdesk.com/api/v2/tickets`, dynamicFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Basic aGU1RVpHNldLZTEwQkNwTzlxckY6WA==",
        },
      })
      .then((res) => console.log(res, "res"));
    console.log("dataForTickets", dynamicFormData);

    formRef.current.doReset(e);
    fileUploader.current.reset();
  };

  const handleFormReset = (e) => {
    formRef.current.doReset(e);
    fileUploader.current.reset();
  };

  return (
    <div style={{ margin: "200px auto" }}>
      <div>
        {!isHovering ? (
          <div className="WidgetDivArrow" onMouseOver={handleMouseOver}>
            <span className="material-icons MuiIcon-root">
              <Icon>navigate_before</Icon>
            </span>
          </div>
        ) : (
          <div className="widgetHelpDiv" onClick={handleClick}>
            <FwPopover
              sameWidth="true"
              // ref={statusOptions}
              style={{
                "--fw-popover-min-width": "400px",
                "--fw-popover-max-width": "400px",
                "--fw-popover-border-radius": "10px",
                "--fw-popover-min-height": "500px",
                "--fw-popover margin": "20px",
              }}
              distance="10"
              placement="top-start"
              trigger="click"
              // onFwShow={() => statusOptions.current.setFocus()}
              variant="select"
              onFwHide={() => handlemouseOut()}
            >
              {/* <FwButton color="danger" type="button" size="normal" > */}
              <div slot="popover-trigger" className="helpIconDiv">
                <span className="material-icons MuiIcon-root">
                  <Icon>help</Icon>
                </span>
                <span className="helpText">help</span>
              </div>

              <div
                slot="popover-content"
                ref={statusOptions}
                className="formDiv"
              >
                <FwForm
                  ref={formRef}
                  formSchema={formSchema1}
                  // initialValues={initialValues}
                  validate={async (values) => {
                    for (let key in values) {
                      if (values[key] == undefined || values[key] == "") {
                        return {
                          [key]: `Please fill ${key}`,
                        };
                      }
                    }
                  }}
                ></FwForm>

                <div className="fileUploader">
                  <FwFileUploader2
                    ref={fileUploader}
                    name="sample"
                    id="file-uploader-01"
                    description="We support .png, .jpeg and .jpg upto 25MB"
                    maxFileSize="5"
                    accept=".png,.jpeg,.jpg"
                    multiple="true"
                    width="100%"
                    // initialFiles={initialFiles}
                  ></FwFileUploader2>
                </div>
                <div className="resetAndSubmitButton">
                  <div>
                    <FwButton onClick={handleFormSubmit}>Submit Form</FwButton>
                  </div>

                  <div>
                    <FwButton onClick={handleFormReset}>Reset Form</FwButton>
                  </div>
                </div>
              </div>
            </FwPopover>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
