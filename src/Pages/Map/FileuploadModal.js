import React,{useContext} from "react";
import {
  AlbaButton,
  Typography,
  Paper,
  Dialog,
  Icon,
  TextForm,
  DraggableModal,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@platform/service-ui-libraries";
import { CSVMap } from "../../Context";
import "./FileuploadModal.scss"

function FileUploadModal() {
    const {openModal,closeModal,fileUploadmodal,fileUploadRef,onFileSelect,onFileUpload} = useContext(CSVMap)
  return (
    <>
      <Dialog
        open={fileUploadmodal.status}
        className="compare-files-dialog aw-dialog appModal"
        PaperComponent={DraggableModal}
        maxWidth={"xs"}
        fullWidth
      >
        <DialogTitle id="draggable-dialog-title">
            <div className="modalHead">

          <Typography variant="h3">CSV upload</Typography>
          <Icon style={{ color: "white" }} onClick={closeModal}>close</Icon>
            </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" className="modalHeading">
            Select File Here
          </Typography>
          <Typography variant="subtitle1" className="subHeading">
            Supported File: CSV
          </Typography>
           <input 
           type="file"
           accept=".csv"
        //    className="fileInput"
           id="fileInput"
           ref={fileUploadRef}
           onChange={onFileSelect}
           required/>
           {/* <label htmlFor="fileInput" className="chooseFileButton">
            Choose File
          </label> */}
          <DialogActions>
            <AlbaButton variant="success" onClick={onFileUpload}>
                Upload
            </AlbaButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FileUploadModal;
