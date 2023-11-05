import React, { useContext, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Container,
  TableRow,
  Paper,
  Button,
  TableFooter,
} from '@material-ui/core';
import EditableRow from './EditableRow';
import "./CsvTable.scss"
import { CSVContext } from '../Context';
const CsvTable = () => {
  const { csvData,editRowIndex,showDownloadButton,handleEditClick,handleCancelEdit,handleSaveClick,handleDownloadClick } = useContext(
    CSVContext)

  return (
    <TableContainer maxWidth="100%" component={Paper}>
      <Table>
        <TableBody>
          {csvData.map((row, rowIndex) => (
            rowIndex === editRowIndex ? (
              <EditableRow
                key={rowIndex}
                data={row}
                onSave={(rowData) => handleSaveClick(rowData)}
                onCancel={handleCancelEdit}
              />
            ) : (
              <TableRow key={rowIndex}>
                {Object.values(row).map((value, columnIndex) => (
                  <TableCell key={columnIndex}>{value}</TableCell>
                ))}
                <TableCell>
                  <Button
                  variant="contained"
                    className="edit-button"
                    style={{backgroundColor:"teal",color:"white"}}
                    onClick={() => handleEditClick(rowIndex)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={csvData[0] && Array.isArray(csvData[0]) ? csvData[0].length + 1 : 1}>
              {showDownloadButton && (
                <Button
                  variant="contained"
                  className="download-button"
                  style={{backgroundColor:"teal",color:"white"}}
                  onClick={handleDownloadClick}
                >
                  Download Edited File
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
              }
  

export default CsvTable;