import React, { useState, useEffect, useCallback, useContext } from "react";
import { Table } from "@platform/primary-table";
import { Typography } from "@material-ui/core";
import { AlbaButton } from "@platform/service-ui-libraries";
import { ProductsTableMetadata } from "./ProductsTableMetadata";
import { fetchProductsData } from "../../api/api";

function PlatformProductTable({
  products,
  setProducts,
  actions,
  setPage,
  setPageSize,
  page,
  pageSize,
}) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [totalCount, setTotalCount] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const [actionComponents, setActionComponents] = useState([]);

  const { openEditModaL, deleteProduct, handleAddToCart, openAddModal } =
    actions();

  const fetchData = async (page, pageSize) => {
    // we fetch data and update setData here
    try {
      const { response, error } = await fetchProductsData(page, pageSize);
      if (response.status === 200) setAllProducts(response.data);
      else console.log("error fetching data", error);
    } catch (error) {
      console.log("Somthing wrong in api call", error);
    }
  };
  console.log("hello", fetchData());
  const handleOnChangePage = (page) => {
    setPage(page);
  };
  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
    setPage(page);
  };
  const AddProductButton = useCallback(() => {
    return (
      <AlbaButton variant="success" icon="add" onClick={openAddModal}>
        Add product
      </AlbaButton>
    );
  });
  useEffect(() => {
    setActionComponents([AddProductButton]);
    fetchData(page, pageSize);
  }, [page, pageSize]);

  // const handleDelete = (ids) => {
  //   deleteIntegrityData({ ids }).then((res) => {
  //     if (res?.response?.data?.success) {
  //       ShowSnackbar(true, "success", res.response.data.message);
  //       setProducts(fetchData());
  //     } else {
  //       ShowSnackbar(true, "error", res?.error?.response.data.message);
  //     }
  //   });
  // };
  const onReload = async () => {
    if (searchText.length > 2) {
      handleSearch(searchText);
    } else {
      setProducts(fetchData());
    }
  };

  useEffect(() => {
    const filteredProducts = allProducts.filter((item) =>
      item.name?.toLowerCase().startsWith(searchText)
    );

    if (filteredProducts?.length > 0) {
      setProducts(filteredProducts);
      console.log("entered here");
    } else {
      setProducts([]);
    }

    console.log("reached uef search filterd data is", filteredProducts);
  }, [searchText]);

  const handleSearch = useCallback((searchInput) => {
    setSearchText(searchInput);
  }, []);
  console.log("products is", products);
  // const handleSearch = useCallback(
  //   (searchText) => {
  //     setSearchText(searchText);
  //     if (searchText?.length > 2) {
  //       searchIntegrityAnalysis({
  //         searchText: searchText,
  //         page: page,
  //         pageSize: pageSize,
  //         handleResponse: ({ response }) => {
  //           if (response?.data?.payload) {
  //             setData(
  //               response?.data?.payload?.data?.map((item) => ({
  //                 ...item,
  //                 ...(item.status === "Stopped" && {
  //                   stoppedBy: item.createdBy,
  //                 }),
  //               })) || []
  //             );
  //             setTotalCount(response?.data?.payload?.totalCount);
  //           }
  //         },
  //       });
  //     } else if (!searchText?.length && page == 0) {
  //       setProducts(fetchData());
  //     }
  //   },
  //   [searchText, page, pageSize]
  // );
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
      actionComponents: actionComponents,
      handleSearch,

      //onStopClick,
      //rerunIntegrityAnalysis,
      //stopPopupBody,
    }),
  });

  // useEffect(() => {
  //   if (searchText.length > 2) {
  //     handleSearch(searchText);
  //   } else {
  //     setProducts(fetchData());
  //   }
  // }, [page, pageSize]);

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

  return (
    <div className="table-wrapper">
      <Table
        tableProps={{
          ...tableProps,
          totalCount: totalCount,
          data: products,
          handleSearch: handleSearch,
          onReload,
          title: "Products",
          actionComponents: actionComponents,
        }}
      />
    </div>
  );
}
export default PlatformProductTable;
