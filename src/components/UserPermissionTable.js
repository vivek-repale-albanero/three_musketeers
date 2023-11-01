import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { useContext } from 'react';
import { PermissionContext } from '../Context/PermissionContext';
function UserPermissionTable() {
    const { users, updateUserPermissions }= useContext(PermissionContext);
  const handlePermissionChange = (userId, route) => (event) => {
    updateUserPermissions(userId, route, event.target.checked);
  };
// console.log(users)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{background:'rgb(21 22 22)'}}>
          <TableRow>
            <TableCell style={{color:"rgb(224 224 224)"}}>User</TableCell>
            <TableCell style={{color:"rgb(224 224 224)"}}>Game Permission</TableCell>
            <TableCell style={{color:"rgb(224 224 224)"}}>CSV Edit Permission</TableCell>
            <TableCell style={{color:"rgb(224 224 224)"}}>CSV Download Permission</TableCell>
            <TableCell style={{color:"rgb(224 224 224)"}}>Start Game Permission</TableCell>
            <TableCell style={{color:"rgb(224 224 224)"}}>Reset Game Permission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Checkbox
                  checked={user.gamePermission}
                  onChange={handlePermissionChange(user.id, 'game')}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={user.csvPermission}
                  onChange={handlePermissionChange(user.id, 'csv')}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={user.csvDownlodPermission}
                  onChange={handlePermissionChange(user.id, 'csvDownlod')}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={user.startGamePermission}
                  onChange={handlePermissionChange(user.id, 'startGame')}
                />
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={user.resetGamePermission}
                  onChange={handlePermissionChange(user.id, 'resetGame')}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserPermissionTable;