import { Table,
    Link,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Icon,
    } from "@material-ui/core";
import React from "react";
import EditProductForm from "../EditForm/EditProductForm";

export default function TableMUI({actions,products,productFormModal}) {
    const {handleAddToCart,openEditModaL,deleteProduct}=actions()
    console.log(products)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ background: "rgb(42 139 139)" }}>
          <TableRow>
            <TableCell
              style={{ color: "rgb(224 224 224)", textAlign: "center" }}
            >
              Id
            </TableCell>
            <TableCell
              style={{ color: "rgb(224 224 224)", textAlign: "center" }}
            >
              Name
            </TableCell>
            <TableCell
              style={{ color: "rgb(224 224 224)", textAlign: "center" }}
            >
              Price
            </TableCell>
            <TableCell
              style={{ color: "rgb(224 224 224)", textAlign: "center" }}
            >
              Quantity
            </TableCell>
            <TableCell
              style={{ color: "rgb(224 224 224)", textAlign: "center" }}
            >
              Type
            </TableCell>
            <TableCell
              style={{ color: "rgb(224 224 224)", textAlign: "center" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell style={{ textAlign: "center" }}>{index + 1}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {product.name}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {product.price}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {product.quantity}
              </TableCell>{" "}
              <TableCell style={{ textAlign: "center" }}>
                {product.type}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <>
                  <Button
                    className="actionBtn"
                    onClick={() => openEditModaL(product)}
                  >
                    <Icon>edit_note</Icon>
                  </Button>
                  {productFormModal.status && productFormModal.edit ? (
                    <EditProductForm />
                  ) : null}
                  {/* <Link
                            href={
                              currentproduct && currentproduct.id == product.id
                                ? `/products/authorization/${product.id}`
                                : authMsgFn()
                            }
                            disabled={currentproduct && currentproduct.id == product.id}
                          >
                            <Button className="actionBtn">
                              <Icon>key</Icon>
                            </Button>
                          </Link> */}
                  <Button
                    className="actionBtn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Icon>delete</Icon>
                  </Button>

                  <Button
                    className="actionBtn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Icon>shop</Icon>
                  </Button>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
