import React, { useContext, useEffect, useMemo, useState } from 'react';
import "./CsvPage.scss"
import { CSVContext, PermissionContext } from '../Context';
import csv1 from "../assests/csv1.png"
import csv2 from "../assests/csv2.png"
import csv3 from "../assests/csv3.png"
import csv4 from "../assests/csv4.png"
import {
  Button,
  Typography,
  Paper,
  Modal,
  IconButton,
  Icon,
  makeStyles
} from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CsvUploader from "../components/CsvUploader"
import CsvTable from '../components/CsvTable';
import Layout from "../Layout/Layout"
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Container, Card, CardContent } from '@material-ui/core';


const CsvPage = () => {
  const {setUnAuthMsg}=useContext(PermissionContext)
  let history = useHistory();
  const [csvData, setCsvData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [availFile, setAvailFile] = useState('');
  const [editedData, setEditedData] = useState([]);
  const [editedFile, setEditedFile] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const { currentUser } = useContext(PermissionContext);
  
  
  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleFileChange = (e) => {
    setShowTable(false);
    const file = e.target.files[0];
    if (file) {
      setAvailFile(file);
      setSelectedFileName(file.name);
      setUploading(true);

      const reader = new FileReader();

      reader.onload = function (event) {
        const csvContent = event.target.result;
        processData(csvContent);
        setUploading(false);
      };

      reader.readAsText(file);
    }
  };
  const showTableFn = () => {
    if (availFile) {
      setShowTable(true);
      setIsModalOpen(false);
    } else {
      alert('Please choose a file before uploading.');
      setSelectedFileName('');
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const processData = (csvContent) => {
    const lines = csvContent.split("\n");
    const headers = lines[0].split(",");

    const data = [];
    for (let i = 0; i < lines.length; i++) {
      const values = lines[i].split(",");
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      data.push(entry);
    }

    if (Object.keys(data[0]).length === 1 && data[0].hasOwnProperty("")) {
      data.shift();
    }

    setCsvData(data);
    setEditedData(data);
  };
  const createEditedFile = (data) => {
    const rows = data.map((row) =>
      Object.values(row)
        .map((value) => (value))
        .join(',')
    );
    const csv = rows.join('\n');
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    // console.log(csv)
    return URL.createObjectURL(csvBlob);
  };

  const handleEditClick = (rowIndex) => {
    if (!currentUser.Permission.csvPermission.subModules.csvEditPermission) {
      setUnAuthMsg("Please Athorize for Edit CsvPermission")
      history.push("/unauth");
    }
    setShowDownloadButton(false)
    setEditRowIndex(rowIndex);
  };

  const handleCancelEdit = () => {
    if (editedFile) {
      setShowDownloadButton(true)
    }
    setEditRowIndex(-1);
  };

  const handleSaveClick = (rowData) => {
    const updatedData = [...editedData];
    updatedData[editRowIndex] = rowData;

    if (updatedData[editRowIndex].length < csvData[0].length) {
      const diff = csvData[0].length - updatedData[editRowIndex].length;
      for (let i = 0; i < diff; i++) {
        updatedData[editRowIndex].push('');
      }
    } else if (updatedData[editRowIndex].length > csvData[0].length) {
      updatedData[editRowIndex] = updatedData[editRowIndex].slice(0, csvData[0].length);
    }
    // console.log("updatedData",updatedData)
    setCsvData(updatedData);
    setEditedData(updatedData);
    setEditedFile(createEditedFile(updatedData));
    setEditRowIndex(-1);
    setShowDownloadButton(true);
    handleCancelEdit()
  };

  // console.log("editedFile",editedFile)

  const handleDownloadClick = () => {
    if (!currentUser.Permission.csvPermission.subModules.csvDownloadPermission) {

      setUnAuthMsg("Please Athorize for Download CsvPermission")
      return (<Redirect to="/unauth" />)
    }
    if (editedFile) {
      const a = document.createElement('a');
      a.href = editedFile;
      a.download = 'edited.csv';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  const csv = useMemo(() => {
    return { isModalOpen, handleFileChange, showTableFn, handleClose, selectedFileName, uploading, availFile, csvData, editedData, setCsvData, setEditedData, setEditedFile, editedFile, editRowIndex, setEditRowIndex, showDownloadButton, setShowDownloadButton, createEditedFile, handleEditClick, handleCancelEdit, handleSaveClick, handleDownloadClick }
  }, [isModalOpen, handleFileChange, showTableFn, handleClose, selectedFileName, uploading, availFile, csvData, editedData, setCsvData, setEditedData, setEditedFile, editedFile, editRowIndex, setEditRowIndex, showDownloadButton, setShowDownloadButton, , createEditedFile, handleEditClick, handleCancelEdit, handleSaveClick, handleDownloadClick])
  return (
    <Layout>
      <CSVContext.Provider value={csv}>
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
          {showTable ?
            <div className="table-container">
              <CsvTable />
            </div>
            : <>
                <div className="hero-content">
                <Card className="upload-container">
                <CardContent>
                  <Typography variant="h5">Welcome to CSV Analyzer</Typography>
                  <Typography variant="body1">Analyze your CSV files with ease</Typography>
                  <Typography variant="h6" style={{color:"#f50057"}}>Please Upload A cSV File</Typography>
                  </CardContent>
                  </Card>
                </div>
                <div className="hero-section">
  <Carousel showThumbs={false} showArrows={true} centerMode={true} centerSlidePercentage={33.33} infiniteLoop={true} autoPlay={true}
    stopOnHover={true} swipeable={true}
    interval={1000}>
    <div className="carousel-item">
      <img src={csv1} alt="Sample Image 1" />
    </div>
    <div className="carousel-item">
      <img src={csv2} alt="Sample Image 2" />
    </div>
    <div className="carousel-item">
      <img src={csv3} alt="Sample Image 3" />
    </div>
    <div className="carousel-item">
      <img src={csv4} alt="Sample Image 4" />
    </div>
    {/* Add more images as needed */}
  </Carousel>
</div>
              <Card className="upload-container">
                <CardContent >
                  <Typography variant="h5">Upload CSV</Typography>
                  <Typography variant="body2">Upload a CSV file to view its contents in a table.</Typography>
                  <Typography variant="body2">Supported file formats: .csv</Typography>
                </CardContent>
              </Card>
            </>
          }
        </div>
      </CSVContext.Provider>
    </Layout>
  );
};

export default CsvPage;
