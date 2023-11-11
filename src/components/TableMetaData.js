export const integrityAnalysisMetadata = (actions) => ({
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
