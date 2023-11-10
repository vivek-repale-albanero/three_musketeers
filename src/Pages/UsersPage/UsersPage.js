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

function UsersPage() {
  const { users, setUsers, handlePermissionModalOpen, currentUser } =
    useContext(PermissionContext);
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

  const saveUserData = (editedUserData) => {
    if (!userFormModal.edit) {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUserData),
      })
        .then((response) => afterEdit())
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      const updateduser = editedUserData;
      const updatedUsersList = users
        .map((user) => (user.id === updateduser.id ? { ...updateduser } : user))
        .filter((user) => user.id === updateduser.id);
        fetch(`http://localhost:3000/users/${updatedUsersList[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUsersList[0]),
      })
        .then((response) => afterEdit())
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    closeModal();
  };
  //Delete User
  const deleteUser = (userId) => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => afterEdit())
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const authMsgFn = () => {
    setUnAuthMsg("Please Login First");
    return "/unauth";
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

  // useEffect(()=>{
  //   handleSearch(searchText);
  // },[searchText])
  const usersListTableMetadata = (actions) => {
    console.log(actions)
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
                icon: "visibility",
                title: "Edit details",
                isComponent: true,
                componentId: "CLICK_ACTION",
                onClick: (row) => {
                  actions.handleEdit(row);
                },
              },
              {
                icon: "switches",
                title: "Permission",
                isComponent: true,
                componentId: "CLICK_ACTION",
                onClick: (user) => {
                  console.log(authMsgFn());
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

  const [actionComponents, setActionComponents] = useState([]);
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
          <Box className="title" style={{ display: "flex" }}>
            <Typography style={{ fontSize: "24px" }}>
              Users List <BreadCrumb />
            </Typography>
            <AlbaButton
              variant="success"
              // className="addBtn"
              onClick={openAddModal}
            >
              Add Users
            </AlbaButton>
            {userFormModal.status && !userFormModal.edit ? <EditForm /> : null}
          </Box>
          <Container maxWidth="100%" className="tableContent">
            {/* <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ background: "rgb(42 139 139)" }}>
                  <TableRow>
                    <TableCell 
                    style={{ color: "rgb(224 224 224)", textAlign: "center" }}
                    >
                      Id
                    </TableCell>
                    <TableCell
                      style={{ color: "rgb(224 224 224)", textAlign: "center" }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      style={{ color: "rgb(224 224 224)", textAlign: "center" }}
                    >
                      E-mail
                    </TableCell>
                    <TableCell
                      style={{ color: "rgb(224 224 224)", textAlign: "center" }}
                    >
                      Age
                    </TableCell>
                    <TableCell
                      style={{ color: "rgb(224 224 224)", textAlign: "center" }}
                    >
                      User Name
                    </TableCell>
                    <TableCell
                      style={{ color: "rgb(224 224 224)", textAlign: "center" }}
                    >
                      Is Logged
                    </TableCell>
                    <TableCell
                      style={{ color: "rgb(224 224 224)", textAlign: "center" }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.id}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>{`${
                        user.user.firstName + " " + user.user.lastName
                      }`}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.email}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.age}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.user.userName}
                      </TableCell>
                      <TableCell
                        style={{
                          color: loggedUser.id === user.id ? "green" : "red",
                          textAlign: "center",
                        }}
                      >
                        {loggedUser.id === user.id ? "Online" : "Offline"}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <>
                          <Button
                            className="actionBtn"
                            onClick={() => openEditModaL(user)}
                          >
                            <Icon>edit_note</Icon>
                          </Button>
                          {userFormModal.status && userFormModal.edit ? (
                            <EditForm />
                          ) : null}
                          <Link
                            href={
                              currentUser && currentUser.id == user.id
                                ? `/users/authorization/${user.id}`
                                : authMsgFn()
                            }
                            disabled={currentUser && currentUser.id == user.id}
                          >
                            <Button className="actionBtn">
                              <Icon>key</Icon>
                            </Button>
                          </Link>
                          <Button
                            className="actionBtn"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Icon>delete</Icon>
                          </Button>
                        </>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}
            <Table
              tableProps={{
                ...usersListTableMetadata({
                  handleEdit: openEditModaL,
                  handleDelete: deleteUser,
                  onChangePage: handleOnChangePage,
                onRowsChange: handleOnChangePageSize,
                  handleSearch
                  // data: users,
                }),
                data: users,
                actionComponents: actionComponents,
                title: "Users List",
              }}
            />
            {console.log(userFormModal, "userForm")}
            {userFormModal.status && userFormModal.edit ? <EditForm /> : null}
          </Container>
          {/* <UsersUITable/> */}
        </UsersContext.Provider>
      </Layout>
    </>
  );
}

export default UsersPage;
