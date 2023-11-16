import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { Table } from "@platform/primary-table";

import {
  Modal,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Icon,
  Divider,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@platform/service-ui-libraries";

function Cart({ onClose, onCartChange, cartDidChange, open }) {
  const [data, setData] = useState([]);
  const [buttonActionPerformed, setButtonActionPerformed] = useState(false);

  const fetchData = () => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  console.log("data in the cart", data);
  useEffect(() => {
    fetchData();
    setButtonActionPerformed(false);
  }, [buttonActionPerformed]);

  useEffect(() => {
    cartDidChange && fetchData();

    onCartChange(false);
  }, [cartDidChange]);

  const handleRemoveFromCart = (id) => {
    fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => onCartChange(true))
      .catch((err) => console.log(err));
  };
  //on the popup what I need is 2 fields to bd added which are product type(select) and quantity

  const handleIncreaseItemQuantity = async (id, item) => {
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
      console.log("after update in increse", updatedCartProduct);
      setButtonActionPerformed(true);
    } catch (error) {
      console.log("error in increasing item", error);
    }
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
              icon: "remove",
              title: "Remove product",
              componentId: "DELETE_ROW",
              onClick: (row) => actions.handleDelete(row.id),
            },
            {
              icon: "edit",
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
    // onChangePage: (e, page) => actions.onPageChange(page),
    // onChangeRowsPerPage: (size, page) => {
    //   console.log("page is", page, " and page size is ", size);
    //   actions.onRowsChange(size, page);
    // },
    // //deleteRecords: (recordIds) => actions.handleDelete(recordIds),
    // numericPagination: true,
    // setSelected:items=>actions.handleAddAllToCart(items)
    //deleteRecords:recordIds=>actions.handleAddAllToCart(recordIds)
  });
  const [tableProps, setTableProps] = useState({
    ...CartTableMetadata({
      handleDelete: handleRemoveFromCart,
      handleDecrease: handleDecreaseItemQuantity,
      handleIncrease: handleIncreaseItemQuantity,
      //onRowsChange: handleOnChangePageSize,
      //onStopClick,
      //rerunIntegrityAnalysis,
      //stopPopupBody,
    }),
  });

  const handleDecreaseItemQuantity = async (id, item) => {
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
      } catch (error) {
        console.log("error in decreasin item", error);
      }
    }
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
        <div className="__table__wrapper">
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
      </div>
    </Drawer>
  );
}

export default Cart;
