import React, { useState, useEffect, useCallback, useContext } from "react";
import "./Test.scss"
import {
  timeAgo,
  Typography,
  AlbaAutocomplete,
  AlbaButton,
  DraggableModal,
  IconButton,
  Dialog,
  Icon,
  DialogTitle,
  DialogContent,
  ShowSnackbar,
} from "@platform/service-ui-libraries";
import {
  fetchTestData,
  addTestData,
  editTestData,
  deleteListTestData,
} from "../api/api";
import { PermissionContext } from "../Context";
import { Table } from "@platform/primary-table";
import Layout from "../Layout/Layout";
import EditTable from "./EditTable";

function Test() {
  const [searchText, setSearchText] = useState("");
  const [usedData, setUsedData] = useState([]);
  const [actionComponents, setActionComponents] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sampleData, setSampleData] = useState({
    status: false,
    edit: false,
    data: {},
  });
  const [newData, setNewData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
  });

  const closeForm = () => {
    setSampleData({
      ...sampleData,
      status: false,
      edit: false,
      data: {},
    });
  };

  const openAddForm = () => {
    setSampleData({
      ...sampleData,
      status: true,
      edit: false,
      data: newData,
    });
  };
  const openEditForm = (oldData) => {
    setSampleData({
      ...sampleData,
      status: true,
      edit: true,
      data: oldData,
    });
  };
  //////////////////////Meta Data///////////////////////////
  const integrityAnalysisMetadata = (actions) => ({
    columns: [
      {
        componentId: "SELECT_ROWS",
        fixed: true,
        id: "SELECT_ROWS",
        isComponent: true,
        name: "Checkbox",
      },
      { name: "User Name", id: "userName", searchable: true },
      {
        name: "First Name",
        id: "firstName",
        searchable: true,
      },
      {
        name: "Last Name",
        id: "lastName",
        searchable: true,
      },
      {
        name: "Actions",
        isComponent: true,
        componentId: "ACTION_PANEL",
        props: {
          actions: [
            {
              icon: "edit",
              title: "Edit File",
              componentId: "CLICK_ACTION",
              onClick: (row) => {
                actions.openEditForm(row);
              },
            },
          ],
        },
      },
    ],
    data: null,
    searchData: true,
    onReload: actions?.onReload,
    reload: true,
    handleSearch: actions?.handleSearch,
    pagination: true,
    selectRecordsFunctionality: true,
    onChangePage: (e, page) => actions.onPageChange(page),
    onChangeRowsPerPage: (size, page) => actions.onRowsChange(size, page),
    deleteRecords: (recordIds) => actions.handleDelete(recordIds),
    numericPagination: true,
  });
  const sampleHeaderButton = useCallback(() => {
    return (
      <AlbaButton variant="success" icon="article" onClick={openAddForm}>
        Add Data
      </AlbaButton>
    );
  }, []);
  useEffect(() => {
    setActionComponents([sampleHeaderButton]);
  }, []);
  /////////////fetch Data function/////////////////////
  const fetchDataFun = async (page, pageSize, searchText) => {
    setLoading(true);
    const { response, error } = await fetchTestData({
      page,
      pageSize,
      searchText,
    });
    setUsedData(response.data);
    setLoading(false);
    if (response?.status == 200) {
      ShowSnackbar(true, "success", "cgeubi");
    }
  };

  ///////////////////////////add data api call/////////////////
  const addDataApi = async (newData) => {
    setLoading(true);
    const { response, error } = await addTestData(newData);
    if (response?.status == 201) {
      ShowSnackbar(true, "success", "Data Added Successfully");
    }
    setLoading(false);
  };
  ///////////////////////////edit data api call/////////////////
  const editDataApi = async (editedData) => {
    setLoading(true);
    const { response, error } = await editTestData(editedData);
    if (response?.status == 200) {
      ShowSnackbar(true, "success", "Data Edited Successfully");
    }
    setLoading(false);
  };
  ///////////////////////////delete list data api call/////////////////
  const deleteListDataApi = async (ids) => {
    setLoading(true);
    for (const id of ids) {
      const { response, error } = await deleteListTestData(id);
    }
    fetchDataFun(page, pageSize, searchText);
  };
  useEffect(() => {
    fetchDataFun(page, pageSize, searchText);
  }, []);
  const onReload = async () => {
    if (searchText.length > 2) {
      handleSearch(searchText);
    } else {
      fetchDataFun(page, pageSize, searchText);
    }
  };

  //page Change Function
  const handleOnChangePage = (page) => {
    setPage(page);
    fetchDataFun(page, pageSize, searchText);
  };
  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
    setPage(page);
    fetchDataFun(page, pageSize, searchText);
  };
  const handleSaveNewData = (newData) => {
    addDataApi(newData);
    fetchDataFun(page, pageSize, searchText);
  };
  const handleEditData = (editedData) => {
    editDataApi(editedData);
    fetchDataFun(page, pageSize, searchText);
  };
  //search

  const handleSearch = useCallback(
    (searchText) => {
      setSearchText(searchText);
      if (searchText?.length > 2) {
        fetchDataFun(page, pageSize, searchText);
      }
    },
    [searchText, page, pageSize]
  );
  const [tableProps, setTableProps] = useState({
    ...integrityAnalysisMetadata({
      handleDelete: deleteListDataApi,
      onPageChange: handleOnChangePage,
      onRowsChange: handleOnChangePageSize,
      openEditForm,
    }),
  });
  return (
    <>
    <div className="testTable">
      <Table 
        tableProps={{
          ...tableProps,
          totalCount,
          data: usedData,
          handleSearch: handleSearch,
          onReload,
          title: "Test Alba Table",
          actionComponents: actionComponents,
        }}
        />
        </div>
      {sampleData.status && !sampleData.edit && (
        <EditTable
          open={sampleData.status}
          data={sampleData.data}
          onSave={handleSaveNewData}
          onCancel={closeForm}
          isAdding={true}
        />
      )}
      {sampleData.status && sampleData.edit && (
        <EditTable
          open={sampleData.status && sampleData.edit}
          data={sampleData.data}
          onSave={handleEditData}
          onCancel={closeForm}
          isAdding={false}
        />
      )}
    </>
  );
}
export default Test;
