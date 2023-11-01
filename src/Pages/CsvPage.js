import React, { useContext } from 'react';
import CsvUploader from '../components/CsvUploader';
import CsvTable from '../components/CsvTable';
import CsvEditButtons from '../components/CsvEditButtons';
import { Button, Typography, Paper } from '@material-ui/core';
import { PermissionContext } from '../Context/PermissionContext';
import './CsvPage.scss'; // Import your SCSS file

const CsvPage = () => {
  const {
    isModalOpen,
    handleOpen,
    handleClose,
    selectedFileName,
    uploading,
    handleFileChange,
    showTableFn,
    showTable,
    availFile,
    isEditing,
    editedData,
    editedFile,
    csvData,
  } = useContext(PermissionContext);

  return (
    <div className="csv-page-container">
      <div className="header">
        <Typography variant="h5">CSV List</Typography>
        <Button
          variant="contained"
          className="add-button"
          onClick={handleOpen}
        >
          Add File
        </Button>
      </div>
      <CsvUploader />
      {showTable && (
        <div className="table-container">
          <CsvTable />
          <CsvEditButtons />
        </div>
      )}
    </div>
  );
};

export default CsvPage;