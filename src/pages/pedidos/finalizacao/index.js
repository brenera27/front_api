import React from 'react'
import { Table } from 'rsuite';
import "./styles.css"
const { Column, HeaderCell, Cell } = Table;

//lista dos produtos filtrados da tela de listagem de produtos
function finalizar(props) {
    const data = props.data;
    return (
        <div id="filtro-finalizacao">
            <div id="corpo-finalizacao">
                <Table autoHeight data={data} hover={false}>
                    <Column width={50}>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column width={200}>
                        <HeaderCell>Nome</HeaderCell>
                        <Cell dataKey="nome" />
                    </Column>
                    <Column width={100}>
                        <HeaderCell>Tipo</HeaderCell>
                        <Cell dataKey="tipo" />
                    </Column>
                    <Column width={150}>
                        <HeaderCell>Quantidade Comprar</HeaderCell>
                        <Cell dataKey="qtdComprar" />
                    </Column>
                </Table>
            </div>
        </div>
    );
}

export default finalizar

