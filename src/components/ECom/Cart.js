import React, { useContext, useEffect, useState } from "react";
import "./Cart.scss";

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
} from '@platform/service-ui-libraries'

function Cart({ onClose, onCartChange, cartDidChange, open }) {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  useEffect(() => {
    fetchData();
  }, []);
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

  return (
    <div className="__cart__modal">
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        //sx={{ height: "250px" }}
      >
        <div className="__modal__content">

        <Typography variant="h4" component="h6" align="center">
          {" "}
          Shopping Cart
        </Typography>
        <List>
          {data?.map((item) => (
            <ListItem
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <ListItemText >
                <Typography>{item.name}</Typography>
                <Typography>{item.price}</Typography>
              </ListItemText>

              <Button
                variant="contained"
                className="addBtn"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
          {data.length === 0 && (
            <p style={{ textAlign: "center" }}>Please add a product!</p>
          )}
        </List>
        </div>

      </Drawer>{" "}
    </div>
  );
}

export default Cart;
