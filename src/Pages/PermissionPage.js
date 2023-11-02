// src/components/PermissionPage.js
import React from 'react';
import UserPermission from '../components/UserPermissionTable';
import Layout from '../Layout/Layout';



function PermissionPage() {
  return (
    <Layout>

    <div>
      <h1>User Permission</h1>
      <UserPermission/>
    </div>
    </Layout>
  );
}

export default PermissionPage;