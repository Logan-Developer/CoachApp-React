import React from 'react';
import ReactDOM from 'react-dom';

import './bootstrap/css/bootstrap.min.css';
import './App.css';

import Root from "./components/Root";

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
