import React from 'react'
import Alerta from '../alerta'
import "./styles.css"

function lista(props) {

    const produtos = props.pedidos
    let botao = null;
    if(produtos[0] != null){
        botao = <button type="button" class="btn btn-success" onClick={() => { finalizar() }}>Finalizar Compra</button>
    }else{
        botao = <button type="button" class="btn btn-secondary">Finalizar Compra</button>
    }
    let tabela = []
    let cont = 0
    cont *= 10
    
    produtos.map((produto) => {
        if (produto != null) {
            tabela.push(
                <tbody>
                    <tr>
                        <td>{produto.nome}</td>
                        <td>{produto.qtdComprar}</td>
                        <td>
                            <button className="apagar" onClick={() => { props.excluir(produto.id) }}>
                                <img width="30px" height="30px" src={require('../img/excluir.png')} />
                            </button>
                        </td>
                    </tr>
                </tbody>

            )
        }
    })

    function finalizar() {
    alert("Compra Finalizada")
    window.location.reload(); 
    }

    return (
        <div class="lista-Usuarios" >
            <div id="listaPedidos">
                <center>
                    <h3>Lista de compra</h3>
                </center>
                <hr className="my-4"></hr>
                <table class="table table-sm table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    {tabela}
                </table>
            </div>
            <center>
                {botao}
            </center>
        </div>
    )
}
export default lista
