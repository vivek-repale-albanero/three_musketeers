import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, FormGroup, FormControlLabel, Link } from '@material-ui/core';
import './PermissionPage.scss';
import { PermissionContext } from '../Context';
import Layout from '../Layout/Layout';
import axios from "axios"
const PermissionPage = () => {
  const [permissions, setPermissions] = useState({});


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("useLogedId"));
    //use local storage
    if (user && user.Permission) {
      const initialPermissions = { ...permissions };


      for (const key in user.Permission) {
        initialPermissions[key] = {
          label: key,
          checked: user.Permission[key].allow,
          nested: {},
        };


        for (const nestedKey in user.Permission[key].subModules) {
          initialPermissions[key].nested[nestedKey] = {
            label: nestedKey,
            checked: user.Permission[key].subModules[nestedKey],
          };
        }
      }


      setPermissions(initialPermissions);
    }
    //from db uses of db
    // else {
    // axios.get(`http://localhost:3000/users/${user.id}`)
    // .then((response) => {
    // const userFromDatabase = response.data;


    // // Update the permissions state with data from the database
    // const updatedPermissions = { ...permissions };


    // for (const key in userFromDatabase.Permission) {
    // if (updatedPermissions[key]) {
    // updatedPermissions[key].checked = userFromDatabase.Permission[key].allow;


    // for (const nestedKey in userFromDatabase.Permission[key].subModules) {
    // if (updatedPermissions[key].nested[nestedKey]) {
    // updatedPermissions[key].nested[nestedKey].checked = userFromDatabase.Permission[key].subModules[nestedKey];
    // }
    // }
    // }
    // }


    // setPermissions(updatedPermissions);
    // })
    // .catch((error) => {
    // console.error('Error fetching user data:', error);
    // });
    // }
  }, []);


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
    const user = JSON.parse(localStorage.getItem("useLogedId"));
    const updatedUser = { ...user };


    for (const key in updatedUser.Permission) {
      updatedUser.Permission[key].allow = permissions[key].checked;


      for (const nestedKey in updatedUser.Permission[key].subModules) {
        updatedUser.Permission[key].subModules[nestedKey] = permissions[key].nested[nestedKey].checked;
      }
    }
    // console.log(updatedUser);


    // Update local storage
    localStorage.setItem("useLogedId", JSON.stringify(updatedUser));


    //updata data in database
    axios.patch(`http://localhost:3000/users/${user.id}`, updatedUser)
      .then(res => {
        console.log('Updated successfully:', res.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
    <Layout>

      <div className="page-container">
        <div className="page-content">
          <div className="page-header">
            <h1>User Permission</h1>
            <Link href="/users">
              <button className="save-button"  style={{backgroundColor:"teal",color:"white",padding:"10px",border:"0",borderRadius:"5px"}}>Back to Home</button>
            </Link>
          </div>
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
            <button className="save-button" onClick={handleSaveClick}  style={{backgroundColor:"teal",color:"white",padding:"10px",border:"0",borderRadius:"5px"}}>Save Permission</button>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PermissionPage;
