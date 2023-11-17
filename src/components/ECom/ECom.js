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
import { AlbaButton, ShowSnackbar } from "@platform/service-ui-libraries";
import BreadCrumb from "../Breadcrumbs/BreadCrumb";
import EditForm from "../EditForm/EditForm";
import { ProductsContext } from "../../Context";
import EditProductForm from "../EditForm/EditProductForm";
import Cart from "./Cart";
import TableMUI from "./MUITable";
import PlatformProductTable from "./PlatformProductTable";
import PlatformAutoComplete from "./PlatformAutoComplete";
import {
  fetchCartProductWithName,
  fetchProductWithId,
  editProductWithId,
  addProductInCart,
} from "../../api/api";

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
  const [operationPerformedInCart, setOperationPerformedInCart] =
    useState(false);

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
  }, [page, pageSize, cartChanged, operationPerformedInCart]);

  // const fetchCartData = useCallback(async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/cart`);
  //     const jsonResponse = await response.json();
  //     setCartData(jsonResponse)
  //   } catch (error) {
  //     //console.log("error", error);
  //   }
  // },[]);
  useEffect(()=>{
    console.log(
      "Use effect called for page ",
      page,
      " and pagesize is ",
      pageSize
    );
    fetch(`http://localhost:3000/products?_page=${page + 1}&_limit=${pageSize}`)
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
  const showAlert=()=>{
    alert("Can't be added!")
  }
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
  console.log(ShowSnackbar);
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

  //fetchCartProductWithName fetchProductWithId editProductWithId addProductInCart
  const fetchCartProduct = async (prodName) => {
    const { response, error } = await fetchCartProductWithName(prodName);
    if (response.request.status === 200) return response.data;
    else return { error };
  };
  const fetchProduct = async (id) => {
    const { response, error } = await fetchProductWithId(id);
    if (response.request.status === 200) return response.data;
    else return { error };
  };
  const editProduct = async (id, product) => {
    const { response, error } = await editProductWithId(prodName);
    if (response.request.status === 200) return response.data;
    else return { error };
  };
  const addInCart = async (prod) => {
    const { response, error } = await addProductInCart(prod);
    if (response.request.status === 200) return response.data;
    else return { error };
  };

  const handleAddToCart = async (product) => {
    
    if (product.quantity > 0) {
      setCartChanged(false);
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
    }
    else{
      showAlert()
    }
  }
    //setCartData([...cartData,product])
  
  //Cart
  // const handleAddToCart = async (product) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/cart`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(product),
  //     });
  //     const jsonResonse = await response.json();
  //     setCartChanged(true);
  //     // console.log("Snack bar should have run!");
     
  //     // ShowSnackbar(true,"success", "Added to cart!");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     //ShowSnackbar(false,'error', "Something went wrong!");
  //   }
  // };
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
          {/* <PlatformAutoComplete products={products} setProducts={setProducts} /> */}
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AlbaButton
            className="__showCartBtn"
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
            onOperationPerformed={setOperationPerformedInCart}
          />
        )}
      </ProductsContext.Provider>
    </div>
  );
}

export default ECom;


