import React, { useContext } from 'react';
import { Table, TableBody, TableRow, TableCell, TextField } from '@material-ui/core';
import { PermissionContext } from '../Context/PermissionContext';
import './CsvTable.scss'; // Import your SCSS file

const CsvTable = () => {
  const {
    csvData,
    editedData,
    isEditing,
    handleInputChange,
  } = useContext(PermissionContext);

  return (
    <div className="csvTableContainer">
      <Table>
        <TableBody>
          {csvData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.keys(row).map((columnName) => (
                <TableCell key={columnName}>
                  {isEditing ? (
                    <TextField
                      value={editedData[rowIndex][columnName] || ''}
                      onChange={(e) => handleInputChange(e, rowIndex, columnName)}
                    />
                  ) : (
                    row[columnName]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CsvTable;