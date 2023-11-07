import React, { useState,useCallback, useContext } from 'react'
import { Table } from '@platform/primary-table';
import { PermissionContext } from '../../Context';

const textToCsvMetadata = (actions) => {
  return {
    columns: [
      {
        componentId: 'SELECT_ROWS',
        fixed: true,
        id: 'SELECT_ROWS',
        isComponent: true,
        name: 'Checkbox'
      },
      { name: 'User Name', id: "user.userName", searchable: true },
      { name: 'Firstname', id: 'user.firstName', searchable: true },
      { name: 'Last Name', id: 'user.lastName', searchable: true },
     
      {
        name: 'Started At',
        id: 'startedAt',
        isComponent: true,
        componentId: 'LAST_UPDATED',
        props: {
          id: 'startedAt'
        }
      },
      
      {
        name: 'Actions',
        isComponent: true,
        componentId: 'ACTION_PANEL',
        props: {
          actions: [
            {
              icon: 'visibility',
              title: 'View details',
              componentId: 'GOTO',
              goToRoute: (row) => {
                navigateWithInProject('', '', `data-preparation/text-to-csv/${row.id}`);
              }
            },
            {
              icon: "delete",
              title: "Delete",
              componentId: "DELETE_ROW",
              onClick: (row) => {
                actions.deleteRecords(row);
              },
            },
          ]
        }
      }
    ],
    data: null,
    pagination: true,
    reload: true,
    selectRecordsFunctionality: true,
    deleteRecords: (recordsId) => actions.deleteRecords(recordsId),
    onReload: actions?.onReload,
    onChangePage: (e, page) => actions.onPageChange(page),
    onChangeRowsPerPage: (size, page) => actions.onRowsChange(size, page),
    searchData: true,
    handleSearch: actions?.handleSearch,
    totalCount: actions.totalCount,
    numericPagination: true
  };
};



function CustomTable() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState('');
  const [data, setData] = useState(null);
  const [fileSelectionPopup, setFileSelectionPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [fileSelectionProps, setFileSelectionProps] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([{ tableName: '' }]);
  const [reRunObj, setReRunObj] = useState({});
  const [actionComponents, setActionComponents] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { users, setLocal, local } = useContext(PermissionContext);


  console.log(users)
  const handleOnChangePage = (page) => {
    console.log(page)
    setPage(page);
  };


  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
    setPage(page);
  };


  const onReload = async () => {
    if (searchText) {
      handleSearch(searchText);
    } else {
      let { response, error } = await apiMethod({ page, pageSize });
      if (response?.data?.payload) {
        response?.data?.payload?.data?.map((item) => (item.id = item[rowId]));
        setData(response?.data?.payload?.data);
        setTotalCount(response?.data?.payload?.totalCount);
      } else {
        setData([]);
        ShowSnackbar(true, 'error', error?.response?.data?.message);
      }
    }
  };



  const deleteRecords = async (recordsId) => {
    let { response, error } = await apiMethodDelete({
      ids: recordsId
    });
    if (response?.data?.payload) {
      ShowSnackbar(true, 'success', response?.data?.message);
      await fetchData();
    } else {
      ShowSnackbar(true, 'error', error?.response?.data?.message);
    }
  };


  const fetchSearchResults = async (searchText) => {
    await apiMethodSearch({
      searchText,
      page,
      pageSize,
      handleResponse: ({ response, error }) => {
        if (response?.data?.payload) {
          response?.data?.payload?.data?.map((item) => (item.id = item[rowId]));
          setData(response?.data?.payload?.data);
          setTotalCount(response?.data?.payload?.totalCount);
        } else {
          setData([]);
          ShowSnackbar(true, 'error', error?.response?.data?.message);
        }
      }
    });
  };



  const handleSearch = useCallback(
    async (searchText) => {
      setSearchText(searchText);
      if (searchText?.length > 2) {
        await fetchSearchResults(searchText);
      } else if (!searchText?.length && page == 0) {
        await fetchData();
      }
    },
    [searchText, page, pageSize]
  );


  const handleStopJob = async (row) => {
    const payload = {
      [rowId]: row?.id,
      origin: row?.origin,
      sourceType: row?.sourceType
    };
    const { response, error } = await apiMethodStop(payload);
    if (response?.data?.success) {
      ShowSnackbar(true, 'success', response?.data?.message);
      await onReload();
    } else ShowSnackbar(true, 'error', error?.response?.data?.message);
  };

  return (
    <div>
      <Table
        tableProps={{
          ...textToCsvMetadata({
            onPageChange: handleOnChangePage,
            onRowsChange: handleOnChangePageSize,
            // onReload: onReload,
            deleteRecords
            // handleSearch: handleSearch,
            // totalCount: totalCount,
            // handleStopJob: handleStopJob
          }),
          data: users,
          actionComponents: actionComponents,
          title: 'Text to CSV Dashboard'
        }} />
    </div>
  )
}

export default CustomTable
