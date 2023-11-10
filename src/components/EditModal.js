import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';

const EditModal = ({ open, data, onCancel, onSave }) => {
  const [editedData, setEditedData] = useState(data);

  const handleFieldChange = (e, fieldName) => {
    setEditedData({ ...editedData, [fieldName]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <div>
      <DialogTitle>Edit Data</DialogTitle>
      </div>
      <DialogContent>
        {Object.keys(editedData).map((fieldName) => (
          <TextField
            key={fieldName}
            label={fieldName}
            value={editedData[fieldName]}
            onChange={(e) => handleFieldChange(e, fieldName)}
            fullWidth
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onSave(editedData);
            onCancel();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
