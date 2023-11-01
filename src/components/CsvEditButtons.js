import React, { useContext } from 'react';
import { Button, Icon } from '@material-ui/core';
import { PermissionContext } from '../Context/PermissionContext';
import './CsvEditButtons.scss'; // Import your SCSS file

const CsvEditButtons = () => {
  const {
    isEditing,
    handleEditClick,
    handleCancelEdit,
    handleSaveClick,
    editedFile,
    downloadPermission,
  } = useContext(PermissionContext);

  return (
    <div className="csv-edit-buttons-container">
      {isEditing ? (
        <div>
          <Button
            variant="contained"
            className="cancel-button"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="save-button"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          className="edit-button"
          onClick={handleEditClick}
        >
          Edit
        </Button>
      )}
      {editedFile && (
        <a href={editedFile} download="edited.csv">
          <Button
            variant="contained"
            className="download-button"
          >
            Download Edited File
          </Button>
        </a>
      )}
    </div>
  );
};

export default CsvEditButtons;
