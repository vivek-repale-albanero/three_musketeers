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
  ShowSnackbar,
  TextForm,
} from "@platform/service-ui-libraries";

import img from "../../assests/check.png";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ShoaibAddOrganizationFunc } from "../../api/api";
function AddOrgModal({ data, fetchData }) {
  const { openModal, setOpenModal } = data;
  const [formdata, setformdata] = useState({
    OrgName: "",
    countryName: "",
    stateName: "",
    city: "",
    MemberDetails: { id: uuidv4(), name: "", role: "" },
  });
  const [Allmember, setAllMember] = useState([]);
  const { orgModalData } = openModal;
  const ValidationRef = useRef([]);
  const MemberValidationref = useRef([]);

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
    console.log(ValidationRef, "ref");
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
      formdata.Membercount=Allmember.length
      let { response, error } = await ShoaibAddOrganizationFunc(formdata);
      console.log("outresponse", response);
      if (response.status === 201) {
        console.log("response ShoaibAddOrganizationFunc", response);
        // console.log(fetchData)
        setformdata({
          OrgName: "",
          countryName: "",
          stateName: "",
          city: "",
          MemberDetails: { name: "", role: "" },
        });
        setOpenModal({ ...openModal, orgModalStatus: false });
      } else {
        console.log(
          error,
          "error",
          "Something went wrong in ShoaibAddOrganizationFunc"
        );
        ShowSnackbar(
          true,
          "error",
          "Something Went Wrong in ShoaibAddOrganizationFunc"
        );
      }
    }
  };

  const handleAddclick = () => {
    console.log("handleAddclick");

    if (formdata.MemberDetails.name && formdata.MemberDetails.role) {
      setAllMember((prev) => [...prev, formdata.MemberDetails]);
      setformdata({ ...formdata, MemberDetails: { name: "", role: "" } });
    } else {
      alert("please fill all the member details");
    }
  };

  const handlOnchangeOfOlderMember = (e, member) => {
    // console.log(newobj)
    // const EditedAllmember =Allmember.map((member)=>{
    //   if(member.id==id){
    //    return {...item, member:{name}}
    //   }return item
    // })
    // console.log(member,e)
  };

  console.log(Allmember);

  const checklength = (value) => {
    let length = "";
    if (value.length < 5) {
      return "Organization must be more than 5 Character";
    }

    return <img width="20px" src={img} />;
  };

  // // console.log(ValidationRef, "valid");
  // console.log(openModal, "data", data);
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
            fieldValue={formdata.OrgName}
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            variant="filled"
            onChange={(e) => setformdata({ ...formdata, OrgName: e })}
            placeholder="Organization Name"
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

          {Allmember.length > 0 &&
            Allmember.map((member, index) => {
              return (
                <>
                  <div style={{ marginTop: "10px" }}>
                    <DialogTitle>New Member : {member.name}</DialogTitle>
                  </div>
                  <TextForm
                    label="Name"
                    ref={(e) => (ValidationRef.current[index] = e)}
                    validationsDetail={{
                      validations: {
                        required: true,
                        whiteSpace: true,
                      },
                    }}
                    onChange={(e) => handlOnchangeOfOlderMember(e, member)}
                    fieldValue={member.name}
                    placeholder="Name"
                  ></TextForm>
                  <SelectForm
                    ref={(e) => (ValidationRef.current[index] = e)}
                    validationsDetail={{
                      validations: {
                        required: true,
                        whiteSpace: true,
                      },
                    }}
                    onChange={(e) => handlOnchangeOfOlderMember(e, member)}
                    label="Select Role"
                    placeholder="Select role"
                    options={options}
                    fieldValue={member.role}
                    onc
                  />
                </>
              );
            })}

          <DialogTitle> Add New Members</DialogTitle>

          <TextForm
            label="Name"
            ref={(e) => (ValidationRef.current[4] = e)}
            // validationsDetail={{
            //   validations: {
            //     required: true,
            //     whiteSpace: true,
            //   },
            // }}
            onChange={(e) =>
              setformdata({
                ...formdata,
                MemberDetails: { ...formdata.MemberDetails, name: e },
              })
            }
            fieldValue={formdata.MemberDetails.name}
            placeholder="Name"
          ></TextForm>
          <SelectForm
            ref={(e) => (ValidationRef.current[5] = e)}
            // validationsDetail={{
            //   validations: {
            //     required: true,
            //     whiteSpace: true,
            //   },
            // }}
            onChange={(e) =>
              setformdata({
                ...formdata,
                MemberDetails: { ...formdata.MemberDetails, role: e },
              })
            }
            label="Select Role"
            placeholder="Select role"
            options={options}
            fieldValue={formdata.MemberDetails.role}
          />
        </DialogContent>
        <DialogActions>
          <div className="__dialog_action_wrapper al-flex">
            <AlbaButton
              //   variant={step === 0 ? 'danger' : 'primary'}
              //   onClick={handleBack}
              className="Addmemberbutton"
              onClick={handleAddclick}
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
