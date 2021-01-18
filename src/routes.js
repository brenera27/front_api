import React,{useEffect} from "react";
import TelaLogin from "./pages/login";
import TelaCadastro from "./pages/User/cadastraUser";
import PrivateRoute from './PrivateRoute';
import TrocaSenha from './pages/trocaSenha';
import buscaPalavra from "./pages/verificaPalavra"
import { Route, Switch } from "react-router-dom";
import App from "./pages/App.js";


export default function Routes() {
   
    return (
        
            <Switch>
                <Route component={TelaLogin} exact path="/login" />
                <Route component={TelaCadastro} exact path="/cadastro" />
                <Route component={buscaPalavra} exact path="/verificaPalavraChave" />
                <PrivateRoute component={TrocaSenha} exact path="/trocaSenha" />
                <PrivateRoute component={App} path="/app" />
            </Switch>
            


    );
}
