import React, { useContext, useRef } from "react";
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
  DialogActions
} from "@platform/service-ui-libraries";
// import "./CsvUploader.scss";
import { assessCsv } from "../Context";

const CsvModal = () => {
  const {
    uploadModal,
    modalClose,
    onFileChange,
    csvfileInputRef,
    filename,
    uploadErrMsg,
    isUploading,
    onUpload
  } = useContext(assessCsv);
  return (
    <Dialog
      open={uploadModal}
      className="compare-files-dialog aw-dialog appModal"
      PaperComponent={DraggableModal}
      maxWidth={"xs"}
      fullWidth
    >
        <DialogTitle id="draggable-dialog-title">
      <div className="csv-modal-head">
          <Typography variant="h3">CSV Uploader</Typography>
          <Icon style={{ color: "white" }} onClick={modalClose}>
            close
          </Icon>
      </div>
        </DialogTitle>
      <DialogContent>
        <div className="upload-file-content">
          <Typography variant="h6" className="modalHeading">
            Select File Here
          </Typography>
          <Typography variant="subtitle1" className="subHeading">
            Supported File: CSV
            
          </Typography>
          <br />
          <input
            type="file"
            accept=".csv"
            onChange={onFileChange}
            className="fileInput"
            id="fileInput"
            ref={csvfileInputRef}
            required
          />
          <label htmlFor="fileInput" className="chooseFileButton">
            Choose File
          </label>
          {uploadErrMsg && <div style={{ color: 'red' }}>{uploadErrMsg}</div>}
        </div>
        <br />
        {filename && (
          <Typography variant="subtitle1" className="selectedFileName">
            Selected File: {filename}
          </Typography>
        )}
          </DialogContent>
          <DialogActions>
        <div className="upload-btn-box">
          <AlbaButton
            variant="success"
            onClick={onUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </AlbaButton>
        </div>
        </DialogActions>
    </Dialog>
  );
};

export default CsvModal;
