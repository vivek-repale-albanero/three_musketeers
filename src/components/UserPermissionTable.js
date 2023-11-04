import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, FormGroup, FormControlLabel, Modal } from '@material-ui/core';
import './UserPermission.scss';
import { PermissionContext } from '../Context';

const UserPermission = () => {
  const {
    isPermissionModalOpen,
    handlePermissionCloseFn,
  } = useContext(PermissionContext);

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // local storage
    const user = JSON.parse(localStorage.getItem("useLogedId"));

    if (user && user.Permission) {
      setPermissions(user.Permission);
    }
  }, []);

  const handleMainCheckboxChange = (mainIndex) => {
    setPermissions((prevPermissions) => {
      const newPermissions = [...prevPermissions];
      newPermissions[mainIndex] = {
        ...newPermissions[mainIndex],
        allow: !newPermissions[mainIndex].allow,
      };

      newPermissions[mainIndex].subModules.forEach((nestedModule) => {
        nestedModule.allow = newPermissions[mainIndex].allow;
      });

      return newPermissions;
    });
  };

  const handleNestedCheckboxChange = (mainIndex, nestedIndex) => {
    setPermissions((prevPermissions) => {
      const newPermissions = [...prevPermissions];
      newPermissions[mainIndex].subModules[nestedIndex] = {
        ...newPermissions[mainIndex].subModules[nestedIndex],
        allow: !newPermissions[mainIndex].subModules[nestedIndex].allow,
      };

      newPermissions[mainIndex].allow = newPermissions[mainIndex].subModules.some(nestedModule => nestedModule.allow);

      return newPermissions;
    });
  };

  const handleSaveClick = () => {
    const user = JSON.parse(localStorage.getItem("useLogedId"));
    const updatedUser = { ...user };
    updatedUser.Permission = [...permissions];


    console.log(updatedUser);

    localStorage.setItem("useLogedId", JSON.stringify(updatedUser));
    handlePermissionCloseFn()


  };

  return (
    <Modal open={isPermissionModalOpen} onClose={handlePermissionCloseFn} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <i className="cancel-icon" onClick={handlePermissionCloseFn}>
              &#10005;
            </i>
          </div>
          <div className="modal-title">User Permission</div>
          <div className="user-permission-container">
            {permissions.map((mainPermission, mainIndex) => (
              <div key={mainIndex} className="permission-group">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mainPermission.allow}
                        onChange={() => handleMainCheckboxChange(mainIndex)}
                      />
                    }
                    label={mainPermission.name}
                  />
                </FormGroup>
                <div className="nested-permissions">
                  {mainPermission.subModules.map((nestedPermission, nestedIndex) => (
                    <FormGroup key={nestedIndex}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={nestedPermission.allow}
                            onChange={() => handleNestedCheckboxChange(mainIndex, nestedIndex)}
                          />
                        }
                        label={nestedPermission.name}
                      />
                    </FormGroup>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button className="save-button" onClick={handleSaveClick}>Save Permission</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserPermission;
