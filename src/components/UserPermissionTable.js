import React, { useContext, useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel, Modal } from '@material-ui/core';
import { PermissionContext } from '../Context/PermissionContext';
import './UserPermission.scss';

const user = JSON.parse(localStorage.getItem("useLogedId"));

const UserPermission = () => {
  const {
    isPermissionModalOpen,
    handlePermissionCloseFn,
  } = useContext(PermissionContext);

  const [permissions, setPermissions] = useState({
    csvPermission: {
      label: 'CSV Permission',
      checked: false,
      nested: {
        csvPagePermission: { label: 'CSV Page Permission', value: "csvpage", checked: false },
        csvEditPermission: { label: 'CSV Edit Permission', value: "csvedit", checked: false },
        csvDownloadPermission: { label: 'CSV Download Permission', value: "csvdownload", checked: false },
      },
    },
    gamePermission: {
      label: 'Game Permission',
      checked: false,
      nested: {
        gamePagePermission: { label: 'Game Page Permission', value: "gamepage", checked: false },
        gameStartPermission: { label: 'Game Start Permission', value: "gamestart", checked: false },
        gameResetPermission: { label: 'Game Reset Permission', value: "gamereset", checked: false },
      },
    },
    missing: {
      label: 'Missing',
      checked: false,
      value: "missing",
      nested: {},
    },
  });

  const handleMainCheckboxChange = (mainKey) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[mainKey].checked = !newPermissions[mainKey].checked;

      for (const nestedKey in newPermissions[mainKey].nested) {
        newPermissions[mainKey].nested[nestedKey].checked = newPermissions[mainKey].checked;
      }

      return newPermissions;
    });
  };

  const handleNestedCheckboxChange = (mainKey, nestedKey) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[mainKey].nested[nestedKey].checked = !newPermissions[mainKey].nested[nestedKey].checked;
  
      const atLeastOneNestedChecked = Object.values(newPermissions[mainKey].nested).some((nested) => nested.checked);
  
      newPermissions[mainKey].checked = atLeastOneNestedChecked;
  
      return newPermissions;
    });
  };
  

  const handleSaveClick = () => {
    const checkedPermissions = [];

    for (const mainKey in permissions) {
      if (permissions[mainKey].checked) {
        checkedPermissions.push(mainKey);
      } else {
        for (const nestedKey in permissions[mainKey].nested) {
          if (permissions[mainKey].nested[nestedKey].checked) {
            checkedPermissions.push(permissions[mainKey].nested[nestedKey].value);
          }
        }
      }
    }

    user.permission = checkedPermissions;
    localStorage.setItem("useLogedId", JSON.stringify(user));
    // Add your fetch request here to update the user permissions on the server.
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
            {Object.entries(permissions).map(([mainKey, mainPermission]) => (
              <div key={mainKey} className="permission-group">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mainPermission.checked}
                        onChange={() => handleMainCheckboxChange(mainKey)}
                      />
                    }
                    label={mainPermission.label}
                  />
                </FormGroup>
                <div className="nested-permissions">
                  {Object.entries(mainPermission.nested).map(([nestedKey, nestedPermission]) => (
                    <FormGroup key={nestedKey}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={nestedPermission.checked}
                            onChange={() => handleNestedCheckboxChange(mainKey, nestedKey)}
                          />
                        }
                        label={nestedPermission.label}
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
