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
import "./CsvUploader.scss";
import { CSVContext } from "../Context";

const CsvUploader = () => {
  const {
    isModalOpen,
    handleClose,
    handleFileChange,
    selectedFileName,
    showTableFn,
    errorMessageForCsvUploder,
    uploading,
    csvfileInputRef
  } = useContext(CSVContext);
  return (
    <Dialog
      open={isModalOpen}
      className="compare-files-dialog aw-dialog appModal"
      PaperComponent={DraggableModal}
      maxWidth={"xs"}
      fullWidth
    >
        <DialogTitle id="draggable-dialog-title">
      <div className="csv-modal-head">
          <Typography variant="h3">CSV Uploader</Typography>
          <Icon style={{ color: "white" }} onClick={handleClose}>
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
            onChange={handleFileChange}
            className="fileInput"
            id="fileInput"
            ref={csvfileInputRef}
            required
          />
          <label htmlFor="fileInput" className="chooseFileButton">
            Choose File
          </label>
          {errorMessageForCsvUploder && <div style={{ color: 'red' }}>{errorMessageForCsvUploder}</div>}
        </div>
        <br />
        {selectedFileName && (
          <Typography variant="subtitle1" className="selectedFileName">
            Selected File: {selectedFileName}
          </Typography>
        )}
          </DialogContent>
          <DialogActions>
        <div className="upload-btn-box">
          <AlbaButton
            variant="success"
            onClick={showTableFn}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </AlbaButton>
        </div>
        </DialogActions>
    </Dialog>
  );
};

export default CsvUploader;
