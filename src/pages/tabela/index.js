import React from 'react'
import axios from 'axios'
import "./styles.css"

function tabela(props) {
    const produtos = props.produtos
    let table = []
    let num = 0
    let qtdPag = 0
    let paginaAtual = 0
    let botoes = []

    calcTotalPages();
    carrega();

    function calcTotalPages() {
        qtdPag = produtos.length / 10
        geraBotoes()
    }

    function proxPage() {     
        if (qtdPag > (paginaAtual + 1)) {
            carrega(paginaAtual + 1)
            paginaAtual++
        }
    }

    function anterPage() {
        if (paginaAtual > 0) {
            carrega(paginaAtual - 1)
            paginaAtual--
        }
    }

    function geraBotoes() {
        for (let i = 0; i < qtdPag; i++) {
            botoes[i] = <button type="button" class="btn btn-link" id="botaoPag" onClick={() => {botaoNum(i) }}>{i + 1}</button>
        }
    }

    function botaoNum(page) {
        paginaAtual = page
        carrega(page)
        console.log(paginaAtual)
    }

    function update(produto) {
        localStorage.setItem('updateProd', "true");
        localStorage.setItem('produto', JSON.stringify(produto));
      }
    
      async function deleta(id) {
        try {
          await axios.delete(`https://apitestenode.herokuapp.com/api/produtos/apagar?id=${id}`);
        } catch (err) {
          console.error(err);
          alert(err);
        }
        window.location.reload(false);
      }

    function carrega(num = paginaAtual) {
        let cont = num
        cont *= 10
        for (let i = cont; i < (cont + 10); i++) {
            if (i < produtos.length) {
            if (produtos[i] != null) {
                table.push(
                    <tbody>
                        <tr id="produto">
                            <th scope="row">{produtos[i].id}</th>
                            <td>{produtos[i].nome}</td>
                            <td>{produtos[i].tipo}</td>
                            <td>{produtos[i].estoque}</td>
                            <td>{produtos[i].estoqueMin}</td>
                            <td>R${produtos[i].preco}</td>
                            <td>
                                <a className="editar" onClick={() => { update(produtos[i]) }} href="/app/cadastra">< img className="editar" src={require('../img/edit-24px.svg')} /></a>
                            </td>
                            <td>
                                <button className="apagar" onClick={() => { deleta(produtos[i].id) }}>
                                    <img src={require('../img/delete-24px.svg')} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )
            }
        }
        }
        if (table.length === 0) {
            table = <span className="Error">Nenhum produto encontrado</span>
        }
    }

    return (
        <div id="corpo-Home">
                <center>
                    <div className="lista-Usuarios">
                        <div id="corpo-listagem">
                            <center>
                                <h1 class="display-4">Produtos</h1>
                            </center>
                            <hr className="my-4"></hr>
                            <table className="table table-borderless ">
                                <caption>Página: {paginaAtual + 1}</caption>
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
                                {table}
                            </table>
                        </div>
                    </div >
                    <br />
                    <div class="btn-toolbar  justify-content-center" role="toolbar" aria-label="Toolbar com grupos de botões">
                        <div class="btn-group mr-2" role="group" aria-label="Primeiro grupo">
                            <button type="button" class="btn btn-link" id="botaoPag" onClick={() => {anterPage()}}>Anterior</button>
                            {botoes}
                            <button type="button" class="btn btn-link" id="botaoPag" onClick={() => {proxPage()}}>Próximo</button>
                        </div>
                    </div>
                </center>
        </div>
    )
}

export default tabela