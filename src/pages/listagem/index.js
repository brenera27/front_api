import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";
//import Moment, { months } from "moment";
import Cadastro from "../cadastraProd";

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      loading: null,
      total: null,
      tabela: [],
      page: 0,
      qtdPag: 0,
      botoes: []
    };

  }

  atualiza() {

  }
  componentDidMount() {
    this.loadProducts();

  }
  calcTotalPages() {
    let qtdPag = this.state.produtos.length / 5;
    this.setState({ qtdPag: qtdPag });
    this.geraBotoes();
  }
  loadProducts = async () => {
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    await axios.get("https://apitestenode.herokuapp.com/api/produtos").then(resultado => {
      this.setState({ produtos: resultado.data.produtos });
      console.log(this.state.produtos);
    });
    this.carrega();
    this.setState({ loading: null });
    this.calcTotalPages();
  }

  update = (user) => {
    this.cadastro.updateProduct(user);
  }
  deleta = async (id) => {
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    try {
      const aux = await axios.delete(`https://apitestenode.herokuapp.com/api/produtos/apagar?id=${id}`).then(resultado => {

      });
    } catch (err) {
      // TODO
      // adicionar tratamento da exceção
      console.error(err);
      alert(err);
    }
    this.loadProducts();
  }
  proxPage() {
    if (this.state.qtdPag > (this.state.page + 1)) {
      this.carrega(this.state.page + 1);
      this.setState({ page: this.state.page + 1 });
    }



  }
  anterPage() {
    if (this.state.page > 0) {
      this.carrega(this.state.page - 1);
      this.setState({ page: this.state.page - 1 });
    }
  }
  geraBotoes() {
    const qtd = this.state.qtdPag
    let botoes = []
    for (let i = 0; i < qtd; i++) {
      botoes[i] = <li class="page-item"><a class="page-link" onClick={() => { this.botaoNum(i) }}>{i + 1}</a></li>
    }
    this.setState({ botoes: botoes });
  }

  botaoNum(page) {
    this.setState({ page: page });
    this.carrega(page);
  }
  carrega(num = this.state.page) {
    const produtos = this.state.produtos;
    let table = [];
    let cont = num;
    cont *= 5;
    for (let i = cont; i < (cont + 5); i++) {
      if (i < produtos.length) {
        table[i] = <tbody>
          <tr className="produto">
            <th scope="row">{produtos[i].id}</th>
            <td>{produtos[i].nome}</td>
            <td>{produtos[i].tipo}</td>
            <td>{produtos[i].estoque}</td>
            <td>R${produtos[i].preco}</td>
            <td>
              <button className="editar" onClick={() => { this.update(produtos[i]); }}> <img src={require('../img/edit-24px.svg')} /></button>
            </td>
            <td>
              <button className="apagar" onClick={() => { this.deleta(produtos[i].id); }}>
                <img src={require('../img/delete-24px.svg')} />
              </button>
            </td>

          </tr>

        </tbody>
      }
    }

    this.setState({ tabela: table })
  }

  // calculaIdade(dataNascimento) {
  //   const agora = Moment();
  //   const nascimento = Moment();
  //   var idade = agora.year() - nascimento.year();
  //   if (agora.month() < nascimento.month() || agora.month() === nascimento.month() && agora.day() < nascimento.day()) {
  //     idade = idade - 1;
  //   }
  //   return idade;
  // }

  render() {

    return (

      <div className="corpoListagem">
        <center>

          <div className="cadastro_prod">
            <Cadastro ref={(component) => { this.cadastro = component }} />
          </div>
          <br />
          <br />
          <nav aria-label="Navegação de página exemplo">
            <ul class="pagination justify-content-center">
              <li class="page-item"><a class="page-link" onClick={() => { this.anterPage() }}>Anterior</a></li>
              {this.state.botoes}
              <li class="page-item"><a class="page-link" onClick={() => { this.proxPage() }}>Próximo</a></li>
            </ul>
          </nav>
          
          <div className="lista-Usuarios">

            <div class="card-body">

              <table className="table table-borderless ">
    <caption>Página: {this.state.page+1}</caption>
                <thead class="thead">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Estoque</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Alterar</th>
                    <th scope="col">Apagar</th>
                  </tr>
                </thead>
                {/* {this.state.produtos.map(produto => (
                  
                  
                  
                ))} */}
                {this.state.tabela}
              </table>
              <center> <span>{this.state.loading}</span> </center>

            </div>

          </div >
          <br />
          





        </center>
      </div>
    );
  }
}


