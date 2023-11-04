import React, { useContext } from "react";
import { Modal, TextField, Button, Paper, Typography, IconButton, Icon } from "@material-ui/core";
import "./EditForm.scss"



function EditForm({userDetails,userFormModal,closeEditModal,saveEditedUserData}) {
    
   
    //add or edit
    // useEffect(()=>(),[])
    // function handleChange(e){
         
    // }
    // function handleEdit(){
    //     setUsers([])
    // }
     const handleSave=()=>{
        saveEditedUserData(userDetails)
     }
    return (
        <Modal
            open={userFormModal.status}
            onClose={closeEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper className="modalContainer">
                <div className="modalTitleContainer">
                    <Typography variant="h6" className="modalHeading">
                        User Details
                    </Typography>
                    <IconButton className="closeIcon"
                     onClick={closeEditModal}
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
                        value={userDetails.user.firstName}
                        onChange={(e) =>
                            saveEditedUserData({
                              ...userDetails,
                              user: { ...userDetails.user, firstName: e.target.value },
                            })
                          }
                    />
                    <TextField
                        id="outlined-helperText"
                        label="Last Name"
                        value={userDetails.user.lastName}
                        onChange={(e) =>
                            saveEditedUserData({
                              ...userDetails,
                              user: { ...userDetails.user, lastName: e.target.value },
                            })
                          }
                       />
                    <TextField
                        id="outlined-helperText"
                        label="UserName"
                        value={userDetails.user.userName}
                        onChange={(e) =>
                            saveEditedUserData({
                              ...userDetails,
                              user: { ...userDetails.user, userName: e.target.value },
                            })
                          }
                       />
                    <TextField
                        id="outlined-helperText"
                        label="Email-Id"
                        value={userDetails.email}
                        onChange={(e) =>
                            saveEditedUserData({
                              ...userDetails,
                              email: e.target.value ,
                            })
                          }
                     />
                    <TextField
                        id="outlined-helperText"
                        label="password"
                        value={userDetails.password}
                        onChange={(e) =>
                            saveEditedUserData({
                              ...userDetails,
                              password: e.target.value ,
                            })
                          }
                    />
                    <TextField
                        id="outlined-helperText"
                        label="Age"
                        value={userDetails.age}
                        onChange={(e) =>
                            saveEditedUserData({
                              ...userDetails,
                              age: e.target.value ,
                            })
                          }
                     />
                    <br />
                    <div className="buttonContainer">
                    <Button className="cancelBtn" 
                    onClick={closeEditModal}
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