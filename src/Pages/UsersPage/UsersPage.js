
import React,{ useContext, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Icon,Checkbox, Card } from '@material-ui/core';
import Layout from '../../Layout/Layout';
import "./Userspage.scss"
import BreadCrumb from '../../components/Breadcrumbs/BreadCrumb';
import EditForm from "../../components/EditForm/EditForm";
import UserPermission from "../../components/UserPermissionTable";
import { PermissionContext } from "../../Context";


function UsersPage() {

  const { users,setUsers,handlePermissionModalOpen ,editFormModal,setEditFormModal} = useContext(PermissionContext)
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));
  const userDetails = users.find((user)=> user.id === loggedUser.id)
    //Form Modal
   const [userFormModal,setUserFormModal] = useState({
    status:false,
    edit:false,
    data:userDetails
  })
  const openEditModaL = () =>{
    setUserFormModal({...userFormModal,
    status:true,
    edit:true,
    })
  }
  const closeEditModal = ()=>{
    setUserFormModal({...userFormModal,
    status:false,
    edit:false,
    })
    
  }
  const saveEditedUserData = (editedUserData) =>{
    console.log("edited"+editedUserData) 
  }

  
  return (
    <>
      <Layout>
        <div>
          <div className='title'>
            <div>      
                <h1 >Users</h1>
                 {/* <BreadCrumb/> */}
            </div>
          <Button
          variant="contained"
          className='addBtn'
          > 
          Add Users
          </Button>
          </div>
          <div className='tableContent'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ background: 'rgb(21 22 22)' }}>
                  <TableRow>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>Id</TableCell>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>Name</TableCell>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>E-mail</TableCell>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>Age</TableCell>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>User Name</TableCell>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>Is Logged</TableCell>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell style={{ textAlign: "center" }}>{user.id}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>{user.user.firstName+" "+user.user.lastName}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.email }
                      </TableCell>
                      <TableCell style={{  textAlign: "center" }}>
                        {user.age }
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.user.userName }
                      </TableCell>
                      <TableCell style={{ color: (loggedUser.id === user.id) ? "green" : "red", textAlign: "center" }}>
                        {(loggedUser.id === user.id) ? "Online" : "Offline"}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {(loggedUser.id===user.id)?
                        <>
                        <button className='actionBtn' onClick={openEditModaL}><Icon>edit_note</Icon></button>
                        {(userFormModal.status && userFormModal.edit)
                        ?
                        <EditForm 
                        userDetails={userDetails} 
                        userFormModal={userFormModal}
                        closeEditModal={closeEditModal}
                        saveEditedUserData={saveEditedUserData}/>
                        :
                        ""}
                        <button className='actionBtn' onClick={handlePermissionModalOpen}><Icon>key</Icon></button>
                        <UserPermission/>
                        <button className='actionBtn'><Icon>delete</Icon></button>
                        </>
                        :
                        ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default UsersPage