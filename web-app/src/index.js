import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import '@fortawesome/fontawesome-free/js/all.js';

import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './services/auth_provider';
import Database from './services/database';

const authProvider = new AuthProvider();
const database = new Database();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App authProvider={authProvider} database={database} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
