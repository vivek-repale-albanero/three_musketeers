import React, { useContext, useRef, useState } from "react";
// import {

// } from "@material-ui/core";
import "./EditForm.scss";
import { ProductsContext } from "../../Context";
import * as comps from "@platform/service-ui-libraries";
import {
  AlbaButton,
  //Icon,
  Dialog,
  DialogTitle,
  DialogActions,
  DraggableModal,
  IconButton,
  InputLabel,
  Paper,
  Modal,
  Button,
  Icon,
  Select,
  MenuItem,
  Menu,
  Typography,
  TextForm,
  SelectForm,
  DialogContent,
  FormControl,
  Form,
} from "@platform/service-ui-libraries";

console.log(comps);
function EditProductForm() {
  console.log(comps);

  const { productFormModal, saveProductData, closeModal } =
    useContext(ProductsContext);
  const [editProductData, setEditProductData] = useState(productFormModal.data);
  console.log("Data in the modal", editProductData);
  const types = ["personal", "official", "sports", "entertainment"];
  const validateFields = useRef([]);

  const validateProfileForm = () => {
    const resultData = validateFields.current.map((ref) => {
      console.log(ref);
      if (!ref) return true;
      else return ref?.checkValidation();
    });
    return resultData.every(Boolean);
  };
  const handleSave = () => {
    if (validateProfileForm()) {
      saveProductData(editProductData);
    }
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleNameValidation = (input) => {
    console.log(input);
    if (input.length < 5) return "Input must be of atleast 5 characters";
  };

  return (
    // <Modal
    //   open={productFormModal.status}
    //   onClose={closeModal}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    //   <Paper className="modalContainer">
    //     <div className="modalTitleContainer">
    //       <Typography variant="h6" className="modalHeading">
    //         {productFormModal.edit ? "Edit Product" : "Add Product"}
    //       </Typography>
    //       <IconButton className="closeIcon" onClick={closeModal}>
    //         <Icon>close</Icon>
    //       </IconButton>
    //     </div>
    //     <form className="editForm">
    //       <TextForm
    //         id="outlined-helperText"
    //         label="Product name"
    //         value={editProductData.name}
    //         onChange={(e) =>
    //           setEditProductData({
    //             ...editProductData,
    //             name: e.target.value,
    //           })
    //         }
    //       />
    //       <TextForm
    //         id="outlined-helperText"
    //         label="Price"
    //         type="number"
    //         value={editProductData.price}
    //         onChange={(e) =>
    //           setEditProductData({
    //             ...editProductData,
    //             price: parseFloat(e.target.value),
    //           })
    //         }
    //       />
    //       <TextForm
    //         id="outlined-helperText"
    //         label="Quantity"
    //         type="number"
    //         value={editProductData.quantity}
    //         onChange={(e) =>
    //           setEditProductData({
    //             ...editProductData,
    //             quantity: parseFloat(e.target.value),
    //           })
    //         }
    //       />
    //       <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
    //         <InputLabel id="demo-simple-select-standard-label">
    //           Select type
    //         </InputLabel>

    //         <Select
    //           labelId="demo-simple-select-standard-label"
    //           id="demo-simple-select-standard-label"
    //           value={editProductData.type}
    //           label="Select type"
    //           MenuProps={MenuProps}
    //           onChange={(e) => {
    //             setEditProductData({
    //               ...editProductData,
    //               type: e.target.value,
    //             });
    //             console.log(e);
    //           }}
    //         >
    //           {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
    //           {types.map((type) =>
    //             (
    //               <MenuItem key={type} value={type}>
    //                 {type}
    //               </MenuItem>
    //             )
    //           )}
    //           {/* </div> */}
    //         </Select>
    //       </FormControl>
    //       <br />
    //       <div className="buttonContainer">
    //         <Button className="cancelBtn" onClick={closeModal}>
    //           Cancel
    //         </Button>
    //         <Button className="saveBtn" onClick={handleSave}>
    //           Save
    //         </Button>
    //       </div>
    //     </form>
    //   </Paper>
    // </Modal>
    // <div className="__add-product__modal">
<div className="__add_product__modal">

    <Dialog
      open={productFormModal.status}
      onClose={closeModal}
      className="compare-files-dialog aw-dialog appModal"
      PaperComponent={DraggableModal}
      maxWidth={"sm"}
    >
      <div className="__modal__wrapper">
        <DialogTitle id="draggable-dialog-title">
          <div className="__modal__title">
            <Typography className="__text al-ellipsis" variant="h6">
              {productFormModal.edit ? "Edit Product" : "Add Product"}
            </Typography>

            <IconButton onClick={closeModal}>
              <Icon>close</Icon>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent id="draggable-dialog-content">
          <div className="__modal__form__wrapper">
            <div className="__modal__body">
              <TextForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                validationFunc={(inputData) => handleNameValidation(inputData)}
                ref={(elem) => {
                  validateFields.current[0] = elem;
                }}
                id="outlined-helperText"
                label="Product name"
                fieldValue={editProductData.name}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    name: e,
                  })
                }
                variant="filled"
              />
            </div>

            <div className="__modal__body">
              <TextForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                ref={(elem) => {
                  validateFields.current[1] = elem;
                }}
                id="outlined-helperText"
                label="Price"
                type="number"
                fieldValue={editProductData.price}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    price: parseFloat(e),
                  })
                }
              />
            </div>
            <div className="__modal__body">
              <TextForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                ref={(elem) => {
                  validateFields.current[2] = elem;
                }}
                id="outlined-helperText"
                label="Quantity"
                type="number"
                fieldValue={editProductData.quantity}
                onChange={(e) =>
                  setEditProductData({
                    ...editProductData,
                    quantity: parseFloat(e),
                  })
                }
              />
            </div>

            <div className="__modal__body">
              <SelectForm
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                ref={(elem) => {
                  validateFields.current[4] = elem;
                }}
                fieldValue={editProductData.type}
                label="Select type"
                placeholder="Select"
                onChange={(e) => {
                  console.log("onchange", e);
                  setEditProductData({
                    ...editProductData,
                    type: e,
                  });
                }}
                options={types.map((type) => {
                  return { label: type, value: type };
                })}
              />
            </div>

            {/* <br /> */}
            <div className="__modal__form_button__wrapper">
              <AlbaButton variant="danger" onClick={closeModal}>
                Cancel
              </AlbaButton>
              <AlbaButton variant="success" onClick={handleSave}>
                Save
              </AlbaButton>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
    </div>


    // </div>
  );
}

export default EditProductForm;
