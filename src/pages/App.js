import React, { Component } from 'react';
import Listagem from "./listagem";
import Pedidos from "./pedidos";
import "./styles.css";
import DadosUser from './usuario';
import { Link } from "react-router-dom";
import Menu from "./menu";
import { Route, Switch} from "react-router-dom";
import PrivateRoute from '../PrivateRoute';
import Cadastro from "./cadastraProd";
function App() {
  return (
    <div className="App">
          <Menu />        
          <Switch>
            <Route component={Listagem} exact path="/app/home" />
            <Route component={Pedidos} exact path="/app/pedidos" />
            <Route component={Cadastro} exact path="/app/cadastra" />
            <Route component={DadosUser} exact path="/app/usuario" />
          </Switch>
          
    </div>
  );
}

export default App;
