import React from 'react';
import { useContext } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Checkbox, Card } from '@material-ui/core';
import Layout from '../../Layout/Layout';
import { PermissionContext } from "../../Context/PermissionContext"
import "./Userspage.scss"


function UsersPage() {
  const { users } = useContext(PermissionContext)
  const isLoggedUser = JSON.parse(localStorage.getItem("useLogedId"));
  return (
    <>
      <Layout>
        <div>
          <div className='title'>
          <h1 >Users List & Access</h1>
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
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>Access Permissions</TableCell>
                    <TableCell style={{ color: "rgb(224 224 224)", textAlign: "center" }}>Is Logged</TableCell>
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
                      <TableCell style={{ color: (user.startGamePermission) ? "green" : "red", textAlign: "center" }}>
                        {user.startGamePermission ? "Enabled" : "Disabled"}
                      </TableCell>
                      <TableCell style={{ color: (isLoggedUser.id === user.id) ? "green" : "red", textAlign: "center" }}>
                        {(isLoggedUser.id === user.id) ? "Online" : "Offline"}
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