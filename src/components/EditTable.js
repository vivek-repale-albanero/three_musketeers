import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  AlbaButton,
  Typography,
  Paper,
  Dialog,
  Icon,
  DialogActions,
  TextForm,
  DraggableModal,
  DialogTitle,
  DialogContent,
} from "@platform/service-ui-libraries";
import './EditTable.scss';
import { PermissionContext } from '../Context';
import { fetchTestDataUsername } from '../api/api';
const EditTable = ({ open, data, onSave, onCancel, isAdding }) => {
  const [editedData, setEditedData] = useState(data);
  const [existingData, setExistingData] = useState(null);
const validateFields=useRef([])
const validateTableForm=()=>{
  const resultData=validateFields.current.map((refs)=>{
    if(!refs){
      return true
    }else{
        return refs?.checkValidation()
      }
  })
  return resultData.every(Boolean)
}
  const handleSave = () => {
    if(validateTableForm()){
      onSave(editedData);
      onCancel();
    }
  };
    //////////////////////////////Fetch users name//////////////////////
    const fetchUsersDataFun =async () => {
      const { response, error } =await fetchTestDataUsername();
      setExistingData(response.data)
    };
    useEffect(()=>{
      fetchUsersDataFun()
    },[])
  const checkUser = (value ) => {
    const isUserExist =existingData.some(user => user.userName === value);
    let validationMsg = '';
     if(isUserExist){
      validationMsg="User Already Exist"
     }
  
    return validationMsg;
  };

  const handleInputChange = (e, key) => {
    setEditedData({ ...editedData, [key]: e });
  };

  return (
    <Dialog open={open} 
    className="compare-files-dialog aw-dialog appModal"
    PaperComponent={DraggableModal}
    maxWidth={"xs"}
    fullWidth>
      <DialogTitle id="draggable-dialog-title">
        <div className='formTable'>
      <Typography variant="h3">{isAdding ? 'Add New Data' : 'Edit Data'}</Typography>
      <Icon style={{ color: "white" }} onClick={onCancel}>
            close
          </Icon>
        </div>
      </DialogTitle>
      <DialogContent>
        <div>
          {Object.keys(editedData).map((key,index) => (
            <TextForm
            ref={(element) => {
              validateFields.current[index] = element;
            }}
            key={key}
            // disabled={key==="id"}
              label={key.toUpperCase()}
            variant="filled"
            fieldValue={editedData[key]}
            placeholder={key}
            onChange={(e) => handleInputChange(e, key)}
            validationsDetail={{validations:{
              required:true,
              whiteSpace:true
            }}}
            // validationFunc={(value)=>checkUser(value)}
            id={key}
          />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
          <AlbaButton
            variant="danger"
            onClick={onCancel}
          >
            Cancel
          </AlbaButton>
        <AlbaButton
          variant="success"
          onClick={handleSave}
          style={{backgroundColor: "teal",
          color: "white"}}
          >
          Save
        </AlbaButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditTable;
