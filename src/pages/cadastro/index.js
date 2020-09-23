import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";
import { history } from '../../history';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            nome: "",
            email: "",
            senha: "",
            palavraChave: "",
            cep: "",
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            complemento: "",
            numero: "",
            dataNascimento: Date,
            error: "",
            loading:null

        };
        this.cadastraUser = this.cadastraUser.bind(this);
        this.mudaNome = this.mudaNome.bind(this);
        this.mudaEmail = this.mudaEmail.bind(this);
        this.mudaSenha = this.mudaSenha.bind(this);
        this.mudaData = this.mudaData.bind(this);
        this.mudaCep = this.mudaCep.bind(this);
        this.mudaBairro = this.mudaBairro.bind(this);
        this.mudaRua = this.mudaRua.bind(this);
        this.mudaNumero = this.mudaNumero.bind(this);
        this.mudaComplemento = this.mudaComplemento.bind(this);
        this.mudaPalavra = this.mudaPalavra.bind(this);


    }

    componentDidMount() {
        if (localStorage.getItem('update') == "true") {
            this.cadastra();

        } else {

        }

    }
    cadastra = () => {
        const aux = JSON.parse(localStorage.getItem('user'));
        const { id, nome, email, senha, cidade, estado, bairro, rua, cep, palavraChave, complemento, numero, dataNascimento } = aux;
        this.setState({ id: id });
        this.setState({ nome: nome });
        this.setState({ email: email });
        this.setState({ senha: senha });
        this.setState({ palavraChave: palavraChave });
        this.setState({ dataNascimento: dataNascimento });
        this.setState({ numero: numero });
        this.setState({ complemento: complemento });
        this.setState({ cep: cep });
        this.setState({ cidade: cidade });
        this.setState({ bairro: bairro });
        this.setState({ estado: estado });
        this.setState({ rua: rua });
        console.log(aux);
    }


    updateUsers = (product) => {
        this.setState({ update: true });
    }

    mudaNome(event) {
        this.setState({ nome: event.target.value });
    }
    mudaEmail(event) {
        this.setState({ email: event.target.value });
    }
    mudaSenha(event) {
        this.setState({ senha: event.target.value });
    }
    mudaPalavra(event) {
        this.setState({ palavraChave: event.target.value });
    }
    async mudaData(event) {
        this.setState({ dataNascimento: event.target.value });
    }
    mudaNumero = (event) => {
        this.setState({ numero: event.target.value });

    }
    mudaComplemento = (event) => {
        this.setState({ complemento: event.target.value });

    }
    mudaCep = (event) => {
        this.setState({ cep: event.target.value });

    }
    mudaRua = (event) => {
        this.setState({ rua: event.target.value });

    }
    mudaBairro = (event) => {
        this.setState({ bairro: event.target.value });

    }
    cadastraEndereco = async () => {   
        this.setState({loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} />});
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const endereco = await axios.get(`https://viacep.com.br/ws/${this.state.cep}/json/`).then((resultado)=>{
            const { logradouro, bairro, localidade, uf } = resultado.data
            this.setState({ rua: logradouro });
            this.setState({ bairro: bairro });
            this.setState({ cidade: localidade });
            this.setState({ estado: uf });
            this.setState({loading: null});
            console.log(endereco);
        }).catch(()=>{
            this.setState({loading: null});
        });
      
    }

