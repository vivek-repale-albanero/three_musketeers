import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TableHead,
  Box,
} from '@material-ui/core';
import "./CsvTable.scss"
import { CSVContext } from '../Context';
import EditTable from './EditTable';

const CsvTable = () => {
  const { csvData } = useContext(CSVContext);
  const [csvFormModal, setCsvFormModal] = useState({
    status: false,
    edit: false,
    data: {}
  })
  const closeCsvModal = () => {
    setCsvFormModal({
      ...csvFormModal,
      status: false,
      edit: false,
      data: {}
    })
  }
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [newRowData, setNewRowData] = useState({});

  const [csvDataState, setCsvDataState] = useState(csvData);
  console.log("csvData", Object.keys(csvData[0]))
  const [showDownload, setShowDownload] = useState(false);

  // set new rowData
  useEffect(() => {
    setRowFn()
  }, [])
  const setRowFn = () => {
    let obj = {}
    Object.keys(csvData[0]).forEach(el => { obj[el] = "" })
    setNewRowData(obj)
  }

  const openEditModal = (rowIndex) => {
    setCsvFormModal({
      ...csvFormModal,
      status: true,
      edit: true,
      data: csvDataState[rowIndex]
    })
    setEditedRowIndex(rowIndex);
  };

  const openAddModal = () => {
    setCsvFormModal({
      ...csvFormModal,
      status: true,
      edit: false,
      data: newRowData
    })
  };

  const saveData = (newData, isAdding) => {
    if (isAdding) {
      const updatedData = [...csvDataState];
      updatedData.push(newData);
      setCsvDataState(updatedData);
    } else {
      const updatedData = [...csvDataState];
      updatedData[editedRowIndex] = newData;
      setCsvDataState(updatedData);
    }

    setShowDownload(true);

    // Close the modal
    if (isAdding) {
      closeCsvModal();
    };
  }
  const handleDownloadEditedFile = () => {
    // Create a CSV file with the updated data
    const csvContent = "data:text/csv;charset=utf-8," + csvDataState.map(row => Object.values(row).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "edited_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <TableContainer maxWidth="100%" className='table' component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {csvDataState.map((row, rowIndex) => (

                Object.values(row).map((value, columnIndex) => { return rowIndex === 0 && <TableCell key={columnIndex}>{value}</TableCell> })

              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {csvDataState.map((row, rowIndex) => {
              return <>
                {rowIndex !== 0 && <TableRow key={rowIndex}>
                  {rowIndex !== 0 && Object.values(row).map((value, columnIndex) => (
                    <TableCell key={columnIndex}>{value}</TableCell>
                  ))}
                  <TableCell>
                    {rowIndex !== 0 && (
                      <Button
                        variant="contained"
                        className="edit-button"
                        style={{ backgroundColor: "teal", color: "white" }}
                        onClick={() => openEditModal(rowIndex)}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>}
              </>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{display:"flex",justifyContent:"flex-end"}}>

        <Button
          variant="contained"
          className="add-row-button"
          style={{ backgroundColor: "teal", color: "white", marginRight: "10px", margin: "10px" }}
          onClick={openAddModal}
        >
          Add Row
        </Button>
        {csvFormModal.status && csvFormModal.edit && (
          <EditTable
            open={csvFormModal.status && csvFormModal.edit}
            data={csvFormModal.data}
            onSave={(newData) => saveData(newData, false)}
            onCancel={closeCsvModal}
            isAdding={false}
          />
        )}

        {csvFormModal.status && (!csvFormModal.edit) && (
          <EditTable
            open={csvFormModal.status}
            data={csvFormModal.data}
            onSave={(newData) => saveData(newData, true)}
            onCancel={closeCsvModal}
            isAdding={true}
          />
        )}

        {showDownload && (
          <Button
            variant="contained"
            className="download-button"
            style={{ backgroundColor: "teal", color: "white", marginRight: "10px", margin: "10px"  }}
            onClick={handleDownloadEditedFile}
          >
            Download Edited File
          </Button>
        )}
      </Box>
    </>
  );
}

export default CsvTable;
