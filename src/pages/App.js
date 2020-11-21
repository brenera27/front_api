import React from 'react';
import Listagem from "./listagem";
import Pedidos from "./pedidos";
import "./styles.css";
import DadosUser from './usuario';
import Menu from "./menu";
import { Route, Switch} from "react-router-dom";
import Cadastro from "./cadastraProd";
import Atualiza from "./atualizaProd"
import Teste from "./teste"


function App(props) {
  return (
    <div className="App">
          <Menu/>        
          <Switch>
            <Route component={Listagem} exact path="/app/home" />
            <Route component={Pedidos} exact path="/app/pedidos" />
            <Route component={Cadastro} exact exact path="/app/cadastra" />
            <Route component={Atualiza} exact path="/app/atualiza/:id" />
            <Route component={DadosUser} exact path="/app/usuario" />
            <Route component={Teste} exact path="/app/teste" />
          </Switch>
          
    </div>
  );
}

export default App;
