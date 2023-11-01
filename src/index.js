import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.component';
import PermissionProvider from './Context/PermissionContext';

ReactDOM.render(
  <PermissionProvider>
  <Root />
  </PermissionProvider>,
  document.getElementById('mount'),
);
