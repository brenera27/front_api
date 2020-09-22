import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";


export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      update: false,
      id: "",
      nome: "",
      tipo: "",
      estoque: "",
      preco: "",
      loading: null,
      erro: null

    };
    this.cadastraProduct = this.cadastraProduct.bind(this);
    this.mudaNome = this.mudaNome.bind(this);
    this.mudaTipo = this.mudaTipo.bind(this);
    this.mudaEstoque = this.mudaEstoque.bind(this);
    this.mudaPreco = this.mudaPreco.bind(this);
  }
  updateProduct = (product) => {
    this.setState({ nome: product.nome });
    this.setState({ tipo: product.tipo });
    this.setState({ estoque: product.estoque });
    this.setState({ preco: product.preco });
    this.setState({ id: product.id });
    this.setState({ update: true });
  }

  mudaNome(event) {
    this.setState({ nome: event.target.value });
  }
  mudaTipo(event) {
    this.setState({ tipo: event.target.value });
  }
  mudaEstoque(event) {
    this.setState({ estoque: event.target.value });
  }
  mudaPreco(event) {
    this.setState({ preco: event.target.value });
  }

  cadastraProduct = async (event) => {
    event.preventDefault();
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    if (this.state.nome === "" || this.state.tipo === "" || this.state.estoque === "" || this.state.preco === "") {
      this.setState({ erro: <span className="Error">Campo obrigatório vazio</span> })
    } else {
      this.setState({ erro: null })
      if (this.state.update === true) {
        //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        await axios.put("https://apitestenode.herokuapp.com/api/produtos/update", { "id": this.state.id, "nome": this.state.nome, "tipo": this.state.tipo, "estoque": this.state.estoque, "preco": this.state.preco });
        this.setState({ update: false });
      } else {
        try {
          console.log({ "nome": this.state.nome, "tipo": this.state.tipo, "estoque": this.state.estoque, "preco": this.state.preco });
          await axios.post("https://apitestenode.herokuapp.com/api/produtos/novo", { "nome": this.state.nome, "tipo": this.state.tipo, "estoque": this.state.estoque, "preco": this.state.preco }).then(resultado => {
            console.log(resultado);
          }).catch((error) => {
            alert(error);
          });
        }
        catch (err) {
          console.error(err);

        }

        //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      }
      window.location.reload();
    }
    this.setState({ loading: null });

  }
  render() {
    return (
      <div className="corpoImput">
        <div className="conteudo-input">
          <form onSubmit={this.cadastraProduct}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <label>Nome:</label>
                  <input type="name" className="form-control" placeholder="Nome do produto" value={this.state.nome} onChange={this.mudaNome} maxlength="40" />
                </div>
                <div className="col-md-6">
                  <label>Tipo:</label>
                  <br />
                  <select className="btn btn-secondary btn-block" value={this.state.tipo} onChange={this.mudaTipo} >
                    <option selected value="">Selecione</option>
                    <option>Alimento</option>
                    <option>Higiene Pessoal</option>
                    <option>Bebida</option>
                    <option>Brinquedo</option>
                    <option>Ferramenta</option>
                    <option>Roupa</option>
                  </select>
                </div>
              </div>
            </div>
            <p>
              <br />
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <label>Preço:</label>
                    <input type="number" className="form-control" placeholder="R$0.00" value={this.state.preco} onChange={this.mudaPreco} min="1" max="999999"></input>
                  </div>
                  <div className="col-md-6">
                    <label>Estoque:</label>
                    <br />
                    <input type="number" className="form-control" placeholder="0" value={this.state.estoque} onChange={this.mudaEstoque} min="1" max="999999" />
                  </div>
                </div>
              </div>
            </p>
            <hr />
            {this.state.erro}
            <br />
            <center>
              <button type="submit" className="btn btn-secondary">Salvar</button>
              <br />
              <span>{this.state.loading}</span>
            </center>
          </form>
        </div>
      </div>

    );
  }

}


