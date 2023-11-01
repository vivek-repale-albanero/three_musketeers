// PermissionContext.js
import React, { createContext, useEffect, useState } from 'react';

export const userData = [
  { id: 1, name: 'User 1', password: 'password1', gamePermission: false, csvPermission: false, csvDownloadPermission: false, startGamePermission: false, resetGamePermission: false },
  { id: 2, name: 'User 2', password: 'password2', gamePermission: false, csvPermission: false, csvDownloadPermission: false, startGamePermission: false, resetGamePermission: false },
  // Add more users as needed
];

export const PermissionContext = createContext();

const PermissionProvider = ({ children }) => {
  const [users, setUsers] = useState(userData);
  const [gameAuth, setGameAuth] = useState(false);
  const [csvAuth, setCsvAuth] = useState(false);
  const [downloadPermission, setDownloadPermission] = useState(false);
  const [startTicTac, setStartTicTac] = useState(false);
  const [resetTicTac, setResetTicTac] = useState(false);

  const [csvData, setCsvData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [availFile, setAvailFile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const [editedFile, setEditedFile] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));
    if (loggedUser) {
      users.forEach(user => {
        if (user.name === loggedUser.name) {
          setCsvAuth(user.csvPermission);
          setGameAuth(user.gamePermission);
          setDownloadPermission(user.csvDownloadPermission);
          setStartTicTac(user.startGamePermission);
          setResetTicTac(user.resetGamePermission);
        }
      });
    }
  }, [users]);

  const updateUserPermissions = (userId, route, value) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === userId ? { ...user, [`${route}Permission`]: value } : user
      )
    });
  };

  // CSV handling functions (add your logic here)

  return (
    <PermissionContext.Provider value={{
      users,
      updateUserPermissions,
      gameAuth,
      setGameAuth,
      csvAuth,
      setCsvAuth,
      csvData,
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
      downloadPermission,
      startTicTac,
      resetTicTac,
    }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
