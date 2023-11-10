import { React ,useState,useCallback} from "react";
import {Typography,AlbaButton} from "@platform/service-ui-libraries";
import { Table } from "@platform/primary-table";

export const usersTableMetadata = (actions) => ({
  columns: [
    {
      componentId: "SELECT_ROWS",
      fixed: true,
      id: "SELECT_ROWS",
      isComponent: true,
      name: "Checkbox",
    },
    { name: "Name", id: "name", searchable: true },
    {
      name: "Status",
      id: "status",
      componentId: "MASTERING_STATUS",
      isComponent: true,
      searchable: true,
      props: {
        id: "status",
        inAvatar: true,
        messageId: "message",
      },
    },
    {
      name: "Time Elapsed",
      id: "startedAt",
      isComponent: true,
      componentId: "TIME_ELAPSED",
      props: {
        id: "startedAt",
        start: "startedAt",
        end: "finishedAt",
      },
    },
    {
      name: "Started At",
      id: "startedAt",
      isComponent: true,
      componentId: "LAST_UPDATED",
      props: {
        id: "startedAt",
      },
    },
    {
      name: "Started By",
      id: "createdBy",
      isComponent: true,
      componentId: "USER_DETAILS",
      props: {
        id: "createdBy.userId",
        name: "createdBy.username",
      },
      searchable: true,
    },
    {
      name: "Actions",
      isComponent: true,
      componentId: "ACTION_PANEL",
      props: {
        actions: [
          {
            icon: "visibility",
            title: "View details",
            componentId: "GOTO",
            goToRoute: (row) => {
              navigateWithInProject(
                "",
                "",
                `data-quality/integrity-analysis-details/${row.id}`
              );
            },
          },
          {
            icon: "update",
            title: "Rerun",
            componentId: "CLICK_ACTION",
            onClick: (row) => {
              actions.rerunIntegrityAnalysis(row);
            },
          },
          {
            icon: "stop",
            title: "Stop integrity analysis",
            componentId: "STOP_MODAL",
            onClick: (row) => {
              actions.onStopClick(row.id);
            },
            stopModalTitle: "Confirm Stop",

            stopModalBody: (row) => actions?.stopPopupBody(row),
          },
        ],
      },
    },
  ],
  data: null,
  searchData: true,
  handleSearch: actions?.handleSearch,
  pagination: true,
  reload: true,
  selectRecordsFunctionality: true,
  onReload: actions?.onReload,
  onChangePage: (e, page) => actions.onPageChange(page),
  onChangeRowsPerPage: (size, page) => actions.onRowsChange(size, page),
  deleteRecords: (recordIds) => actions.handleDelete(recordIds),
  numericPagination: true,
});

function UsersUITable() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [totalCount, setTotalCount] = useState("");
  const [integrityAnalysis, setIntegrityAnalysis] = useState(false);
  const [idForRerun, setIdForRerun] = useState("");
  const [actionComponents, setActionComponents] = useState([]);
  const handleOnChangePage = (page) => {
    setPage(page);
  };
  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
    setPage(page);
  };

  const fetchData = async () => {
    // we fetch data and update setData here
  };

  const handleDelete = (ids) => {
    deleteIntegrityData({ ids }).then((res) => {
      if (res?.response?.data?.success) {
        ShowSnackbar(true, "success", res.response.data.message);

        fetchData();
      } else {
        ShowSnackbar(true, "error", res?.error?.response.data.message);
      }
    });
  };
  const onReload = async () => {
    if (searchText.length > 2) {
      handleSearch(searchText);
    } else {
      fetchData();
    }
  };
  const handleSearch = useCallback(
    (searchText) => {
      setSearchText(searchText);
      if (searchText?.length > 2) {
        searchIntegrityAnalysis({
          searchText: searchText,
          page: page,
          pageSize: pageSize,
          handleResponse: ({ response }) => {
            if (response?.data?.payload) {
              setData(
                response?.data?.payload?.data?.map((item) => ({
                  ...item,

                  ...(item.status === "Stopped" && {
                    stoppedBy: item.createdBy,
                  }),
                })) || []
              );
              setTotalCount(response?.data?.payload?.totalCount);
            }
          },
        });
      } else if (!searchText?.length && page == 0) {
        fetchData();
      }
    },
    [searchText, page, pageSize]
  );
  const stopPopupBody = (row) => (
    <Typography
      align="left"
      variant="h3"
      title={`Are you sure you want to stop ${row.name} ?`}
    >
      Are you sure you want to stop {row.name} ?
    </Typography>
  );
  const onStopClick = async (id) => {
    const { response, error } = await stopIntegrityAnalysisAPI({ id });
    if (response) {
      fetchData();
      ShowSnackbar(true, "success", response?.data?.message);
    } else {
      ShowSnackbar(true, "error", error.response?.data?.message);
    }
  };
  const [tableProps, setTableProps] = useState({
    ...usersTableMetadata({
      handleDelete: handleDelete,
      onPageChange: handleOnChangePage,
      onRowsChange: handleOnChangePageSize,
      onStopClick,
      rerunIntegrityAnalysis,
      stopPopupBody,
    }),
  });
  useEffect(() => {
    if (searchText.length > 2) {
      handleSearch(searchText);
    } else {
      fetchData();
    }
  }, [page, pageSize]);

  const integrityButton = useCallback(() => {
    return (
      <AlbaButton
        variant="success"
        icon="library_books"
        onClick={() => {
          setIntegrityAnalysis(true);
        }}
      >
        Integrity Analysis
      </AlbaButton>
    );
  }, []);
  useEffect(() => {
    setBreadCrumbProps({
      navLinks: [],

      activeLink: { name: "Integrity Analysis" },
    });
    setActionComponents([integrityButton]);
  }, []);

  const socket = useContext(ProfileSocketContext);
  useEffect(() => {
    let channelName = `integrity-analysis-notification-${fetchProjectId()}`;
    if (socket)
      socket.on(channelName, (res) => {
        fetchData();
      });
  }, [socket]);

  return (
    <div className="table-wrapper">
      <Table
        tableProps={{
          ...tableProps,
          totalCount: totalCount,
          data: data,
          handleSearch: handleSearch,
          onReload,
          title: "Integrity Analysis Dashboard",
          actionComponents: actionComponents,
        }}
      />
    </div>
  );
}

export default UsersUITable;
