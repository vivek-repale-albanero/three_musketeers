import React, { useMemo, useState, useEffect } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import CsvPage from "./Pages/CsvPage";
import PermissionPage from "./Pages/PermissionPage";
import "../src/styles/overrides.scss";
import "../src/styles/styles.scss"
import LoginPage from "./Pages/LoginPage/LoginPage";
import UsersPage from "./Pages/UsersPage/UsersPage";
import GamePageRedirect from "./Pages/GamePageRedirect";
import TicTacPage from "./Pages/TicTacToe";
import { PermissionContext } from "./Context";




export default function Root() {
  const [users, setUsers] = useState([]);
  // //permission
    const [gameAuth, setGameAuth] = useState(false);
  //   const [csvAuth, setCsvAuth] = useState(false);
  //   const [downloadPermission,setDownloadPermission]=useState(false)
  //   const [startTicTac,setStartTicTac]=useState(false)
  //   const [resetTicTac,setResetTicTac]=useState(false)
  //   //csv states
  //   const [csvData, setCsvData] = useState([]);
  //   const [selectedFileName, setSelectedFileName] = useState('');
  //   const [uploading, setUploading] = useState(false);
    const [showTable, setShowTable] = useState(false);
  //   const [availFile, setAvailFile] = useState('');
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [editedData, setEditedData] = useState([]);
  //   const [editedFile, setEditedFile] = useState(null);
  
  
  
  //   const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    
  // //get user data
  useEffect(() => {
    // Make a GET request to fetch user data
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched user data
        setUsers(data);
      })
      .catch((error) => {

        // Handle network or other errors here
        console.error('Error:', error);
      });
  }, []);
  
  // //data from local storage
  //   const loggedUser = JSON.parse(localStorage.getItem("useLogedId"))
  //   // console.log("users",users)
  
  // fetch('http://localhost:3000/users')
  // .then((res) => res.json())
  // .then((data) => {
  //   // Update the state with the fetched user data
  //   console.log(data);
  // })
  // .catch((error) => {
  //   // Handle network or other errors here
  //   console.error('Error:', error);
  // });
  
  
  
  
  //   //permission
  //   const handlePermissionModalOpen = () => {
  //     setIsPermissionModalOpen(true);
  //   };
  
  //   const handlePermissionCloseFn = () => {
  //     setIsPermissionModalOpen(false);
  //   };
  //  //function for csv

  // const handleClose = () => {
  //   setIsModalOpen(false);
  // };
  // const handleFileChange = (e) => {
  //   setShowTable(false);
  //   const file = e.target.files[0];
  //   if (file) {
  //     setAvailFile(file);
  //     setSelectedFileName(file.name);
  //     setUploading(true);
  
  //     const reader = new FileReader();
  
  //     reader.onload = function (event) {
  //       const csvContent = event.target.result;
  //       processData(csvContent);
  //       setUploading(false);
  //     };
  
  //     reader.readAsText(file);
  //   }
  // };
  
  // const processData = (csvContent) => {
  //   const lines = csvContent.split("\n");
  //   const headers = lines[0].split(",");
  
  //   const data = [];
  //   for (let i = 0; i < lines.length; i++) {
  //     const values = lines[i].split(",");
  //     const entry = {};
  //     for (let j = 0; j < headers.length; j++) {
  //       entry[headers[j]] = values[j];
  //     }
  //     data.push(entry);
  //   }
  
  //   // Remove the first entry if it's empty (often caused by an extra newline at the end of the file)
  //   if (Object.keys(data[0]).length === 1 && data[0].hasOwnProperty("")) {
  //     data.shift();
  //   }
  
  //   setCsvData(data);
  //   setEditedData(data);
  // };
  
  
  
  // const showTableFn = () => {
  //   if (availFile) {
  //     setShowTable(true);
  //     setIsModalOpen(false);
  //   } else {
  //     alert('Please choose a file before uploading.');
  //     setSelectedFileName('');
  //   }
  // };
  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };
  // const handleSaveClick = () => {
  //   setIsEditing(false);
  //   setEditedFile(createEditedFile());
  // };
  // const handleCancelEdit = () => {
  //   setIsEditing(false);
  //   // Revert editedData to its original state (csvData)
  //   setEditedData([...csvData]);
  // };
  // const handleInputChange = (e, rowIndex, columnName) => {
  //   const updatedData = [...editedData];
  //   updatedData[rowIndex][columnName] = e.target.value;
  //   setEditedData(updatedData);
  // };
  // const createEditedFile = () => {
  //   const header = Object.keys(editedData[0]).join(',') + '\n';
  //   const rows = editedData.map((row) =>
  //     Object.values(row)
  //       .map((value) => (isNaN(value) ? `"${value}"` : value))
  //       .join(',')
  //   );
  //   const csv = header + rows.join('\n');
  //   const csvBlob = new Blob([csv], { type: 'text/csv' });
  //   return URL.createObjectURL(csvBlob);
  // };

  const permission = useMemo(() => {
    return {users,gameAuth,setUsers}
  }, [users])
// console.log(users)
// console.log("ok")
  return (
    <BrowserRouter>
    <PermissionContext.Provider  value={permission}>

      <CssBaseline />
      <React.Suspense>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth/login" />
          </Route>

          <Route exact path="/csv" render={() => 
          // <PrivateCsvEditRoute>
          
          <CsvPage />
          //  {/* </PrivateCsvEditRoute> */}
        } 
        />
          <Route exact path="/authorization" render={()=>(<PermissionPage />)}/>
          
          <Route exact path="/auth/login" render={() => <LoginPage />} />
          <Route exact path="/users" render={()=> <UsersPage/>}/>
          <Route exact path="/gameredirect" render={()=> <GamePageRedirect/>} />
          <Route exact path="/game" render={()=> <TicTacPage/>} />
         

        </Switch>
      </React.Suspense>
        </PermissionContext.Provider>
    </BrowserRouter>
  );
}
