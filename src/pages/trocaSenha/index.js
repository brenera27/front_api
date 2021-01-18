import React, { Component } from 'react';
import API from '../api'
import "./styles.css";
import { history } from '../../history';
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMensagem: String,
            senhaUm: "",
            senhaDois: "",
            id: localStorage.getItem('id'),
            loading:null
        };
        this.mudaSenhaUm = this.mudaSenhaUm.bind(this);
        this.mudaSenhaDois = this.mudaSenhaDois.bind(this);
    }
    mudaSenhaUm(event) {
        this.setState({ senhaUm: event.target.value });

    }
    mudaSenhaDois(event) {
        this.setState({ senhaDois: event.target.value });
    }

    verificaPalavra = async (event) => {
        event.preventDefault();
        this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
        const { senhaUm, senhaDois } = this.state;
        if (senhaUm != "" && senhaDois != "") {
            if (senhaUm === senhaDois) {
                await API.put("usuarios/update", {
                    "id": this.state.id, "senha": senhaUm
                }).then(resultado => {
                    const { data } = resultado;
                    console.log(data);
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/app/home');
                });

            } else {
                this.setState({ errorMensagem: 'As senhas precisam ser iguais' })
            }
        } else {
            this.setState({ errorMensagem: 'Campo obrigatório em branco' })
        }
        this.setState({ loading: null });
    }

    render() {
        return (
            <center>
            <div className="corpoTrocaS">
                <div className="conteudo-trocaS">
                    

                   
                    <br />
                    <form onSubmit={this.verificaPalavra}>
                        <div className="container-fluid">
                            <center>
                                <h4>Digite uma nova senha:</h4>
                                <hr className="my-4"></hr>
                            </center>
                            <label>Digite uma nova senha:</label>
                            <input type="password" className="form-control" value={this.state.senhaUm} onChange={this.mudaSenhaUm} />
                            <br/>
                            <label>Confirme a nova senha:</label>
                            <input type="password" className="form-control" value={this.state.senhaDois} onChange={this.mudaSenhaDois} />
                            <span className="Error">{this.state.errorMensagem}</span>
                            <br />
                            <br />
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

