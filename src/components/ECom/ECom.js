import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Icon,
  Container,
  Checkbox,
  Card,
  Typography,
  Box,
} from "@material-ui/core";
import { AlbaButton } from "@platform/service-ui-libraries";
import BreadCrumb from "../Breadcrumbs/BreadCrumb";
import EditForm from "../EditForm/EditForm";
import { ProductsContext } from "../../Context";
import EditProductForm from "../EditForm/EditProductForm";
import Cart from "./Cart";
import TableMUI from "./MUITable";
import PlatformProductTable from "./PlatformProductTable";
import PlatformAutoComplete from "./PlatformAutoComplete";

function ECom() {
  const [productFormModal, setProductFormModal] = useState({
    status: false,
    edit: false,
    data: {},
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  //const [newProduct, setNewProduct] = useState({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartChanged, setCartChanged] = useState(false);

  //gonna optimize in a while
  const fetchTableData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/products?_page=${page + 1}&_limit=${pageSize}`
      );
      const jsonRes = await res.json();
      //console.log('data being fetched',jsonRes)
      setProducts(jsonRes);
    } catch (error) {
      //console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, [page, pageSize,cartChanged]);

  // const fetchCartData = useCallback(async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/cart`);
  //     const jsonResponse = await response.json();
  //     setCartData(jsonResponse)
  //   } catch (error) {
  //     //console.log("error", error);
  //   }
  // },[]);

  const openAddModal = () => {
    setProductFormModal({
      ...productFormModal,
      status: true,
      edit: false,
      data: {},
    });
  };
  const openCartModal = () => setShowCartModal(true);
  const closeCartModal = () => {
    setShowCartModal(false);
  };
  const closeModal = () => {
    setProductFormModal({
      ...productFormModal,
      status: false,
      edit: false,
      data: {},
    });
  };

  const afterEdit = () => {
    fetch(`http://localhost:3000/products?_page=${page + 1}&_limit=${pageSize}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };
  const openEditModaL = (product) => {
    //console.log("edit is running", product);
    setProductFormModal({
      ...productFormModal,
      status: true,
      edit: true,
      data: product,
    });
  };

  const deleteProduct = async (productId) => {
    try {
      const responseProduct = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      afterEdit();

      const reponse2 = await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
      });
      setCartChanged(true);
    } catch (error) {
      //console.log(error);
    }

    //setCartData(cartData.filter((item) => item.id !== productId))
  };

  const saveProductData = (editedProductData) => {
    if (!editedProductData) return;
    if (!productFormModal.edit) {
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProductData),
      })
        .then((response) => afterEdit())
        .catch((error) => {
          //console.error("Error:", error);
        });
      // const updatedUsers = [...users,editedUserData]
      //    setUsers(updatedUsers)
    } else {
      const updatedProduct = editedProductData;
      const updatedProductsList = products
        .map((product) =>
          product.id === updatedProduct.id ? { ...updatedProduct } : product
        )
        .filter((product) => product.id === updatedProduct.id);
      fetch(`http://localhost:3000/products/${updatedProductsList[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductsList[0]),
      })
        .then((response) => afterEdit())
        .catch((error) => {
          //console.error("Error:", error);
        });
    }
    closeModal();
  };

  const productPageValue = useMemo(() => {
    return { productFormModal, products, saveProductData, closeModal };
  }, [productFormModal, products, saveProductData, closeModal]);

  const handleAddToCart = async (product) => {
    setCartChanged(false)
    try {
      const response = await fetch(
        `http://localhost:3000/cart?name=${product.name}`
      );
      const cartProduct = await response.json();
      const modifiedCartProduct =
        cartProduct.length > 0
          ? {
              ...cartProduct[0],
              number: cartProduct[0].number + 1,
            }
          : {
              ...product,
              number: 1,
            };
      //console.log("cart product modified is", modifiedCartProduct);
      const fetchedProductWithId = await fetch(
        `http://localhost:3000/products/${product.id}`
      );
      const fetchedProductWithIdJson = await fetchedProductWithId.json();
      const productFetchResponse = await fetch(
        `http://localhost:3000/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...fetchedProductWithIdJson,
            quantity: Math.max(fetchedProductWithIdJson.quantity - 1, 0),
          }),
        }
      );
      const updatedProduct = await productFetchResponse.json();

      //if the product which is to be added is already present in cart, we r gonna patch
      //else we just post the new product to cart
      if (cartProduct.length > 0) {
        const cartEditResponse = await fetch(
          `http://localhost:3000/cart/${modifiedCartProduct.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(modifiedCartProduct),
          }
        );
        const updatedCartProduct = await cartEditResponse.json();
        //console.log("cart product updated is", updatedCartProduct);
      } else {
        const cartPostResponse = await fetch(`http://localhost:3000/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifiedCartProduct),
        });
        const cartPostResponseJson = await cartPostResponse.json();
        //console.log("cart product updated is", cartPostResponseJson);
      }

      setCartChanged(true);
    } catch (error) {
      //console.log("error", error);
    }

    //setCartData([...cartData,product])
  };
  //console.log("data we r getting", products,'and cartchanged is ',cartChanged);

  //Action object for MUI based table
  const actions = () => {
    return { openAddModal, openEditModaL, deleteProduct, handleAddToCart };
  };
  return (
    <div>
      <ProductsContext.Provider value={productPageValue}>
        <Box className="title" style={{ display: "flex" }}>
          <Typography style={{ fontSize: "24px" }}>E-Com</Typography>
          {/* <Button variant="contained" className="addBtn" onClick={openAddModal}>
            Add Product
          </Button> */}
          {productFormModal.status && !productFormModal.edit ? (
            <EditProductForm />
          ) : null}
        </Box>
        <Container maxWidth="100%" className="tableContent">
          {/* <TableMUI actions={actions} products={products} productFormModal={productFormModal}/> */}
          {/* <PlatformAutoComplete products={products} setProducts={setProducts}/> */}
          <PlatformProductTable
            products={products}
            setProducts={setProducts}
            actions={actions}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
          {productFormModal.status && productFormModal.edit ? (
            <EditProductForm />
          ) : null}
        </Container>
        <div style={{ width: "100%", textAlign: "center" }}>
          <AlbaButton
            variant="contained"
            classNamAlbaButtone="addBtn"
            onClick={openCartModal}
            disabled={products.length === 0}
          >
            Show Cart
          </AlbaButton>
        </div>

        {showCartModal && (
          <Cart
            cartDidChange={cartChanged}
            onCartChange={setCartChanged}
            onClose={closeCartModal}
            open={showCartModal}
          />
        )}
      </ProductsContext.Provider>
    </div>
  );
}

export default ECom;

//Modal
//TextForm with validations
//Table
