export const ProductsTableMetadata = (actions) => ({
  columns: [
    {
      componentId: "SELECT_ROWS",
      fixed: true,
      id: "SELECT_ROWS",
      isComponent: true,
      name: "Checkbox",
    },
    { name: "Name", id: "name", searchable: true },
    { name: "Price", id: "price", searchable: false },
    { name: "Quantity", id: "quantity" },
    { name: "Type", id: "type", searchable: true },

    {
      name: "Actions",
      isComponent: true,
      componentId: "ACTION_PANEL",
      props: {
        actions: [
          {
            icon: "remove",
            title: "Remove product",
            componentId: "CLICK_ACTION",
            onClick: (row) => actions.handleDelete(row.id),
          },
          {
            icon: "edit",
            title: "Edit product",
            componentId: "CLICK_ACTION",
            onClick: (row) => {
              actions.handleEdit(row);
            },
          },
          {
            icon: "add",
            title: "Add to cart",
            componentId: "CLICK_ACTION",
            onClick: (row) => {
              actions.handleAddToCart(row);
            },
            // stopModalTitle: "Confirm Stop",
            // stopModalBody: (row) => actions?.stopPopupBody(row),
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
  //onReload: actions?.onReload,
  onChangePage: (e, page) => actions.onPageChange(page),
  onChangeRowsPerPage: (size, page) => {
    console.log("page is", page, " and page size is ", size);
    actions.onRowsChange(size, page);
  },
  //deleteRecords: (recordIds) => actions.handleDelete(recordIds),
  numericPagination: true,
  setSelected:items=>actions.handleAddAllToCart(items)
  //deleteRecords:recordIds=>actions.handleAddAllToCart(recordIds)
});
