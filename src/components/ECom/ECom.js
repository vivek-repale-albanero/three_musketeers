import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Icon,
  Container,
  Checkbox,
  Card,
  Typography,
  Box,
} from "@material-ui/core";
import {AlbaButton } from '@platform/service-ui-libraries'
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
  //const [cartData,setCartData] = useState([]);
  useEffect(() => {
    console.log(
      "Use effect called for page ",
      page,
      " and pagesize is ",
      pageSize
    );
    fetch(`http://localhost:3000/products?_page=${page+1}&_limit=${pageSize}` )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [page, pageSize]);
  

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
    fetch(`http://localhost:3000/products?_page=${page+1}&_limit=${pageSize}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };
  const openEditModaL = (product) => {
    console.log("edit is running", product);
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
      console.log(error);
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
          console.error("Error:", error);
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
          console.error("Error:", error);
        });
    }
    closeModal();
  };

  const productPageValue = useMemo(() => {
    return { productFormModal, products, saveProductData, closeModal };
  }, [productFormModal, products, saveProductData, closeModal]);

  //Cart
  const handleAddToCart = (product) => {
    fetch(`http://localhost:3000/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => setCartChanged(true))
      .catch((error) => {
        console.error("Error:", error);
      });
    //setCartData([...cartData,product])
  };

  //Action object for MUI based table
  const actions = () => {
    return { openEditModaL, deleteProduct, handleAddToCart };
  };
  return (
    <div>
      <ProductsContext.Provider value={productPageValue}>
        <Box className="title" style={{ display: "flex" }}>
          <Typography style={{ fontSize: "24px" }}>E-Com</Typography>
          <Button variant="contained" className="addBtn" onClick={openAddModal}>
            Add Product
          </Button>
          {productFormModal.status && !productFormModal.edit ? (
            <EditProductForm />
          ) : null}
        </Box>
        <Container maxWidth="100%" className="tableContent">
          {/* <TableMUI actions={actions} products={products} productFormModal={productFormModal}/> */}
          <PlatformAutoComplete products={products} setProducts={setProducts}/>
          <PlatformProductTable
            products={products}
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

        <AlbaButton
          variant="contained"
          classNamAlbaButtone="addBtn"
          onClick={openCartModal}
          disabled={products.length === 0}
        >
          Show Cart
        </AlbaButton>
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
