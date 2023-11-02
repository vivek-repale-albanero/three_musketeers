import React, { useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel, Box } from '@material-ui/core';
import './UserPermission.scss'; // Import your SCSS file

const UserPermission = () => {
  const [permissions, setPermissions] = useState({
    csvPermission: {
      label: 'CSV Permission',
      checked: false,
      nested: {
        csvPagePermission: { label: 'CSV Page Permission', checked: false },
        csvEditPermission: { label: 'CSV Edit Permission', checked: false },
        csvDownloadPermission: { label: 'CSV Download Permission', checked: false },
      },
    },
    gamePermission: {
      label: 'Game Permission',
      checked: false,
      nested: {
        gamePagePermission: { label: 'Game Page Permission', checked: false },
        gameStartPermission: { label: 'Game Start Permission', checked: false },
        gameResetPermission: { label: 'Game Reset Permission', checked: false },
      },
    },
    missing: {
      label: 'Missing',
      checked: false,
      nested: {},
    },
  });

  const handleMainCheckboxChange = (mainKey) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[mainKey].checked = !newPermissions[mainKey].checked;

      // Update nested checkboxes
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

      // Check if all nested checkboxes are checked
      const allNestedChecked = Object.values(newPermissions[mainKey].nested).every((nested) => nested.checked);

      // Update the main checkbox
      newPermissions[mainKey].checked = allNestedChecked;

      return newPermissions;
    });
  };

  return (
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
  );
};

export default UserPermission;
