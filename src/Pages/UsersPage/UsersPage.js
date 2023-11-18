import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  AlbaButton,
  AlbaAutocomplete,
  Container,
  ShowSnackbar,
} from "@platform/service-ui-libraries";
import {Link , useLocation } from "react-router-dom";
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
  getAutoCompleteOptions,
  deleteUsersListRecord
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
    setDefaultVal,
    breadCrumbSet
  } = useContext(PermissionContext);
  const history = useHistory();
  const location = useLocation();
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [options,setOptions] = useState([]);
  const [selectedOptions,setSelectedOptions] = useState([])
  const [isLoading,setIsLoading] = useState(false);

  
  breadCrumbSet(location);
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
    setUserFormModal({
      ...userFormModal,
      status: true,
      edit: true,
      data: user,
    });
  };
  const fetchUser_Api = async(page,pageSize,searchText)=>{
    const {response,error}= await fetchUsersPageData({page,pageSize,searchText});
    setUsers(response.data)
  }
  const users_fetchData = async () => {
    const { response, error } = await users_Fetch();
    setUsers(response.data);
  };
  const AddUser = async (userData) => {
    const { response, error } = await addUser_UsersPage(userData);
    console.log("res",response?.statusText)
    if(response.status == 201){
      ShowSnackbar(true, 'success', response?.statusText);
    fetchUser_Api(page,pageSize,searchText)
    }else{
      ShowSnackbar(true, 'error', error);
    }
  };
  const editUser = async (userId) => {
    const { response, error } = editUser_usersPage(userId);
    console.log("edires",response)
    // if(response.status == 200){
    // }else{
    //   console.log(error)
    // }
  };

  const saveUserData = (editedUserData,page,pageSize,searchText) => {
    if (!userFormModal.edit) {
      AddUser(editedUserData);
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
  const deleteUser = async (userId) => {
    const { response, error } = await deleteUser_api(userId);
    if(response.status===200){
      users_fetchData()
    }else{
      console.log(error)
    }
  };

  const authMsgFn = (user) => {
    if (user.id != loggedUser.id) {
      setUnAuthMsg("Please Login First");
      history.push("/unauth");
    } else {
      history.push(`/users/authorization/${user.id}`);
    }
  };

  
  const onReload = async () => {
    // users_fetchData();
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

  const userRecordDelete = async(ids) => {
        for (const id of ids){
          const {response,error} = await deleteUsersListRecord(id)
          if(response.status === 200){
               users_fetchData()
          }
        }
    // fetchUser_Api(page,pageSize,searchText)

  }

  useEffect(() => {
    // setBreadCrumbProps({ navLinks: [ ], activeLink: { name: "users" } });
    setActionComponents([addUsersButton]);
    getOptions_api()
  }, []);
  
  useEffect(()=>{
    const loc = breadCrumbSet(location)
   const pathName = location.pathname.split("/").filter((path) => path);
  if(pathName.length > 1){
    setBreadCrumbProps({navLinks:[...loc.navprev],activeLink:{name:loc.end}})
  }else{
         setBreadCrumbProps({navLinks:[],activeLink:{name:loc.end}})
  }
},[location])
  const usersListTableMetadata = (actions) => {
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
      numericPagination: true,
      deleteRecords:(userId)=>actions.userRecordDelete(userId)
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
          {/* <div className="autoComplete">
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
          </ div> */}
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
                  userRecordDelete
                }),
                data: users,
                actionComponents: actionComponents,
                title: "Users List",
              }}
            />
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
