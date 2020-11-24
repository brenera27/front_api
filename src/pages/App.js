import React from 'react';
import Listagem from "./inicio";
import Pedidos from "./pedidos";
import "./styles.css";
import DadosUser from './User/dadosUsuario';
import Menu from "./menu";
import { Route, Switch} from "react-router-dom";
import CadastraProd from "./Produtos/cadastraProd";
import AtualizaProd from "./Produtos/atualizaProd"
import AtualizaUser from "./User/atualizaUser"

function App(props) {
  return (
    <div className="App">
          <Menu/>        
          <Switch>
            <Route component={Listagem} exact path="/app/home" />
            <Route component={Pedidos} exact path="/app/pedidos" />
            <Route component={CadastraProd} exact exact path="/app/cadastraProd" />        
            <Route component={AtualizaProd} exact path="/app/atualiza/:id" />
            <Route component={AtualizaUser} exact exact path="/app/atualizaUser" />
            <Route component={DadosUser} exact path="/app/usuario" />
          </Switch>
          
    </div>
  );
}

export default App;
