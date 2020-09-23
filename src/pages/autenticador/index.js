import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";
import { history } from '../../history';



export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: String,
            senha: String,
            error: "",
            errorMensagem: String,
            palavraChave: String,
            loading: null


        };
        this.mudaEmail = this.mudaEmail.bind(this);
        this.mudaSenha = this.mudaSenha.bind(this);
        this.verificaLogin = this.verificaLogin.bind(this);


    }

    mudaEmail(event) {
        this.setState({ email: event.target.value });
    }
    mudaSenha(event) {
        this.setState({ senha: event.target.value });
    }

    verificaLogin = async (event) => {
        event.preventDefault();
        this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
        await axios.post("https://apitestenode.herokuapp.com/api/usuarios/login", { "email": this.state.email, "senha": this.state.senha }).then(resultado => {
            const { data } = resultado;
            if (data.mensagem) {
                this.setState({ errorMensagem: data.mensagem });
                if (data.mensagem == "Senha inválida") {
                    localStorage.setItem('email', this.state.email);
                    this.setState({ error: <a id="esqueci-senha" href="/verificaPalavraChave">Esqueci minha senha</a> });
                }else{
                    this.setState({ error: null });
                }
            } else {
                localStorage.setItem('app-token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                history.push('/app/home');
            }
        });
        this.setState({ loading: null });
    }
    render() {

        return (
            <center>
            <div className="corpoLogin">
                <div className="conteudo-login">
                    <center>
                        <h1 className="display-4">Login</h1>
                        <hr className="my-4"></hr>
                    </center>
                    <br />
                    <form onSubmit={this.verificaLogin}>
                        <div className="container-fluid">
                            <label>Email:</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder=" exemplo@gmail.com" value={this.state.email} onChange={this.mudaEmail} />
                            <br />
                            <label>Senha:</label>
                            <input type="password" className="form-control" placeholder="Senha" value={this.state.senha} onChange={this.mudaSenha} />
                            <br />

                            <span className="Error">{this.state.errorMensagem}</span>

                        </div>
                        <center>
                            {this.state.error} 
                            {this.state.loading}
                            <br />
                            <br />
                            <button type="submit" className="btn btn-secondary">Entrar</button>
                           
                        </center>
                    </form>
                    <br /><br />
                    <center>

                        <span className="possuiConta">Não possui uma conta? <a href="/cadastro">Cadastrar</a></span>
                    </center>

                </div>


            </div>
            </center>
        );
    }
}

