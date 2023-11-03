// PermissionContext.js
import React, { createContext, useEffect, useState } from 'react';

export const PermissionContext = createContext();

 const PermissionProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
//permission
  const [gameAuth, setGameAuth] = useState(false);
  const [csvAuth, setCsvAuth] = useState(false);
  const [downloadPermission,setDownloadPermission]=useState(false)
  const [startTicTac,setStartTicTac]=useState(false)
  const [resetTicTac,setResetTicTac]=useState(false)
  //csv states
  const [csvData, setCsvData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [availFile, setAvailFile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [editedFile, setEditedFile] = useState(null);



  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  
//get user data
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

//data from local storage
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"))

  // console.log(loggedUser)
  const updateUserPermissions = (userId, route, value) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === userId ? { ...user, [`${route}Permission`]: value } : user
      );
    });
  };

  useEffect(() => {
    if (loggedUser) {
      if(loggedUser.permission.includes("csvpage")){
        setCsvAuth(true);
      }
          // setGameAuth(el.gamePermission);
          // setDownloadPermission(el.csvDownlodPermission);
          // setStartTicTac(el.startGamePermission);
          // setResetTicTac(el.resetGamePermission);
          
    }
  }, [users]);
  // console.log("users",users)






  //permission
  const handlePermissionModalOpen = () => {
    setIsPermissionModalOpen(true);
  };

  const handlePermissionCloseFn = () => {
    setIsPermissionModalOpen(false);
  };
 //function for csv
 const handleOpen = () => {
  setIsModalOpen(true);
};
const handleClose = () => {
  setIsModalOpen(false);
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

  // Remove the first entry if it's empty (often caused by an extra newline at the end of the file)
  if (Object.keys(data[0]).length === 1 && data[0].hasOwnProperty("")) {
    data.shift();
  }

  setCsvData(data);
  setEditedData(data);
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
const handleEditClick = () => {
  setIsEditing(true);
};
const handleSaveClick = () => {
  setIsEditing(false);
  setEditedFile(createEditedFile());
};
const handleCancelEdit = () => {
  setIsEditing(false);
  // Revert editedData to its original state (csvData)
  setEditedData([...csvData]);
};
const handleInputChange = (e, rowIndex, columnName) => {
  const updatedData = [...editedData];
  updatedData[rowIndex][columnName] = e.target.value;
  setEditedData(updatedData);
};
const createEditedFile = () => {
  const header = Object.keys(editedData[0]).join(',') + '\n';
  const rows = editedData.map((row) =>
    Object.values(row)
      .map((value) => (isNaN(value) ? `"${value}"` : value))
      .join(',')
  );
  const csv = header + rows.join('\n');
  const csvBlob = new Blob([csv], { type: 'text/csv' });
  return URL.createObjectURL(csvBlob);
};
  return (
    <PermissionContext.Provider value={{ users,setUsers, updateUserPermissions, gameAuth, setGameAuth, csvAuth, setCsvAuth,csvData,
      setCsvData,
  
      isModalOpen,
      setIsModalOpen,
      selectedFileName,
      setSelectedFileName,
      uploading,
      setUploading,
      showTable,
      setShowTable,
      availFile,
      setAvailFile,
      isEditing,
      setIsEditing,
      editedData,
      setEditedData,
      editedFile,
      setEditedFile,
      handleOpen,
      handlePermissionModalOpen,
      handlePermissionCloseFn,
      handleFileChange,
      showTableFn,
      handleEditClick,
      handleInputChange,
      isPermissionModalOpen,
      handleSaveClick,
      handleCancelEdit,
      handleClose,
      downloadPermission,
      startTicTac,
      resetTicTac
    }}>
      {children}
    </PermissionContext.Provider>
  );
};
export default PermissionProvider;
