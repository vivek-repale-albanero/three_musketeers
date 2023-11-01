// src/components/PermissionPage.js
import React from 'react';
import UserPermission from '../components/UserPermissionTable';



function PermissionPage() {
  return (
    <div>
      <h1>User Permission</h1>
      <UserPermission/>
    </div>
  );
}

export default PermissionPage;