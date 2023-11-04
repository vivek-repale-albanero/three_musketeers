
import React,{ useContext, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Icon,Checkbox, Card } from '@material-ui/core';
import Layout from '../../Layout/Layout';
import "./Userspage.scss"
import BreadCrumb from '../../components/Breadcrumbs/BreadCrumb';
import EditForm from "../../components/EditForm/EditForm";
import UserPermission from "../../components/UserPermissionTable";
import { PermissionContext } from "../../Context";


function UsersPage() {

  const { users,setUsers,handlePermissionModalOpen} = useContext(PermissionContext)
  const loggedUser = JSON.parse(localStorage.getItem("useLogedId"));

    //Form Modal
  let userData = {
    user:{
      userName:"",
      firstName:"",
      lastName:""
    },
    age:"",
    email:"",
    password:"",
    permission:[
        {
          name: "csvPermission",
          allow: false,
          subModules: [
            {
              name: "csvPagePermission",
              allow: false
            },
            {
              name: "csvEditPermission",
              allow: false
            },
            {
              name: "vsvDownloadPermission",
              allow: false
            }
          ]
        },
        {
          name: "gamePermission",
          allow: false,
          subModules: [
            {
              name: "gamePagePermission",
              allow: false
            },
            {
              name: "gameStartPermission",
              allow: false
            },
            {
              name: "gameResetPermission",
              allow: false
            }
          ]
        },
        {
          name: "missing",
          allow: false,
          subModules: []
        }
      ]
  }

   const [userFormModal,setUserFormModal] = useState({
    status:false,
    edit:false,
    data:{}
  })

  useEffect(()=>{
    console.log("useEffect")
  },[userFormModal])
  
  const closeModal = () =>{ 
    setUserFormModal({...userFormModal,
    status:false,
    edit:false,
    data:{}
    })   
  }

 const afterEdit = () =>{
  fetch('http://localhost:3000/users')
  .then((res)=>res.json())
  .then((data)=>setUsers(data));
 }

  //Add Form
  const openAddModal = () =>{
    setUserFormModal({...userFormModal,
      status:true,
    edit:false,
    data:userData
    })
  }

  //Edit Form
  
  const openEditModaL = (user)=>{
    setUserFormModal({...userFormModal,
    status:true,
  edit:true,
  data:user
  })
}
  const saveUserData = (editedUserData) =>{
    console.log("editedUserData",editedUserData)
    if(!userFormModal.edit){
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserData),
      })
        .then(response =>  response.json())
        .then(createdUser => {
          console.log('User created:', createdUser);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    // const updatedUsers = [...users,editedUserData]
    //    setUsers(updatedUsers)
    }else{
      const updateduser = (editedUserData)
      const updatedUsersList = users.map((user)=>user.id === updateduser.id ? {...updateduser}:user).filter((user)=>user.id===updateduser.id)
      console.log("updates",JSON.stringify(updatedUsersList[0].id))
      fetch(`http://localhost:3000/users/${updatedUsersList[0].id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUsersList[0]),
      })
        .then(response =>  afterEdit())
        .catch(error => {
          console.error('Error:', error);
        });
    }
    closeModal()
  }
   //Delete User
   const deleteUser = (userId) =>{
        //  const userList = users.filter((user)=> user.id !==userId)
        //  setUsers(userList)
        fetch(`http://localhost:3000/users/${userId}`,{
          method:"DELETE"
        })
        .then(res=>afterEdit())
        .catch(error => {
          console.error('Error:', error);
        });

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
          onClick={openAddModal}
          > 
          Add Users
          </Button>
          {(userFormModal.status && (!userFormModal.edit) ? 
                       <EditForm 
                        userFormModal={userFormModal}
                        closeModal={closeModal}
                        saveUserData={saveUserData}/> 
                        :
                        null)}
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
                        {/* {(loggedUser.id===user.id)? */}
                        <>
                        <button className='actionBtn' onClick={()=>openEditModaL(user)}><Icon>edit_note</Icon></button>
                        {(userFormModal.status && userFormModal.edit)
                        ?
                        <EditForm 
                        userFormModal={userFormModal}
                        closeModal={closeModal}
                        saveUserData={saveUserData}/>
                        :
                        null}
                        <button className='actionBtn' onClick={handlePermissionModalOpen}><Icon>key</Icon></button>
                        <UserPermission/>
                        {/* <button className='actionBtn'><Icon>delete</Icon></button> */}
                        <button className='actionBtn' onClick={()=>deleteUser(user.id)}><Icon>delete</Icon></button>

                        </>
                        {/* :
                        null} */}
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