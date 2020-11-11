import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";
import { Icon } from 'rsuite';
import { Button, Alert } from 'rsuite';
//import Moment, { months } from "moment";

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      filtrados: [],
      loading: null,
      total: null,
      tabela: [],
      page: 0,
      qtdFiltrados: 0,
      qtdPag: 0,
      botoes: [],
      filtroTipo: "",
      PrecoMin: 1,
      PrecoMax: 10000,
      EstqMin: 1,
      EstqMax: 10000,
      filtroQtd: "",
      erroFiltro: null
    };
    this.mudaTipo = this.mudaTipo.bind(this);
    this.mudaPrecoMin = this.mudaPrecoMin.bind(this);
    this.mudaPrecoMax = this.mudaPrecoMax.bind(this);
    this.mudaEstqMin = this.mudaEstqMin.bind(this);
    this.mudaEstqMax = this.mudaEstqMax.bind(this);
  }

  mudaTipo(event) {
    this.setState({ filtroTipo: event.target.value });

  }
  mudaPrecoMin(event) {
    this.setState({ PrecoMin: event.target.value });

  }
  mudaPrecoMax(event) {
    this.setState({ PrecoMax: event.target.value });

  }
  mudaEstqMin(event) {
    this.setState({ EstqMin: event.target.value });

  }
  mudaEstqMax(event) {
    this.setState({ EstqMax: event.target.value });

  }

  atualiza() {

  }

  componentDidMount() {
    this.loadProducts();
    if (localStorage.getItem('updateProd') == "true") {
      localStorage.setItem('updateProd', "false");
      localStorage.setItem('produto', null);
    }
  }

  calcTotalPages() {
    let qtdPag = this.state.qtdFiltrados / 10;
    this.setState({ qtdPag: qtdPag });
    this.geraBotoes();
  }

  loadProducts = async () => {
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    await axios.get("https://apitestenode.herokuapp.com/api/produtos").then(resultado => {
      this.setState({ produtos: resultado.data.produtos });
      this.setState({ filtrados: resultado.data.produtos });
      this.setState({ qtdFiltrados: resultado.data.produtos.length });
      console.log(this.state.produtos);
    });
    this.calcTotalPages();
    this.carrega();
    this.setState({ loading: null });

  }

  buscaTipo = async (event) => {
    event.preventDefault();
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    const { filtroTipo, PrecoMax, PrecoMin, EstqMax, EstqMin } = this.state;

    if (filtroTipo != "") {
      await this.filtraTipo();
    } else {
      await this.loadProducts();
    }
    if (PrecoMin === "" || PrecoMax === "" || EstqMax === "" || EstqMin === "") {
      this.setState({ erroFiltro: <span className="Error">Campo obrigatório em branco</span> });
    } else {
      this.setState({ erroFiltro: null });
      await this.filtraPreco();
      await this.filtraEstq();
    }

    this.calcTotalPages();
    this.carrega();
    this.setState({ loading: null });
  }

  filtraTipo = () => {
    const { produtos, filtroTipo } = this.state

    let filtrados = [];
    let cont = 0;
    produtos.map((produto) => {
      if (produto.tipo === filtroTipo) {
        filtrados[cont] = produto;
        cont++
      }
    });
    console.log(filtrados)
    this.setState({ filtrados: filtrados });
  }

  filtraPreco = () => {
    const { PrecoMax, PrecoMin } = this.state
    let cont = 0;
    let filtrando = [];
    this.state.filtrados.map((produto) => {
      if (produto.preco > PrecoMin && produto.preco < PrecoMax) {
        cont++;
        filtrando[cont] = produto;
      }
    });
    this.setState({ filtrados: filtrando })
  }

  filtraEstq = () => {
    const { EstqMax, EstqMin } = this.state
    let total = 0;
    let filtrando = [];
    this.state.filtrados.map((produto) => {
      if (produto.estoque > EstqMin && produto.estoque < EstqMax) {
        total++;
        filtrando[total] = produto;
      }
    });
    this.setState({ qtdFiltrados: total })
    this.setState({ filtrados: filtrando })
  }

  update = (produto) => {
    localStorage.setItem('updateProd', "true");
    localStorage.setItem('produto', JSON.stringify(produto));
  }

  deleta = async (id) => {
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    try {
      const aux = await axios.delete(`https://apitestenode.herokuapp.com/api/produtos/apagar?id=${id}`);
      Alert.success('Excluido com sucesso.')
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
      botoes[i] = <button type="button" class="btn btn-link" id="botaoPag" onClick={() => { this.botaoNum(i) }}>{i + 1}</button>
    }
    this.setState({ botoes: botoes });
  }

  botaoNum(page) {
    this.setState({ page: page });
    this.carrega(page);
  }

  carrega(num = this.state.page) {
    const produtos = this.state.filtrados;
    console.log(produtos)
    let table = [];
    let cont = num;
    cont *= 10;
    for (let i = cont; i < (cont + 10); i++) {
      if (i < produtos.length) {
        if (produtos[i] != null) {
          console.log(produtos[i])
          table[i] = <tbody>
            <tr id="produto">
              <th scope="row">{produtos[i].id}</th>
              <td>{produtos[i].nome}</td>
              <td>{produtos[i].tipo}</td>
              <td>{produtos[i].estoque}</td>
              <td>{produtos[i].estoqueMin}</td>
              <td>R${produtos[i].preco}</td>
              <td>
                <a className="editar" onClick={() => { this.update(produtos[i]); }} href="/app/cadastra"><Icon icon="edit2" size="lg"  /></a>
              </td>
              <td>
                <button className="apagar" onClick={() => { this.deleta(produtos[i].id); }}>
                <Icon icon="trash" size="lg"  />
                </button>
              </td>
            </tr>
          </tbody>
        }
      }
    }
    if (table.length === 0) {
      this.setState({ tabela: <span className="Error">Nenhum produto encontrado</span> });
    } else {
      this.setState({ tabela: table });
    }

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
      <div class="row" id="corpo-Home">
        <div class="col-md-3">
          <div id="filtros">
            <div id="corpo-filtros">
              <center>
                <h2>Filtros</h2>
              </center>
              <hr className="my-4"></hr>
              <form id="filtro" onSubmit={this.buscaTipo}>
                <label>Tipo:</label>
                <select className="btn btn-secondary btn-block" value={this.state.filtroTipo} onChange={this.mudaTipo} >
                  <option selected value="">Todos</option>
                  <option>Alimento</option>
                  <option>Higiene Pessoal</option>
                  <option>Bebida</option>
                  <option>Brinquedo</option>
                  <option>Ferramenta</option>
                  <option>Roupa</option>
                </select>
                <br />
                <div class="row">
                  <div class="col-md-6">
                    <span>Preço mínimo:</span>
                    <input type="number" step="0.01" class="form-control" min="1" max="10000" value={this.state.PrecoMin} onChange={this.mudaPrecoMin}></input>
                  </div>
                  <div class="col-md-6">
                    <span>Preço maximo:</span>
                    <input type="number" step="0.01" class="form-control" min="1" max="10000" value={this.state.PrecoMax} onChange={this.mudaPrecoMax}></input>
                  </div>
                </div>
                {this.state.erroFiltro}
                <br />
                <br />
                <div class="row">
                  <div class="col-md-6">
                    <span>Estoque mínimo:</span>
                    <input type="number" step="1" class="form-control" min="1" max="10000" value={this.state.EstqMin} onChange={this.mudaEstqMin}></input>
                  </div>
                  <div class="col-md-6">
                    <span>Estoque maximo:</span>
                    <input type="number" step="1" class="form-control" min="1" max="10000" value={this.state.EstqMax} onChange={this.mudaEstqMax}></input>
                  </div>
                </div>
                <br />
                <center>
                  <button class="btn btn-secondary" type="submit">Filtrar</button>
                </center>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <center>
            <div className="lista-Usuarios">
              <div id="corpo-listagem">
                <center>
                  <h1 class="display-4">Produtos</h1>
                </center>
                <hr className="my-4"></hr>
                <table className="table table-borderless">
                  <caption>Página: {this.state.page + 1}</caption>
                  <thead class="thead">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Estoque</th>
                      <th scope="col">Qtd Mínima</th>
                      <th scope="col">Preço</th>
                      <th scope="col">Alterar</th>
                      <th scope="col">Apagar</th>
                    </tr>
                  </thead>
                  {this.state.tabela}
                </table> 
                <span>{this.state.loading}</span>
              </div>
            </div >
            <br />
            <div class="btn-toolbar  justify-content-center" role="toolbar" aria-label="Toolbar com grupos de botões">
                  <div class="btn-group mr-2" role="group" aria-label="Primeiro grupo">
                    <button type="button" class="btn btn-link" id="botaoPag" onClick={() => { this.anterPage() }}>Anterior</button>
                    {this.state.botoes}
                    <button type="button" class="btn btn-link" id="botaoPag" onClick={() => { this.proxPage() }}>Próximo</button>
                  </div>
                </div>
          </center>
        </div>
      </div>
    );
  }
}


