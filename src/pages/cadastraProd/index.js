import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";
import { Button, Alert } from 'rsuite';


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
      estoqueMin: "",
      loading: null,
      erro: null

    };
    this.cadastraProduct = this.cadastraProduct.bind(this);
    this.mudaNome = this.mudaNome.bind(this);
    this.mudaTipo = this.mudaTipo.bind(this);
    this.mudaEstoque = this.mudaEstoque.bind(this);
    this.mudaPreco = this.mudaPreco.bind(this);
    this.mudaEstMin = this.mudaEstMin.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('updateProd') == "true") {
      this.updateProd();
    }
  }
  updateProd = () => {
    const prod = JSON.parse(localStorage.getItem('produto'));
    if (prod !== null) {
      const { nome, tipo, estoque, estoqueMin, preco, id } = prod;
      this.setState({ nome: nome });
      this.setState({ tipo: tipo });
      this.setState({ estoque: estoque });
      this.setState({ estoqueMin: estoqueMin });
      this.setState({ preco: preco });
      this.setState({ id: id });
      this.setState({ update: true });
      console.log(prod);
    }

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
  mudaEstMin(event) {
    this.setState({ estoqueMin: event.target.value });
  }
  mudaPreco(event) {
    this.setState({ preco: event.target.value });
  }

  cadastraProduct = async (event) => {
    event.preventDefault();
    const { id, nome, tipo, estoque, estoqueMin, preco } = this.state
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    if (nome === "" || tipo === "" || estoque === "" || preco === "") {
      Alert.error('Campo Obrigatório vazio.')
    } else {
      this.setState({ erro: null })
      if (this.state.update === true) {
        //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        await axios.put("http://apitestenode.herokuapp.com/api/produtos/update", { "id": id, "nome": nome, "tipo": tipo, "estoque": estoque,"estoqueMin":estoqueMin, "preco": preco });
        this.setState({ update: false });
        localStorage.setItem('updateProd', "false");
        localStorage.setItem('produto', null);
      } else {
        try {
          await axios.post("https://apitestenode.herokuapp.com/api/produtos/novo", { "nome": nome, "tipo": tipo, "estoque": estoque,"estoqueMin":estoqueMin, "preco": preco }).then(resultado => {
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
    const { id, nome, tipo, estoque,estoqueMin, preco } = this.state
    return (
      <center>
        <div className="corpoImput">
          <div className="conteudo-input">
            <center>
              <h1 class="display-4">Cadastrar Produtos</h1>
            </center>
            <hr className="my-4"></hr>
            <form onSubmit={this.cadastraProduct}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <label>Nome:</label>
                    <input type="name" className="form-control" placeholder="Nome do produto" value={nome} onChange={this.mudaNome} maxlength="40" />
                  </div>
                  <div className="col-md-6">
                    <label>Tipo:</label>
                    <br />
                    <select className="btn btn-secondary btn-block" value={tipo} onChange={this.mudaTipo} >
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
                    <div className="col-md-4">
                      <label>Preço:</label>
                      <input type="number" step="0.01" className="form-control" placeholder="R$0.00" value={preco} onChange={this.mudaPreco} min="1" max="999999"></input>
                    </div>
                    <div className="col-md-4">
                      <label>Estoque:</label>
                      <br />
                      <input type="number" className="form-control" placeholder="0" value={estoque} onChange={this.mudaEstoque} min="1" max="999999" />
                    </div>
                    <div className="col-md-4">
                      <label>Estoque Mínimo:</label>
                      <br />
                      <input type="number" className="form-control" placeholder="0" value={estoqueMin} onChange={this.mudaEstMin} min="1" max="999999" />
                    </div>
                  </div>
                </div>
              </p>
              <hr />
              {this.state.erro}
              <br />
              <center>
                <button type="submit" className="btn btn-secondary">Salvar</button>
                <br /><br />
                <span>{this.state.loading}</span>
              </center>
            </form>
          </div>
        </div>
      </center>
    );
  }

}


