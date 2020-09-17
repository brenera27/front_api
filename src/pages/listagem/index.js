import React, { Component } from 'react';
import axios from 'axios';
import "./styles.css";
import Moment, { months } from "moment";
import Cadastro from "../cadastraProd";

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      loading: null
    };

  }

  atualiza() {

  }
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    this.setState({ loading: <img width="36px" height="36px" src={require('../img/carregando.gif')} /> });
    await axios.get('https://apitestenode.herokuapp.com/api/produtos').then(resultado => {
      this.setState({ produtos: resultado.data });
    });
    this.setState({ loading: null });
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
          <br /><br />

          <div className="lista-Usuarios">

            <div id="barra-rolagem" class="card-body">
              
                <table  className="table table-borderless ">
                  <caption>Total: {this.state.produtos.length}</caption>
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
                  {this.state.produtos.map(produto => (
                    <tbody>
                      <tr className="produto">
                        <th scope="row">{produto.id}</th>
                        <td>{produto.nome}</td>
                        <td>{produto.tipo}</td>
                        <td>{produto.estoque}</td>
                        <td>R${produto.preco}</td>
                        <td>
                          <button className="editar" onClick={() => { this.update(produto); }}> <img src={require('../img/edit-24px.svg')} /></button>
                        </td>
                        <td>
                          <button className="apagar" onClick={() => { this.deleta(produto.id); }}>
                            <img src={require('../img/delete-24px.svg')} />
                          </button>
                        </td>
                      </tr>

                    </tbody>
                  ))}

                </table>
              
              <span>{this.state.loading}</span>
            </div>

          </div >
        </center>
      </div>
    );
  }
}


