import React, { Component } from 'react';
import Listagem from "./listagem";
import "./styles.css";
import DadosUser from './usuario';
import { Link } from "react-router-dom";
import Menu from "./menu";
import { Route, Switch} from "react-router-dom";
import PrivateRoute from '../PrivateRoute';

function App() {
  return (
    <div className="App">
          <Menu />        
          <Switch>
            <Route component={Listagem} exact path="/app/home" />
            <Route component={DadosUser} exact path="/app/usuario" />
          </Switch>
          
    </div>
  );
}

export default App;
