import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon,
  AlbaButton,
  AlbaAutocomplete,
  Container,
  Checkbox,
  Card,
  Typography,
  Box,
} from "@platform/service-ui-libraries";
import * as s from "@platform/service-ui-libraries"
import { Table } from "@platform/primary-table";
import Layout from "../../Layout/Layout";
import "./Userspage.scss";
import BreadCrumb from "../../components/Breadcrumbs/BreadCrumb";
import EditForm from "../../components/EditForm/EditForm";
import { useHistory } from "react-router-dom";
import { PermissionContext, UsersContext } from "../../Context";
import UsersUITable from "./Table/UsersUITable";
import {
  addUser_UsersPage,
  users_Fetch,
  editUser_usersPage,
  deleteUser_api,
  fetchUsersPageData,
  getAutoCompleteOptions
} from "../../api/api";




function UsersPage() {
  const {
    users,
    setUsers,
    handlePermissionModalOpen,
    currentUser,
    setUnAuthMsg,
    setBreadCrumbProps,
    breadcrumbProps,
    defaultVal,
    setDefaultVal
  } = useContext(PermissionContext);
  const history = useHistory();
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));



  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [options,setOptions] = useState([]);
  const [selectedOptions,setSelectedOptions] = useState([])
  const [isLoading,setIsLoading] = useState(false);



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

  const users_fetchData = async () => {
    const { response, error } = await users_Fetch();
    setUsers(response.data);
  };
  const AddUser = async (userData) => {
    const { response, error } = await addUser_UsersPage(userData);
    console.log("res", response);
  };
  const editUser = async (userId) => {
    const { response, error } = editUser_usersPage(userId);
  };

  const saveUserData = (editedUserData,page,pageSize,searchText) => {
    if (!userFormModal.edit) {
      AddUser(editedUserData);
    fetchUser_Api(page,pageSize,searchText)
    } else {
      const updateduser = editedUserData;
      const updatedUsersList = users.map((user) => (user.id === updateduser.id ? { ...updateduser } : user)).filter((user) => user.id === updateduser.id);
      editUser(updatedUsersList[0]);
      fetchUser_Api(page,pageSize,searchText)
      // users_fetchData();
    }
    closeModal();
  };
  //Delete User
  const deleteUser = async (userId,page,pageSize,searchText) => {
    const { response, error } = await deleteUser_api(userId);
    fetchUser_Api(page,pageSize,searchText)

  };

  const authMsgFn = (user) => {
    if (user.id != loggedUser.id) {
      setUnAuthMsg("Please Login First");
      history.push("/unauth");
    } else {
      history.push(`/users/authorization/${user.id}`);
    }
  };

  
  
  const fetchUser_Api = async(page,pageSize,searchText)=>{
    const {response,error}= await fetchUsersPageData({page,pageSize,searchText});
    setUsers(response.data)
  }
  
  const onReload = async () => {
    users_fetchData();

    fetchUser_Api(page,pageSize,searchText)
  };

  //  console.log("*",s)

  const getOptions_api= async()=>{
    const {response,error} = await getAutoCompleteOptions()
    setOptions(response.data)
  }
  const onAutoCompleteUpdate = (option) =>{
       setSelectedOptions(option)
       setDefaultVal(option)
  }
   
  //searchFunction
  const handleOnChangePage = (page) => {
    setPage(page);
    fetchUser_Api(page,pageSize,searchText);

  };
  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
    setPage(page);
    fetchUser_Api(page,pageSize,searchText);

  };

  const handleSearch = (text,page,pageSize) => {
    console.log("text",text)
    fetchUser_Api(page,pageSize,text);
  };
  const [actionComponents, setActionComponents] = useState([]);

  const addUsersButton = () => {
    return (
      <AlbaButton variant="success" onClick={openAddModal}>
        Add Users
      </AlbaButton>
    );
  };

  useEffect(() => {
    setBreadCrumbProps({ navLinks: [ ], activeLink: { name: "users" } });
    setActionComponents([addUsersButton]);
    getOptions_api()
  }, []);
  console.log("option",options)

  const usersListTableMetadata = (actions) => {
    console.log("actions", actions);
    return {
      columns: [
        {
          componentId: "SELECT_ROWS",
          fixed: true,
          id: "SELECT_ROWS",
          isComponent: true,
          name: "Checkbox",
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
                  actions.authMsgFn(row);
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
      reload: true,
      selectRecordsFunctionality: true,
      onReload: actions?.onReload,
      onChangeRowsPerPage: (size, page) => actions?.onRowsChange(size, page),
      onChangePage: (e, page) => actions?.onPageChange(page),
      numericPagination: true
      // deleteRecords:(userId)=>actions.deleteUser(userId)
    };
  };
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
      // saveUserData,
      deleteUser
      // ,page,pageSize,searchText
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
    // saveUserData,
    deleteUser
    // ,page,pageSize,searchText
  ]);

  return (
    <>
      <Layout>
        <UsersContext.Provider value={userPageValue}>
          <div className="autoComplete">
          <AlbaAutocomplete
          dataTestId="alba-autocomplete"
          label="AutoComplete"
          placeholder="Select Options"
          loading={isLoading}
          defaultValue={defaultVal}
          options={options}
          multiple={true}
          selectAll={true}
          shrinkList={true}
          disabled={false}
          updateValue={(e)=>onAutoCompleteUpdate(e.selectedItems)}
          />
          </ div>
          <Container maxWidth="100%" className="tableContent">
            <Table
              tableProps={{
                ...usersListTableMetadata({
                  handleEdit: openEditModaL,
                  handleDelete: deleteUser,
                  onPageChange: handleOnChangePage,
                  onRowsChange: handleOnChangePageSize,
                  handleSearch,
                  authMsgFn,

                  
                  onReload,
                }),
                data: users,
                actionComponents: actionComponents,
                title: "Users List",
              }}
            />
            {console.log(userFormModal, "userForm")}
            {userFormModal.status && !userFormModal.edit ? <EditForm  saveUserData={saveUserData} page={page} pageSize={pageSize} searchText={searchText} /> : null}
            {userFormModal.status && userFormModal.edit ? <EditForm saveUserData={saveUserData} page={page} pageSize={pageSize} searchText={searchText}/> : null}
          </Container>
          {/* <UsersUITable/> */}
        </UsersContext.Provider>
      </Layout>
    </>
  );
}

export default UsersPage;
