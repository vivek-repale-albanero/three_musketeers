// src/components/PermissionPage.js
import React, { useContext } from 'react';
import UserPermission from '../components/UserPermissionTable';
import Layout from '../Layout/Layout';
import { PermissionContext } from '../Context';



function PermissionPage() {
  const{handlePermissionModalOpen}=useContext(PermissionContext)
  return (
    <Layout>

    <div>
      <h1>User Permission</h1>
      <button onClick={handlePermissionModalOpen}>Click permission</button>
      <UserPermission/>
    </div>
    </Layout>
  );
}

export default PermissionPage;