// https://apitestenode.herokuapp.com
    cadastraUser = async (event) => {
        event.preventDefault();
         this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
        const { id, nome, email, senha, cep, rua, palavraChave, bairro, cidade, estado, complemento, numero, dataNascimento } = this.state;

        if (nome === "" || email === "" || senha === "") {
            this.setState({ error: "Campo obrigatório vazio" })
        } else {
            // validando se a operação é de update ou de criação de usuário
            if (localStorage.getItem('update') == "true") {
                //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                await axios.put("https://apitestenode.herokuapp.com/api/usuarios/update", { 
                    "id": id, "nome": nome, "email": email, "senha": senha, "palavraChave": palavraChave, "dataNascimento": dataNascimento, "cep": cep, "rua": rua, "bairro": bairro, "cidade": cidade,
                    "estado": estado, "complemento": complemento, "numero": numero
                });
                // atualizando os dados do usuário salvos no localstorage
                await axios.post("https://apitestenode.herokuapp.com/api/usuarios/login", { "email": this.state.email, "senha": this.state.senha }).then(resultado => {
                    const { data } = resultado;
                    localStorage.setItem('update', false);
                    localStorage.setItem('app-token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    history.push('/app/usuario');
                });

            } else {
                // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                await axios.post("https://apitestenode.herokuapp.com/api/usuarios/novo", {
                    "nome": nome, "email": email, "senha": senha, "palavraChave": palavraChave, "dataNascimento": dataNascimento, "cep": cep, "rua": rua, "bairro": bairro, "cidade": cidade,
                    "estado": estado, "complemento": complemento, "numero": numero
                }).then(response => {
                    if(response.data){
                        history.push('/login');
                    }
                    

                })
                
            }
           
        }
        this.setState({ loading: null });
    }
    render() {
        return (
            <center>
            <div className="corpoCadastro">
                <div className="conteudo-Cadastro">
                    <center><h1 className="display-4">Cadastro</h1></center>
                    <hr className="my-4"></hr>
                    <form onSubmit={this.cadastraUser}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="nome">Nome:</label>
                                <input type="name" className="form-control" id="nome" placeholder="Nome Sobrenome" value={this.state.nome} onChange={this.mudaNome} />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="dataNascimento">Data de Nascimento:</label>
                                <input type="date" className="form-control" id="dataNascimento" value={this.state.dataNascimento} onChange={this.mudaData} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="inputEmail4">Email:</label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={this.state.email} onChange={this.mudaEmail} />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="inputPassword4">Senha:</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Senha" value={this.state.senha} onChange={this.mudaSenha} />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="inputPalavra">Palavra de segurança:</label>
                                <input type="text" className="form-control" id="inputPalavra" placeholder="Ex.:Batata" value={this.state.palavraChave} onChange={this.mudaPalavra} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label for="inputCEP">CEP:</label>
                                
                                <input type="text" className="form-control" id="inputCEP" value={this.state.cep} onChange={this.mudaCep} onBlur={this.cadastraEndereco} />                              
                            </div>                                                      
                            <div className="form-group col-md-4">
                                <label for="inputCity">Cidade:</label>
                                <input type="text" className="form-control" id="inputCity" value={this.state.cidade} />
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputEstado">Estado:</label>
                                <input type="text" className="form-control" id="inputEstado" value={this.state.estado} />
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputBairro">Bairro:</label>
                                <input type="text" className="form-control" id="inputBairro" value={this.state.bairro} onChange={this.mudaBairro}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputRua">Rua:</label>
                                <input type="text" className="form-control" id="inputRua" value={this.state.rua} onChange={this.mudaRua}/>
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputNum">Número:</label>
                                <input type="text" className="form-control" id="inputNum" value={this.state.numero} onChange={this.mudaNumero} />
                            </div>
                            <div className="form-group col-md-3">
                                <label for="inputComp">Complemento:</label>
                                <input type="text" className="form-control" id="inputComp" value={this.state.complemento} onChange={this.mudaComplemento} />
                            </div>
                        </div>
                        <center>
                        <br />
                        {this.state.loading}
                        <br />
                            <span className="Error">{this.state.error}</span>
                            <br />                         
                            <button type="submit" className="btn btn-primary btn-lg">Salvar</button>                          
                            <br />                          
                            <br />       
                        </center>
                        <a href="/app/usuario" className="btn btn-link">Cancelar</a>
                   
                    </form>
                    

                </div>
            </div>
            </center>
        );
    }

}


