import React, { useContext, useState, useEffect } from "react";
import {
  FormControlLabel,
  Checkbox,
  AlbaButton,
  Icon,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@platform/service-ui-libraries";
import { ShowSnackbar } from "@platform/service-ui-libraries";
import "./PermissionPage.scss";
import { PermissionContext } from "../Context";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from "../Layout/Layout";
import BreadCrumb from "../components/Breadcrumbs/BreadCrumb";
import { useLocation } from "react-router-dom";
import { updatePermission } from "../api/api";
import { useHistory } from "react-router-dom";
const PermissionPage = () => {
  const history=useHistory()
  const [permissions, setPermissions] = useState({});
  const { local, setLocal ,breadCrumbSet} = useContext(PermissionContext);
  const location = useLocation()
  breadCrumbSet(location)
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
    // .then((res) => {
    // const userFromDatabase = res.data;

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
        newPermissions[mainKey].nested[nestedKey].checked =
          newPermissions[mainKey].checked;
      }

      return newPermissions;
    });
  };

  const handleNestedCheckboxChange = (mainKey, nestedKey) => {
    setPermissions((prevPermissions) => {
      const newPermissions = { ...prevPermissions };
      newPermissions[mainKey].nested[nestedKey].checked =
        !newPermissions[mainKey].nested[nestedKey].checked;

      const atLeastOneNestedChecked = Object.values(
        newPermissions[mainKey].nested
      ).some((nested) => nested.checked);

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
        updatedUser.Permission[key].subModules[nestedKey] =
          permissions[key].nested[nestedKey].checked;
      }
    }
    // console.log(updatedUser);

    // Update local storage
    localStorage.setItem("useLogedId", JSON.stringify(updatedUser));
    setLocal(!local);
    updatePermissionFn(updatedUser);
  };
  const updatePermissionFn = async (updatedUser) => {
    const { response, error } = await updatePermission(updatedUser);
    if (response?.status == 200) {
      ShowSnackbar(true, "success", "Permission Updated Successfully");
    }
  };
  const backToHome=()=>{
    history.push("/users")
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="page-content">
          <Box className="page-header">
            <div>
              <h1>User Permission</h1>
              <BreadCrumb />
            </div>
            <AlbaButton variant="success" icon="article" onClick={backToHome}>
            Back to Home
      </AlbaButton>
          </Box>

          <Box style={{ padding: "1%" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="user-permission-container">
                {Object.entries(permissions).map(
                  ([mainKey, mainPermission]) => (
                    <Accordion key={mainKey} className="mainCheckBox">
                      <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                          <FormControlLabel
                            // value={useDefault}
                            control={<Checkbox/>}
                            label={mainPermission.label}
                            data-test-id="default-checkbox-button"
                            className="__check_default"
                            checked={mainPermission.checked}
                            onChange={() => handleMainCheckboxChange(mainKey)}
                          />
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="nested-permissions">
                          {Object.entries(mainPermission.nested).map(
                            ([nestedKey, nestedPermission]) => (
                              <div key={nestedKey}>
                                <FormControlLabel
                                  // value={useDefault}
                                  control={<Checkbox />}
                                  label={nestedPermission.label}
                                  data-test-id="default-checkbox-button"
                                  className="__check_default"
                                  checked={nestedPermission.checked}
                                  onChange={() =>
                                    handleNestedCheckboxChange(
                                      mainKey,
                                      nestedKey
                                    )
                                  }
                                />
                              </div>
                            )
                          )}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
              </div>
              <img
                style={{ height: "200px" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOh3JxJXqEMid94udZTV-4Mhw_OV1v0lSgocVrfCtamb5DzsKr0XQGRFmJ8EIyIAP3b0&usqp=CAU"
              />
            </div>
            <div className="modal-footer">
              <AlbaButton
                variant="success"
                icon="article"
                onClick={handleSaveClick}
              >
                Save Permission
              </AlbaButton>
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default PermissionPage;
