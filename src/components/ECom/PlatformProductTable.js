import React, { useState, useEffect, useCallback, useContext } from "react";
import { Table } from "@platform/primary-table";
import { Typography } from "@material-ui/core";
import { AlbaButton } from "@platform/service-ui-libraries";
import { ProductsTableMetadata } from "./ProductsTableMetadata";
import { fetchProducts } from "../../api/api";

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
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const [actionComponents, setActionComponents] = useState([]);

  const { openEditModaL, deleteProduct, handleAddToCart, openAddModal } =
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
    // console.log('fetch data is called!')
    //console.log('reponse',response.request.status)
    if (response.request.status === 200) {
      setData(response.data);
    } else {
      console.log("error fetching data", error);
    }
  };

  //console.log('Products table data',products)
  useEffect(() => {
    //this use effect is gonna run for the first time no matter the dependencies.
    fetchData(page, pageSize);
  }, [searchText, page, pageSize]);

  useEffect(() => {
    //fetchData();
    setActionComponents([AddProductButton]);
  }, []);

  useEffect(() => {
    const filteredProducts = data?.filter((item) =>
      item.name?.toLowerCase().startsWith(searchText)
    );
    // console.log("filtered products", filteredProducts);
    setProducts(filteredProducts);
  }, [searchText, data]);

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
  const handleSelected = (elems) => console.log(elems);
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
  // console.log("data now is", data);

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
      <div className="__table__body">
        <Table
          tableProps={{
            ...tableProps,
            totalCount,
            data: products,
            handleSearch,
            // onReload,
            title: "Products",
            actionComponents,
            //handleAddAllToCart:handleSelected
          }}
        />
      </div>
    </div>
  );
}
export default PlatformProductTable;
