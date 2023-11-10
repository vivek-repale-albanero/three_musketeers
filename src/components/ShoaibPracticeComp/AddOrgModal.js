import React, { useRef, useState } from "react";
import {
  AlbaButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogActions,
  DraggableModal,
  IconButton,
  SelectForm,
  DialogContent,
  BasicProfilingDetails,
  ProfilingTemplateDetails,
  ReferenceTablesList,
  TextField,
  TextForm,
} from "@platform/service-ui-libraries";

import img from "../../assests/check.png";
import axios from "axios";
function AddOrgModal({ data }) {
  const { openModal, setOpenModal } = data;
  const [formdata, setformdata] = useState({
    OrgName: "",
    countryName: "",
    stateName: "",
    city: "",
    MemberDetails: { name: "", role: "" },
  });
  const { orgModalData } = openModal;
  const ValidationRef = useRef([]);

  console.log(formdata);
  const options = [
    { label: "SDE-1", value: "SDE-1" },
    { label: "SDE-2", value: "SDE-2" },
    { label: "SDE-3", value: "SDE-3" },
  ];
  const handleClose = () => {
    setOpenModal({ ...openModal, orgModalStatus: false });
  };

  // console.log(orgModalData,"orgModalData")
  const validateProfileForm = () => {
    const resultData = ValidationRef.current.map((refs) => {
     
      if (!refs) {
        return true;
      } else {
        return refs?.checkValidation();
      }
    });
    return resultData.every(Boolean);
  };

  const handleProceed = async () => {
    if (validateProfileForm()) {
      try {
        axios
          .post(`http://localhost:3000/Metadata`, formdata)
          .then((res) => console.log(res));
      } catch (error) {}
      setOpenModal({ ...openModal, orgModalStatus: false });
    }
  };

  // console.log('outvalid',ValidationRef)

<<<<<<< HEAD
  const HandleOrgChange=()=>{

  }
  const checklength=(value)=>{
    let length=""
    if(value.length<5){
      return "Organization must be more than 5 Character"
=======
  const checklength = (value) => {
    let length = "";
    if (value.length < 5) {
      return "Organization must be more than 5 Character";
>>>>>>> 7a39fb5b0aaaee10836f896e4cd5f3c67502c5d6
    }

    return <img width="20px" src={img} />;
  };

  // console.log(ValidationRef, "valid");
  console.log(openModal, "data", data);
  return (
    <div className="AddOrgModal">
      <Dialog
        className="appModal AddOrgmodalcustomcss"
        open={openModal.orgModalStatus}
        PaperComponent={DraggableModal}
        aria-labelledby="draggable-dialog-title"
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle id="draggable-dialog-title">
          <div className="al-flex al-spc-btw">
            Data Profiling
            <IconButton
              onClick={handleClose}
              className="close_icon"
              data-test-id="dataprofiling-popup-closeicon"
            >
              <Icon>close</Icon>
            </IconButton>
          </div>
        </DialogTitle>

        <DialogContent>
          {/* {step === 0 && <BasicProfilingDetails />}
          {step === 1 && <ProfilingTemplateDetails />}
          {step === 2 && <ReferenceTablesList />} */}
          <TextForm
            label="Organization Name"
            ref={(e) => (ValidationRef.current[0] = e)}
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            variant="filled"
<<<<<<< HEAD
            fieldValue={orgModalData.OrgName}
            // onChange={(e)=>}
=======
            onChange={(e) => setformdata({ ...formdata, OrgName: e })}
            fieldValue={formdata.OrgName}
>>>>>>> 7a39fb5b0aaaee10836f896e4cd5f3c67502c5d6
            placeholder="Organization Name"
            validationFunc={(value) => checklength(value)}
          ></TextForm>
          <TextForm
            label="Countery Name"
            fieldValue={formdata.countryName}
            onChange={(e) => setformdata({ ...formdata, countryName: e })}
            ref={(e) => (ValidationRef.current[1] = e)}
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            placeholder="Countery Name"
          ></TextForm>
          <TextForm
            fieldValue={formdata.stateName}
            onChange={(e) => setformdata({ ...formdata, stateName: e })}
            label="State Name"
            ref={(e) => (ValidationRef.current[2] = e)}
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            placeholder="State Name"
          ></TextForm>
          <TextForm
            fieldValue={formdata.city}
            label="City Name"
            onChange={(e) => setformdata({ ...formdata, city: e })}
            ref={(e) => (ValidationRef.current[3] = e)}
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            placeholder="City Name"
          ></TextForm>

          <DialogTitle>New Members</DialogTitle>
          <TextForm
            label="Name"
            ref={(e) => (ValidationRef.current[4] = e)}
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            onChange={(e) =>
              setformdata({
                ...formdata,
                MemberDetails: { ...formdata.MemberDetails, name: e },
              })
            }
            placeholder="Name"
          ></TextForm>
          <SelectForm
            ref={(e) => (ValidationRef.current[5] = e)}
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            onChange={(e) =>
              setformdata({
                ...formdata,
                MemberDetails: { ...formdata.MemberDetails, role: e },
              })
            }
            label="Select Role"
            options={options}
            value={formdata.MemberDetails.role}
          />

          {/* <TextField></TextField> */}
        </DialogContent>
        <DialogActions>
          <div className="__dialog_action_wrapper al-flex">
            <AlbaButton
              //   variant={step === 0 ? 'danger' : 'primary'}
              //   onClick={handleBack}
              data-test-id="data-profiling-cancel-button"
            >
              {/* {step === 0 ? 'Cancel' : 'Back'} */}
              Add Member
            </AlbaButton>
            {/* {profilingOptions?.useTemplate && (step == 0 || (step == 1 && referenceTables?.length)) ? ( */}

            {/* ) : ( */}
            <AlbaButton
              variant="success"
              onClick={handleProceed}
              // loading={isLoadingProceedButton}
              data-test-id="data-profiling-proceed-button"
            >
              Confirm
            </AlbaButton>
            {/* )} */}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddOrgModal;
