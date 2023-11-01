import React, { useContext } from 'react';
import { Button, Typography, Paper, Modal, IconButton,Icon } from '@material-ui/core';
import { PermissionContext } from '../Context/PermissionContext';
import './CsvUploader.scss';

const CsvUploader = () => {
  const {
    isModalOpen,
    handleOpen,
    handleClose,
    selectedFileName,
    uploading,
    handleFileChange,
    showTableFn,
  } = useContext(PermissionContext);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper className="modalContainer">
        <div className="modalTitleContainer">
          <Typography variant="h6" className="modalHeading">
            CSV Uploader
          </Typography>
          <IconButton className="closeIcon" onClick={handleClose}>
            <Icon>
              close
            </Icon>
          </IconButton>
        </div>
        <div className="dottedBorder">
          <Typography variant="h6" className="modalHeading">
            Select File Here
          </Typography>
          <Typography variant="subtitle1" className="subHeading">
            Supported File: CSV
          </Typography>
          <br/>
          <input type="file" accept=".csv" onChange={handleFileChange} className="fileInput" id="fileInput" />
          <label htmlFor="fileInput" className="chooseFileButton">
            Choose File
          </label>
        </div>
        <br/>
        {selectedFileName && (
          <Typography variant="subtitle1" className="selectedFileName">
            Selected File: {selectedFileName}
          </Typography>
        )}
        <div className="buttonContainer">
          <label

            className="uploadButton"
            onClick={showTableFn}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </label>
        </div>
      </Paper>
    </Modal>
  );
};

export default CsvUploader;
