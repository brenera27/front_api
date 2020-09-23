import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";
import { history } from '../../history';
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMensagem: String,
            palavraChave: String,
            email: localStorage.getItem('email'),
            loading: null
        };
        this.mudaPalavraC = this.mudaPalavraC.bind(this);
    }
    mudaPalavraC(event) {
        this.setState({ palavraChave: event.target.value });
    }
    verificaPalavra = async (event) => {
        event.preventDefault();
        this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
        await axios.post("https://apitestenode.herokuapp.com/api/usuarios/palavraChave", { "email": this.state.email, "palavraChave": this.state.palavraChave }).then(resultado => {
            const { data } = resultado;
            if (data.mensagem) {
                this.setState({ errorMensagem: data.mensagem });
            } else {
                localStorage.setItem('app-token', data.token);
                localStorage.setItem('id', data.id);
                history.push('/trocaSenha');
            }
        });
        this.setState({ loading: null });
    }

    render() {
        return (
            <center>
            <div className="corpoPalavraC">
                <div className="conteudo-palavraC">
                    <form onSubmit={this.verificaPalavra}>
                        <div className="container-fluid">
                            <center>
                                <h4>Digite sua palavra chave:</h4>
                                <hr className="my-4"></hr>
                            </center>
                            <input type="text" className="form-control" value={this.state.palavraChave} onChange={this.mudaPalavraC} />
                            <br />
                            <span className="Error">{this.state.errorMensagem}</span>
                        </div>
                        <center>
                            <span>{this.state.loading}</span>
                            <br/>
                            <br/>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </center>
                    </form>
                </div>

            </div>
            </center>
        );
    }
}
//<img src={require('../img/person_add-24px.svg')} />

