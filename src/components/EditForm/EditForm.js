import React, { useContext, useState, useRef } from "react";
import { Modal, Paper, Typography, IconButton, Icon } from "@material-ui/core";
import { TextForm, AlbaButton ,Dialog,DialogTitle,DialogContent,DialogActions} from "@platform/service-ui-libraries";
import "./EditForm.scss";
import { UsersContext } from "../../Context";

function EditForm() {
  const { userFormModal, saveUserData, closeModal } = useContext(UsersContext);
  const [editUserData, setEditUserData] = useState(userFormModal.data);
  const validateFields = useRef([]);

 //custom function to validate join tables and from table
 const checklength = (value ) => {
  let validationMsg = '';
   if(value.length>3){
    validationMsg="Length should not be Greater than 3"
   }

  return validationMsg;
};
 
  const validateProfileForm = () => {
    const resultData = validateFields.current.map((refs) => {
      console.log("ref",refs)
      if (!refs) {
        return true;
      } else {
        return refs?.checkValidation();
      }
    });
    return resultData.every(Boolean);
  };
  const handleSave = () => {
    if(validateProfileForm()){
      saveUserData(editUserData);
    }
  };
  return (
    <Dialog
      open={userFormModal.status}
      onClose={closeModal}
      className="appModal"
      maxWidth={'xl'}
    >
        <DialogTitle className="__title" id="draggable-dialog-title">
          <Typography variant="h6" >
            {userFormModal.edit ? "Edit Details" : "Add User"}
          </Typography>
          <IconButton className="closeIcon" onClick={closeModal}>
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextForm
            ref={(element) => {
              validateFields.current[0] = element;
            }}
            variant="filled"
            label="First Name"
            fieldValue={editUserData.user.firstName}
            onChange={(e) =>
              setEditUserData({
                ...editUserData,
                user: { ...editUserData.user, firstName: e },
              })
            }
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            validationFunc={(value) => checklength(value)}
            />
          <TextForm
            ref={(element) => {
              validateFields.current[1] = element;
            }}
            variant="filled"
            label="Last Name"
            fieldValue={editUserData.user.lastName}
            onChange={
              (e) =>
              setEditUserData({
                ...editUserData,
                user: { ...editUserData.user, lastName: e },
              })
            }
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            />
          <TextForm
            ref={(element) => {
              validateFields.current[2] = element;
            }}
            variant="filled"
            label="UserName"
            fieldValue={editUserData.user.userName}
            onChange={(e) =>
              setEditUserData({
                ...editUserData,
                user: { ...editUserData.user, userName: e },
              })
            }
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            />
          <TextForm
            ref={(element) => {
              validateFields.current[3] = element;
            }}
            variant="filled"
            label="Email-Id"
            fieldValue={editUserData.email}
            onChange={(e) =>
              setEditUserData({
                ...editUserData,
                email: e,
              })
            }
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true,
              },
            }}
            />
          <TextForm
            ref={(element) => {
              validateFields.current[4] = element;
            }}
            variant="filled"
            label="password"
            fieldValue={editUserData.password}
            onChange={(e) =>
              setEditUserData({
                ...editUserData,
                password: e,
              })
            }
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true
              }
            }}
            />
          <TextForm
            ref={(element) => {
              validateFields.current[5] = element;
            }}
            variant="filled"
            label="Age"
            fieldValue={editUserData.age}
            onChange={(e) =>
              setEditUserData({
                ...editUserData,
                age: e,
              })
            }
            validationsDetail={{
              validations: {
                required: true,
                whiteSpace: true
              }
            }}
            />
            </DialogContent>
          <DialogActions>
            <AlbaButton
              variant="danger"
              className="cancelBtn"
              onClick={closeModal}
              >
              Cancel
            </AlbaButton>
            <AlbaButton
              variant="success"
              onClick={handleSave}
              >
              Save
            </AlbaButton>
                </DialogActions>
    </Dialog>
  );
}

export default EditForm;
