// PermissionContext.js
import React, { createContext, useEffect, useState } from 'react';

export const userData = [
  { id: 1, user:{userName: "Pritam2000",firstName:"Pritam",lastName:"Halder",},age:"25", email:"user1@gmail.com", password: 'password1', gamePermission: false, csvPermission: false, csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false },
  { id: 2, user:{userName: "Shoaib@1998",firstName:"Shoaib",lastName:"Mansoori"},age:"26", email:"user2@gmail.com", password: 'password2', gamePermission: false, csvPermission: false,csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false  },
  { id: 3, user:{userName: "Eswar@0110",firstName:"Eswar",lastName:"M"},age:"23", email:"user3@gmail.com", password: 'password3', gamePermission: false, csvPermission: false,csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false  },
  { id: 4, user:{userName: "Gopal_R",firstName:"Ram",lastName:"Gopal"},age:"32", email:"user4@gmail.com",  password: 'password4', gamePermission: false, csvPermission: false,csvDownlodPermission: false,startGamePermission:false,resetGamePermission:false  },
  { id: 5, user:{userName: "Abc",firstName:"Abc",lastName:"Def"},age:"46", email:"user5@gmail.com", password: 'password5', gamePermission: false, csvPermission: false,csvDownlodPermission: false ,startGamePermission:false,resetGamePermission:false },
];
export const PermissionContext = createContext();

 const PermissionProvider = ({ children }) => {
  const [users, setUsers] = useState(userData);
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
//data from local storage
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"))
  // console.log(loggedUser)
  const updateUserPermissions = (userId, route, value) => {
    // console.log("loggedUser",loggedUser.id)
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === userId ? { ...user, [`${route}Permission`]: value } : user
      )
    }
    );
  };
  useEffect(() => {
    if (loggedUser) {
      users.map(el => {
        if (el.name === loggedUser.name) {
          setCsvAuth(el.csvPermission)
          setGameAuth(el.gamePermission)
          setDownloadPermission(el.csvDownlodPermission)
          setStartTicTac(el.startGamePermission)
          setResetTicTac(el.resetGamePermission)
        }
      })
    }
  }, [users])
  console.log("users",users)
  
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
console.log("contextr",csvAuth)
  return (
    <PermissionContext.Provider value={{ users, updateUserPermissions, gameAuth, setGameAuth, csvAuth, setCsvAuth,csvData,
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
      setEditedFile,handleOpen,handleFileChange,showTableFn,handleEditClick,handleInputChange,handleSaveClick,handleCancelEdit,handleClose,downloadPermission,startTicTac,resetTicTac}}>
      {children}
    </PermissionContext.Provider>
  );
};
export default PermissionProvider;
