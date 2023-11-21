import React from "react";
import {
  Typography,
  Icon,
  TextForm,
  AlbaButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DraggableModal,
} from "@platform/service-ui-libraries";
import "./ViewForm.scss"


function ViewForm({ setViewModal, viewModal, onCloseVIew ,img}) {
  const showValues =  (Object.entries(viewModal.data).slice(0, 6));
  // console.log("viewDialog",showValues)
  const ind = viewModal.ind
  return (
    <Dialog
      open={viewModal.status}
      onClose={onCloseVIew}
      className=" aw-dialog appModal"
      PaperComponent={DraggableModal}
      maxWidth={"xs"}
      fullWidth
    >
      <DialogTitle id="draggable-dialog-title">
        <div className="formHead">
          <Typography variant="h6">
            {/* {userFormModal.edit ? "Edit Details" : "Add User"} */}
            View Details
          </Typography>
          <Icon className="closeIcon" onClick={onCloseVIew}>
            close
          </Icon>
        </div>
      </DialogTitle>
      <DialogContent>
        <div>

        {showValues.map((obj,ind)=>(
          <div key={ind}  className="viewDetails">
            <div>{obj[0]}</div>
            {/* <span>-</span> */}
            <div>{obj[1]}</div>
          </div>
        ))}
        <div className="viewDetails">
        <div>image</div>
        <div>
        <image src={img[ind]} />
        </div>
        </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}

export default ViewForm;
