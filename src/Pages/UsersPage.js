import { useContext } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Card } from '@mui/material';
import {PermissionContext} from "../Context/PermissionContext"


function UsersPage () {
  const {users} = useContext(PermissionContext) 
  const isLoggedUser = JSON.parse(localStorage.getItem("useLogedId"));
    return(
      <>
      <h1>Users List & Access</h1>
      <TableContainer component={Paper}>
        <Table>
           <TableHead style={{background:'rgb(21 22 22)'}}>
            <TableRow>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>Id</TableCell>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>Name</TableCell>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>Game Access</TableCell>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>CSV-File Access</TableCell>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>CSV-File Download</TableCell>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>Start Game Access</TableCell>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>Resetting Game Access</TableCell>
              <TableCell style={{color:"rgb(224 224 224)",textAlign:"center"}}>Is Logged</TableCell>
            </TableRow>
           </TableHead>
           <TableBody>
            {users.map((user) =>(
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell style={{color:(user.gamePermission)?"green":"red",textAlign:"center"}}>
                  {user.gamePermission? "Yes":"Not Permitted"}
                  </TableCell>
                <TableCell style={{color:(user.csvPermission)?"green":"red",textAlign:"center"}}>
                  {user.csvPermission? "Yes":"Not Permitted"}
                  </TableCell>
                  <TableCell style={{color:(user.csvDownlodPermission)?"green":"red",textAlign:"center"}}>
                  {user.csvDownlodPermission? "Yes":"Not Permitted"}
                  </TableCell>
                  <TableCell style={{color:(user.startGamePermission)?"green":"red",textAlign:"center"}}>
                  {user.startGamePermission? "Enabled":"Disabled"}
                  </TableCell>
                  <TableCell style={{color:(user.resetGamePermission)?"green":"red",textAlign:"center"}}>
                  {user.resetGamePermission? "Enabled":"Disabled"}
                  </TableCell>
                <TableCell style={{color:(isLoggedUser.id===user.id)?"green":"red",textAlign:"center"}}>
                  {(isLoggedUser.id===user.id)? "Online":"Offline"}
                  </TableCell>
              </TableRow>
            ))}
           </TableBody>
        </Table>
        </TableContainer>
        </>
    )
}

export default UsersPage
