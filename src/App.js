import React from 'react';
import { Router,BrowserRouter } from "react-router-dom";
import { history } from './history.js';
import Routes from './routes';
import 'rsuite/dist/styles/rsuite-default.css';
import 'rsuite/lib/styles/index.less';
function App() {
  return (
    <BrowserRouter>
    <Router history={history}>
      <Routes />
    </Router>
    </BrowserRouter>
  );
}


export default App;
