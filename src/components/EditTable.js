import React, { useRef, useState } from 'react';
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
// import './EditTable.scss';
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
    console.log(validateTableForm())
    if(validateTableForm()){
      onSave(editedData);
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (e, key) => {
    setEditedData({ ...editedData, [key]: e });
  };

  return (
    <Dialog open={open} className="compare-files-dialog aw-dialog appModal"
    PaperComponent={DraggableModal}
    maxWidth={"md"}
    fullWidth>
      <DialogTitle>{isAdding ? 'Add New Row' : 'Edit Data'}</DialogTitle>
      <DialogContent>
        <div>
          {Object.keys(editedData).map((key,index) => (
            <TextForm
            ref={(element) => {
              validateFields.current[index] = element;
            }}
            key={key}
              label={key}
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
          variant="success"
          onClick={handleSave}
          style={{backgroundColor: "teal",
          color: "white"}}
          >
          Save
        </AlbaButton>
        <AlbaButton
          variant="danger"
          onClick={handleCancel}
        >
          Cancel
        </AlbaButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditTable;
