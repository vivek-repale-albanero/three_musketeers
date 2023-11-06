import React, { useState } from 'react';
import { Button, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import './EditTable.scss';

const EditTable = ({ open, data, onSave, onCancel, isAdding }) => {
  const [editedData, setEditedData] = useState(data);

  const handleSave = () => {
    onSave(editedData);
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setEditedData({ ...editedData, [key]: value });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>{isAdding ? 'Add New Row' : 'Edit Data'}</DialogTitle>
      <DialogContent>
        <div className="edit-fields">
          {Object.keys(editedData).map((key) => (
            <TextField
              key={key}
              label={key}
              variant="outlined"
              fullWidth
              margin="normal"
              value={editedData[key]}
              onChange={(e) => handleInputChange(e, key)}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{backgroundColor: "teal",
            color: "white"}}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTable;
