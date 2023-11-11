import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from '@material-ui/core';
import {
  AlbaButton,
  Paper,
  Box,
} from "@platform/service-ui-libraries";
import "./CsvTable.scss"
import { CSVContext, PermissionContext } from '../Context';
import EditTable from './EditTable';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const CsvTable = () => {
  const { csvData } = useContext(CSVContext);
  const { currentUser,setUnAuthMsg } = useContext(PermissionContext);
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
  // console.log("csvData", Object.keys(csvData[0]))
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

  const EditPermission=()=>{
    if(currentUser.Permission.csvPermission.csvEditPermission){
      return false
    }
  }
  const DownlodPermission=()=>{
    if(currentUser.Permission.csvPermission.csvDownloadPermission){
      return false
    }
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
                          <AlbaButton
                          variant="success"
                          onClick={() => openEditModal(rowIndex)}
                          disabled={EditPermission}
                        >
                          Edit
                        </AlbaButton>
                    )}
                  </TableCell>
                </TableRow>}
              </>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{display:"flex",justifyContent:"flex-end"}}>

        <AlbaButton
            variant="success"
            onClick={openAddModal}
          >
            Add Row
          </AlbaButton>
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
                  <AlbaButton
                  variant="success"
                  onClick={handleDownloadEditedFile}
                  disabled={DownlodPermission}
                >
                  Download Edited File
                </AlbaButton>
        )}
      </Box>
    </>
  );
}

export default CsvTable;
