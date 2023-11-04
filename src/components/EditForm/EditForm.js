import React, { useContext, useState } from "react";
import { Modal, TextField, Button, Paper, Typography, IconButton, Icon } from "@material-ui/core";
import "./EditForm.scss"



function EditForm({userFormModal,closeModal,saveUserData}) {
    
   const [editUserData,setEditUserData] = useState(userFormModal.data)
   
    //add or edit
    // useEffect(()=>(),[])
    // function handleChange(e){
         
    
     const handleSave=()=>{
      saveUserData(editUserData)
     }
    return (
        <Modal
            open={userFormModal.status}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper className="modalContainer">
                <div className="modalTitleContainer">
                    <Typography variant="h6" className="modalHeading">
                      { userFormModal.edit?"Edit Details":"Add User" }  
                    </Typography>
                    <IconButton className="closeIcon"
                     onClick={closeModal}
                     >
                        <Icon>
                            close
                        </Icon>
                    </IconButton>
                </div>
                <form className="editForm">
                    <TextField
                        id="outlined-helperText"
                        label="First Name"
                        value={editUserData.user.firstName}
                        onChange={(e) =>
                          setEditUserData({
                              ...editUserData,
                              user: { ...editUserData.user, firstName: e.target.value },
                            })
                          }
                    />
                    <TextField
                        id="outlined-helperText"
                        label="Last Name"
                        value={editUserData.user.lastName}
                        onChange={(e) =>
                          setEditUserData({
                              ...editUserData,
                              user: { ...editUserData.user, lastName: e.target.value },
                            })
                          }
                       />
                    <TextField
                        id="outlined-helperText"
                        label="UserName"
                        value={editUserData.user.userName}
                        onChange={(e) =>
                          setEditUserData({
                              ...editUserData,
                              user: { ...editUserData.user, userName: e.target.value },
                            })
                          }
                       />
                    <TextField
                        id="outlined-helperText"
                        label="Email-Id"
                        value={editUserData.email}
                        onChange={(e) =>
                          setEditUserData({
                              ...editUserData,
                              email: e.target.value ,
                            })
                          }
                     />
                    <TextField
                        id="outlined-helperText"
                        label="password"
                        value={editUserData.password}
                        onChange={(e) =>
                          setEditUserData({
                              ...editUserData,
                              password: e.target.value ,
                            })
                          }
                    />
                    <TextField
                        id="outlined-helperText"
                        label="Age"
                        value={editUserData.age}
                        onChange={(e) =>
                          setEditUserData({
                              ...editUserData,
                              age: e.target.value ,
                            })
                          }
                     />
                    <br />
                    <div className="buttonContainer">
                    <Button className="cancelBtn" 
                    onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button className="saveBtn"
                    onClick={handleSave}
                    >
                        Save
                    </Button>
                    </div>
                </form>
                
                
            </Paper>
        </Modal>
    )
}

export default EditForm