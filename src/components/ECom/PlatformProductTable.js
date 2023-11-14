import React, { useState, useEffect, useCallback, useContext } from "react";
import { Table } from "@platform/primary-table";
import { Typography } from "@material-ui/core";
import { AlbaButton } from "@platform/service-ui-libraries";
import { ProductsTableMetadata } from "./ProductsTableMetadata";
import { fetchProducts } from "../../api/api";

function PlatformProductTable({
  actions,
  page,
  pageSize,
  setPage,
  setPageSize,
}) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [actionComponents, setActionComponents] = useState([]);

  const { openAddModal, openEditModaL, deleteProduct, handleAddToCart } =
    actions();

  const handleOnChangePage = (page) => {
    setPage(page);
  };
  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
    setPage(page);
  };
  const fetchData = async (page, pageSize) => {
    const { response, error } = await fetchProducts(page, pageSize);
    console.log('fetch data is called!')
    //console.log('reponse',response.request.status)
    if (response.request.status === 200) {
      setData(response.data);
    } else {
      console.log("error fetching data", error);
    }
  };
  useEffect(() => {
    fetchData(page, pageSize);
    console.log('uef 1 run!')
  }, [searchText, page, pageSize]);

  useEffect(() => {
    fetchData();
    console.log('uef 2 run!')
    setActionComponents([AddProductButton]);
  }, []);

  useEffect(() => {
    const filteredProducts = data?.filter((item) =>
      item.name.toLowerCase().startsWith(searchText)
    );
    console.log("filtered products", filteredProducts);
    setData(filteredProducts);
  }, [searchText]);

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
  const handleSearch = useCallback((searchInput) => {
    setSearchText(searchInput);
  }, []);
  const stopPopupBody = (row) => (
    <Typography
      align="left"
      variant="h3"
      title={`Are you sure you want to stop ${row.name} ?`}
    >
      Are you sure you want to stop {row.name} ?
    </Typography>
  );

  const [tableProps, setTableProps] = useState({
    ...ProductsTableMetadata({
      handleDelete: deleteProduct,
      handleEdit: openEditModaL,
      handleAddToCart: handleAddToCart,
      onPageChange: handleOnChangePage,
      onRowsChange: handleOnChangePageSize,
      //onStopClick,
      //rerunIntegrityAnalysis,
      //stopPopupBody,
    }),
  });

  console.log("data now is", data);

  const AddProductButton = useCallback(() => {
    return (
      <AlbaButton
        variant="success"
        icon="add"
        onClick={() => {
          openAddModal();
        }}
      >
        Add Product
      </AlbaButton>
    );
  }, []);

  return (
    <div className="table-wrapper">
      <Table
        tableProps={{
          ...tableProps,
          totalCount,
          data,
          handleSearch,
          // onReload,
          title: "Products",
          actionComponents,
        }}
      />
    </div>
  );
}
export default PlatformProductTable;
