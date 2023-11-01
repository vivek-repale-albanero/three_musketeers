import React, { useContext } from 'react';
import { Button,styled, Typography, Paper, Modal } from '@material-ui/core';
// import { styled } from '@mui/system';
import { PermissionContext } from '../Context/PermissionContext';

const ModalButtons = styled('div')({
  marginTop: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const ModalContainer = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  padding: '50px',
  bgcolor: 'white',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const UploadButton = styled(Button)({
  width: '45%',
  backgroundColor: 'rgb(21 22 22)',
  color: 'rgb(224 224 224)',
  '&:hover': {
    color: '#00bbd1',
    backgroundColor: '#191919',
  },
});

const CancelButton = styled(Button)({
  width: '45%',
  backgroundColor: 'rgb(21 22 22)',
  color: 'rgb(224 224 224)',
  '&:hover': {
    color: '#00bbd1',
    backgroundColor: '#191919',
  },
});

const FileInput = styled('input')({
  display: 'none',
});

const CsvUploader = () => {
  const {
    isModalOpen,
    handleOpen,
    handleClose,
    selectedFileName,
    uploading,
    handleFileChange,
    showTableFn,
    availFile,
  } = useContext(PermissionContext);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>
        <Typography variant="h6" gutterBottom>
          Upload a CSV File
        </Typography>
        {selectedFileName && (
          <Typography variant="subtitle1" style={{ marginBottom: '16px' }}>
            Selected File: {selectedFileName}
          </Typography>
        )}
        <FileInput type="file" accept=".csv" onChange={handleFileChange} id="fileInput" />
        <label htmlFor="fileInput">
          <Button variant="contained" component="span" style={{color:"rgb(224 224 224)",background:'rgb(21 22 22)'}}>
            Choose File
          </Button>
        </label>
        <ModalButtons>
          <CancelButton variant="contained" onClick={handleClose}>
            Cancel
          </CancelButton>
          <UploadButton variant="contained" color="primary" onClick={showTableFn} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </UploadButton>
        </ModalButtons>
      </ModalContainer>
    </Modal>
  );
};

export default CsvUploader;
