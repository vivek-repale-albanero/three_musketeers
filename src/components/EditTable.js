import React, { useContext, useRef, useState } from 'react';
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
const EditTable = ({ open, data, onSave, onCancel, isAdding }) => {
  const [editedData, setEditedData] = useState(data);
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
    // console.log(validateTableForm())
    if(validateTableForm()){
      onSave(editedData);
      onCancel();
    }
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
            // validationFunc={jobNameValidation}
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
