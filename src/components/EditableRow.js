import React, { useState } from 'react';
import { TableRow, TableCell, Button, Input } from '@material-ui/core';

const EditableRow = ({ data, onSave, onCancel }) => {
  const [rowData, setRowData] = useState({ ...data });

  const handleInputChange = (e, columnName) => {
    setRowData({ ...rowData, [columnName]: e.target.value });
  };

  return (
    <TableRow>
      {Object.keys(rowData).map((column) => (
        <TableCell key={column}>
          <Input
            value={rowData[column]}
            onChange={(e) => handleInputChange(e, column)}
          />
        </TableCell>
      ))}
      <TableCell style={{display:"flex",gap:"2px"}}>
        <Button
          variant="contained"
          style={{backgroundColor:"teal",color:"white"}}
          onClick={() => onSave(rowData)}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
