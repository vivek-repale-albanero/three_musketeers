import React, { useContext } from 'react';
import { Container, Typography, Paper } from '@material-ui/core';
import './UnauthorizedPage.scss';
import Layout from '../Layout/Layout';
import { PermissionContext } from '../Context';

function UnauthorizedPage() {
    const {unAuthMsg}=useContext(PermissionContext)
  return (
    <Layout>
      <Container className="unauthorized-page">
          <div className="text">
            <Typography variant="h4" gutterBottom>
              You are unauthorized
            </Typography>
            <Typography variant="body1" gutterBottom>
              {unAuthMsg}
            </Typography>
          </div>
          <div className="image" style={{width:"80%"}}>
            <img style={{width:"100%"}} src="https://img.freepik.com/premium-vector/target-advertising-flat-illustration-design_203633-1095.jpg" alt="Unauthorized" />
          </div>
      </Container>
    </Layout>
  );
}

export default UnauthorizedPage;
