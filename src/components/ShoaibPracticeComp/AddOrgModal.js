import React, { useRef } from "react";
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

import img from '../../assests/check.png'
import axios from "axios";
function AddOrgModal({ data }) {
  const { openModal, setOpenModal } = data;
  const{orgModalData}=openModal
  const ValidationRef = useRef([]);

  const options = [
    { label: "SDE-1", value: "SDE-1" },
    { label: "SDE-2", value: "SDE-2" },
    { label: "SDE-3", value: "SDE-3" },
  ];
  const handleClose = () => {
    setOpenModal({ ...openModal, orgModalStatus: false });
  };

  
  console.log(orgModalData,"orgModalData")
  const handleProceed = async() => {
    try {   
      axios.post(`http://localhost:3000/Metadata`,)
    } catch (error) {
      
    }
    // console.log(ValidationRef)
    setOpenModal({ ...openModal, orgModalStatus: false });


  };

  // console.log('outvalid',ValidationRef)

  const HandleOrgChange=()=>{

  }
  const checklength=(value)=>{
    let length=""
    if(value.length<5){
      return "Organization must be more than 5 Character"
    }
     

    return <img width="20px" src={img} />

  }
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
            fieldValue={orgModalData.OrgName}
            // onChange={(e)=>}
            placeholder="Organization Name"
            validationFunc={(value) => checklength(value)}

          ></TextForm>
          <TextForm
            label="Countery Name"
            fieldValue={orgModalData.countryName}

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
            fieldValue={orgModalData.stateName}

            label="State Namee"
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
            fieldValue={orgModalData.city}
            label="City Name"
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
            label="Select Role"
            options={options}
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
