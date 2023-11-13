import React, { useContext, useMemo, useState, useCallback, useEffect } from "react";
import {
  Link,
  // Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon,
  AlbaButton,
  Container,
  Checkbox,
  Card,
  Typography,
  Box,
} from "@platform/service-ui-libraries";
import { Table } from "@platform/primary-table";
import Layout from "../../Layout/Layout";
import "./Userspage.scss";
import BreadCrumb from "../../components/Breadcrumbs/BreadCrumb";
import EditForm from "../../components/EditForm/EditForm";
import { useHistory } from "react-router-dom";
import { PermissionContext, UsersContext } from "../../Context";
import UsersUITable from "./Table/UsersUITable";
import { addUser_UsersPage,users_Fetch,editUser_usersPage,deleteUser_api } from "../../api/api";

function UsersPage() {
  const { users, setUsers, handlePermissionModalOpen, currentUser,setUnAuthMsg,setBreadCrumbProps ,breadcrumbProps} =
    useContext(PermissionContext);
    const history = useHistory();
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));

  //Form Modal
  let userData = {
    user: {
      userName: "",
      firstName: "",
      lastName: "",
    },
    age: "",
    email: "",
    password: "",
    Permission: {
      csvPermission: {
        allow: false,
        subModules: {
          csvPagePermission: false,
          csvEditPermission: false,
          csvDownloadPermission: false,
        },
      },
      gamePermission: {
        allow: false,
        subModules: {
          gamePagePermission: false,
          gameStartPermission: false,
          gameResetPermission: false,
        },
      },
      missing: {
        allow: false,
        subModules: {},
      },
    },
  };

  const [userFormModal, setUserFormModal] = useState({
    status: false,
    edit: false,
    data: {},
  });

  const [searchText, setSearchText] = useState("");

  const closeModal = () => {
    setUserFormModal({
      ...userFormModal,
      status: false,
      edit: false,
      data: {},
    });
  };

  const afterEdit = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  //Add Form
  const openAddModal = () => {
    setUserFormModal({
      ...userFormModal,
      status: true,
      edit: false,
      data: userData,
    });
  };

  //Edit Form

  const openEditModaL = (user) => {
    console.log(user);
    setUserFormModal({
      ...userFormModal,
      status: true,
      edit: true,
      data: user,
    });
  };

  const users_fetchData = async()=>{
    const {response,error} = await users_Fetch()
    setUsers(response.data)
    // return response.data
  }
  const AddUser = async(userData)=>{
    const {response,error} = await addUser_UsersPage(userData)
    console.log("res",response)
  }
  const editUser = async (userId) =>{
    const {response,error} =editUser_usersPage(userId)
  }

  const saveUserData = (editedUserData) => {
    if (!userFormModal.edit) {
        //  console.log("editData",editedUserData)
        AddUser(editedUserData)
        users_fetchData();
        console.log("useradd",users)
    } else {
      const updateduser = editedUserData;
      const updatedUsersList = users
        .map((user) => (user.id === updateduser.id ? { ...updateduser } : user))
        .filter((user) => user.id === updateduser.id);
        
        editUser(updatedUsersList[0]);
        users_fetchData()
      //   fetch(`http://localhost:3000/users/${updatedUsersList[0].id}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(updatedUsersList[0]),
      // })
        .then((response) => afterEdit())
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    closeModal();
  };
  //Delete User
  const deleteUser = async(userId) => {

    const{response,erro} = await deleteUser_api(userId) 
    users_fetchData()
    // fetch(`http://localhost:3000/users/${userId}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => afterEdit())
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  const authMsgFn = (user) => {
    if(user.id!=loggedUser.id){

      setUnAuthMsg("Please Login First");
      history.push("/unauth");
    }else{
      history.push(`/users/authorization/${user.id}`)
    }
  };
  //searchFunction
  const handleSearch = async (text) => {
    const url = `http://localhost:3000/users?q=${text}`;
    const searchResults = await fetch(url);
    const updatedResults = await searchResults.json();
    setUsers(updatedResults);
  };
  const   handleOnChangePage = () =>{}
  const handleOnChangePageSize= () =>{}
  const [actionComponents, setActionComponents] = useState([]);
  
  const addUsersButton = ()=>{
    return(
    <AlbaButton
    variant="success"
    onClick={openAddModal}
  >
    Add Users
  </AlbaButton>
  )};

  useEffect(()=>{
    setBreadCrumbProps({ navLinks: [], activeLink: { name: "users" } });
    setActionComponents([addUsersButton])
  },[])

  console.log("breadcrumb",breadcrumbProps)

  const usersListTableMetadata = (actions) => {
    console.log("actions",actions)
    return {
      columns: [
        {
           componentId: 'SELECT_ROWS',
           fixed: true,
           id: 'SELECT_ROWS',
           isComponent: true,
           name: 'Checkbox'
          },
        { name: "ID", id: "id", searchable: true },
        { name: "First Name", id: "user.firstName", searchable: true },
        { name: "Last Name", id: "user.lastName", searchable: true },
        { name: "User Name", id: "user.userName", searchable: true },
        { name: "Email", id: "email", searchable: true },
        { name: "Age", id: "age", searchable: true },
        {
          name: "Actions",
          isComponent: true,
          componentId: "ACTION_PANEL",
          props: {
            actions: [
              {
                icon: "edit",
                title: "Edit details",
                isComponent: true,
                componentId: "CLICK_ACTION",
                onClick: (row) => {
                  actions.handleEdit(row);
                },
              },
              {
                icon: "key",
                title: "Permission",
                isComponent: true,
                componentId: "CLICK_ACTION",
                onClick: (row) => {
                  actions.authMsgFn(row)
                },
              },
              {
                icon: "delete",
                title: "Delete",
                isComponent: true,
                componentId: "DELETE_ROW",
                onClick: (row) => {
                  actions.handleDelete(row.id);
                },
              },
            ],
          },
        },
      ],
      data: actions?.data,
      searchData: true,
      handleSearch: actions?.handleSearch,
      pagination: true,
      selectRecordsFunctionality: true,
      onRowsChange: actions?.onRowsChange,
      onChangePage:actions?.onChangePage
      // deleteRecords:(userId)=>actions.deleteUser(userId)
    };
  };

  // const [tableProps,setTableProps] = useState({
  //   ...usersListTableMetadata()
  // })

  const userPageValue = useMemo(() => {
    return {
      users,
      setUsers,
      handlePermissionModalOpen,
      loggedUser,
      userData,
      userFormModal,
      setUserFormModal,
      closeModal,
      afterEdit,
      openAddModal,
      openEditModaL,
      saveUserData,
      deleteUser,
    };
  }, [
    users,
    setUsers,
    handlePermissionModalOpen,
    loggedUser,
    userData,
    userFormModal,
    setUserFormModal,
    closeModal,
    afterEdit,
    openAddModal,
    openEditModaL,
    saveUserData,
    deleteUser,
  ]);

  return (
    <>
      <Layout>
        <UsersContext.Provider value={userPageValue}>
          <Container maxWidth="100%" className="tableContent">
            <Table
              tableProps={{
                ...usersListTableMetadata({
                  handleEdit: openEditModaL,
                  handleDelete: deleteUser,
                  onChangePage: handleOnChangePage,
                onRowsChange: handleOnChangePageSize,
                  handleSearch,
                  authMsgFn
                }),
                data: users,
                actionComponents: actionComponents,
                title: "Users List",
              }}
            />
            {/* {console.log(userFormModal, "userForm")} */}
            {userFormModal.status && !userFormModal.edit ? <EditForm /> : null}
            {userFormModal.status && userFormModal.edit ? <EditForm /> : null}
          </Container>
          {/* <UsersUITable/> */}
        </UsersContext.Provider>
      </Layout>
    </>
  );
}

export default UsersPage;
