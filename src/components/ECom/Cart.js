import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { Table } from "@platform/primary-table";

import { Typography, Drawer } from "@platform/service-ui-libraries";
import { editProductWithId, fetchCartData } from "../../api/api";

function Cart({
  onClose,
  onCartChange,
  cartDidChange,
  open,
  onOperationPerformed,
}) {
  const [data, setData] = useState([]);
  const [buttonActionPerformed, setButtonActionPerformed] = useState(false);
  const [page, setPage] = useState(0);
  //const [totalAmount, setTotalAmount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const showAlert = () => {
    alert("This product is no more available. Sorry!");
  };
  const fetchData = async () => {
    const { response, error } = await fetchCartData(page, pageSize);
    if (response.request.status === 200) {
      setData(response.data);
    } else {
      console.log("error fetching cartData", error);
    }
  };
  console.log("data in the cart", data);



  useEffect(() => {
    onOperationPerformed(false);
  }, []);
  useEffect(() => {
    fetchData();
    calculateTotalAmount();
    setButtonActionPerformed(false);
  }, [buttonActionPerformed, page, pageSize]);

  useEffect(() => {
    cartDidChange && fetchData();
    calculateTotalAmount();
    onCartChange(false);
  }, [cartDidChange]);

  const handleRemoveFromCart = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();
      onCartChange(true);
      onOperationPerformed(true);
    } catch (error) {
      console.log("error in removing item", error);
    }
  };

  const fetchProductFromListByName = async (productName) => {
    const response = await fetch(
      `http://localhost:3000/products?name=${productName}`
    );
    const jsonResponse = await response.json();

    return jsonResponse[0];
  };

  const editProductInList = async (id, product) => {
    const { response, error } = await editProductWithId(id, product);
    if (response.request.status === 200) {
      return response.data;
    } else {
      console.log(
        "error occured while editing product detail in editProductInList",
        error
      );
    }
  };

  const handleIncreaseItemQuantity = async (item, id) => {
    const fetchedProductFromList = await fetchProductFromListByName(item.name);

    if (fetchedProductFromList.quantity > 0) {
      const modifiedItem = {
        ...item,
        number: item.number + 1,
      };
      try {
        const cartIncreaseResponse = await fetch(
          `http://localhost:3000/cart/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(modifiedItem),
          }
        );
        const updatedCartProduct = await cartIncreaseResponse.json();

        //once product is added in the cart, remove it from the list; update the product in list
        const updatedProductData = {
          ...fetchedProductFromList,
          quantity: Math.max(fetchedProductFromList.quantity - 1, 0),
        };
        const updatedProduct = await editProductInList(
          fetchedProductFromList.id,
          updatedProductData
        );
        console.log(
          "after performing add one in cart updated product in list",
          updatedProduct
        );
        onOperationPerformed(true);
        setButtonActionPerformed(true);
      } catch (error) {
        console.log("error in increasing item", error);
      }
    } else {
      showAlert();
      window.alert("This product is not available for now. Sorry!");
    }
  };

  const handleDecreaseItemQuantity = async (item, id) => {
    console.log("Decreasing item quantity in cart", item);
    if (item.number == 1) {
      handleRemoveFromCart(id);
    } else {
      const modifiedItem = {
        ...item,
        number: item.number - 1,
      };
      try {
        const cartDecreaseResponse = await fetch(
          `http://localhost:3000/cart/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(modifiedItem),
          }
        );
        const updatedCartProduct = await cartDecreaseResponse.json();
        console.log("after update in increse", updatedCartProduct);
        setButtonActionPerformed(true);
        onOperationPerformed(true);
      } catch (error) {
        console.log("error in decreasin item", error);
      }
    }
  };
  const handleOnChangePage = (page) => {
    console.log("page change is clicked");
    setPage(page);
  };
  const handleOnChangePageSize = (pageSize, page) => {
    console.log("pagesize change is clicked");
    setPageSize(pageSize);
    setPage(page);
  };
  // Cart Table metadata
  const CartTableMetadata = (actions) => ({
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
      { name: "Quantity", id: "number" },

      {
        name: "Actions",
        isComponent: true,
        componentId: "ACTION_PANEL",
        props: {
          actions: [
            {
              icon: "delete",
              title: "Remove product",
              componentId: "DELETE_ROW",
              onClick: (row) => actions.handleDelete(row.id),
            },
            {
              icon: "remove",
              title: "Remove one",
              componentId: "CLICK_ACTION",
              onClick: (row) => {
                actions.handleDecrease(row, row.id);
              },
            },
            {
              icon: "add",
              title: "Add one",
              componentId: "CLICK_ACTION",
              onClick: (row) => {
                actions.handleIncrease(row, row.id);
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
    //handleSearch: actions?.handleSearch,
    pagination: true,
    reload: true,
    selectRecordsFunctionality: true,
    //onReload: actions?.onReload,
    onChangePage: (e, page) => actions.onPageChange(page),
    onChangeRowsPerPage: (size, page) => {
      console.log("page is", page, " and page size is ", size);
      actions.onRowsChange(size, page);
    },
    numericPagination: true,
  });
  const [tableProps, setTableProps] = useState({
    ...CartTableMetadata({
      handleDelete: handleRemoveFromCart,
      handleDecrease: handleDecreaseItemQuantity,
      handleIncrease: handleIncreaseItemQuantity,
      onPageChange: handleOnChangePage,
      onRowsChange: handleOnChangePageSize,
      //onStopClick,
      //rerunIntegrityAnalysis,
      //stopPopupBody,
    }),
  });

  const calculateTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].number * data[i].price;
      //console.log(total)
    }
    return total;
    //setTotalAmount(total);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      //sx={{ height: "250px" }}
    >
      <div className="__modal__wrapper">
        <Typography variant="h4" component="h6" align="center">
          {" "}
          Shopping Cart
        </Typography>
        <div>
          <Table
            tableProps={{
              ...tableProps,
              data,
              // handleSearch,
              // onReload,
              title: "Cart",
              //actionComponents,
              //handleAddAllToCart:handleSelected
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" component="h2">
            Grand Total: Rs. {calculateTotalAmount()}
          </Typography>
        </div>
      </div>
    </Drawer>
  );
}

export default Cart;
