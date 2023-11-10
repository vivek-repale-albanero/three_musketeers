import React, { useState, useEffect, useCallback, useContext } from "react";
import { Table } from "@platform/primary-table";
import { Typography } from "@material-ui/core";
import {AlbaButton} from '@platform/service-ui-libraries'
import { ProductsTableMetadata } from "./ProductsTableMetadata";

function PlatformProductTable({products,actions,page,pageSize,setPage,setPageSize}) {
  
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [totalCount, setTotalCount] = useState("");
  const [integrityAnalysis, setIntegrityAnalysis] = useState(false);
  const [idForRerun, setIdForRerun] = useState("");
  const [actionComponents, setActionComponents] = useState([]);

  const {openEditModaL,deleteProduct,handleAddToCart}=actions()

  
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
  
  const [tableProps, setTableProps] = useState({
    ...ProductsTableMetadata({
      handleDelete: deleteProduct,
      handleEdit:openEditModaL,
      handleAddToCart:handleAddToCart,
      onPageChange: handleOnChangePage,
      onRowsChange: handleOnChangePageSize,
      //onStopClick,
      //rerunIntegrityAnalysis,
      //stopPopupBody,
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
  

  return (
    <div className="table-wrapper">
      <Table
        tableProps={{
          ...tableProps,
          totalCount: totalCount,
          data: products,
          //handleSearch: handleSearch,
          onReload,
          title: "Products",
          actionComponents: actionComponents,
        }}
      />
    </div>
  );
}
export default PlatformProductTable;
