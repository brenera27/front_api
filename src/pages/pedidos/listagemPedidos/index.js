import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal, Icon, ControlLabel, Input, AutoComplete, IconButton, Alert, FlexboxGrid } from 'rsuite';
import "./styles.css"
import { Table } from 'rsuite';

const styles = {
    marginBottom: 10
};

const CustomInput = ({ ...props }) => <Input {...props} style={styles} />;
const { Column, HeaderCell, Cell, Pagination } = Table;

export default function App(props) {


    let [idProd, setIdProd] = useState(null)
    const [displayLength, setDisplayLength] = useState(10)
    const [page, setPage] = useState(1)
    const [nome, setNome] = useState("")
    const [nomesProd, setNomesProd] = useState([])
    const [produtos, setProdutos] = useState([])
    const [loading, setLoad] = useState(false)
    const [show, setShow] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
         loadProducts()
    }, [])

    useEffect(() => {
        atualizaTabela()
    }, [produtos])

    function atualizaTabela() {
        setData(getData())
    }

    async function loadProducts() {
        setLoad(true)
        const filtros = props.filtros
        // Busca pordutos com filtros
        await axios.post("https://apitestenode.herokuapp.com/api/produtos-filtrados", { filtros }).then(async resposta => {
            let resultado = resposta.data.produtos
            resultado.map((produto) => {
                produto.qtdComprar = null
            })
            await setProdutos(resultado)

        }).catch(error => {
            Alert.error("" + error)
        });

        // Busca todos os produtos para salvar os nomes e usar o imput autoComplete
        await axios.get("https://apitestenode.herokuapp.com/api/produtos").then(resposta => {
            let nomes = resposta.data.produtos.map((produto) => {
                return produto.nome
            })
            setNomesProd(nomes)
        });

        setLoad(false)
    }

    // abrir e fechar modal de novo produto
    function close() {
        setShow(false)
    }
    function open() {
        setShow(true)
    }

    // proxima página e página anterior
    function handleChangePage(dataKey) {
        setPage(dataKey)
    }
    function handleChangeLength(dataKey) {
        setPage(1)
    }

    // pegando os produtos que vao ser listados
    function getData() {
        return produtos.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        })
    }

    // setando a quantidade a comprar do produto com id salvo
    function setValor(value) {
        produtos.map((produto) => {
            if (produto.id == idProd) {
                produto.qtdComprar = value
            }
        })
    }

    function exclui(id) {
        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].id == id) {
                produtos.splice(i, 1);
                const aux = produtos
                setProdutos(aux)
                console.log(produtos)
                i = produtos.length
                atualizaTabela()
                Alert.success('Removido com sucesso.')
            }
        }
    }

    async function adicionaProd() {
        setLoad(true)
        const contem = produtos.some(produto => {
            return produto.nome == nome
        })
        contem == false ? await axios.get(`https://apitestenode.herokuapp.com/api/busca-nome?nome=${nome}`).then((resultado) => {
            resultado.data.produto ? produtos.push(resultado.data.produto) : Alert.error("" + resultado.data)
            setShow(false)
        }) : Alert.warning("Produto ja adicionado a sacola")
        atualizaTabela()
        setLoad(false)
    }

    // Envia os produtos selecionados para a proxima pagina de listagem
    function finalizar() {
        let nulo = false
        produtos.map((produto) => {
            if (produto.qtdComprar == null) {
                nulo = true
                Alert.error('Produto com campo Quantidade vazio.')
            }
        })
        if (nulo === false) {
            props.finalizar(produtos)
        }
    }

    const ActionCell = ({ value, rowData, dataKey, ...props }) => {
        if (props.botao == true) {
            return (
                <Cell {...props} className="link-group" className='coluna-pedidos'>
                    <Icon icon="minus-square" size="lg" style={{ color: '#f44336', cursor: 'pointer' }} onClick={() => { exclui(rowData[dataKey]) }} />
                </Cell>
            );
        } else {
            return (
                <Cell {...props} className='coluna-pedidos'>
                    <CustomInput value={rowData.qtdComprar} size="xs" type="number" onChange={setValor} onSelect={() => { idProd = rowData[dataKey] }} />
                </Cell>
            );
        }
    };

    return (
        <FlexboxGrid justify="center">
            <div id="tabela-pedidos">
                <div id="conteudo-tab-ped">
                    <center>
                        <h3>Produtos Filtrados</h3>
                    </center>
                    <hr className="my-4"></hr>
                    <div>
                        <Table autoHeight AutoComplete data={data} loading={loading}>
                            <Column width={50} align="center" fixed className='coluna-pedidos'>
                                <HeaderCell>Id</HeaderCell>
                                <Cell dataKey="id" />
                            </Column>
                            <Column width={200} fixed className='coluna-pedidos'>
                                <HeaderCell>Nome</HeaderCell>
                                <Cell dataKey="nome" />
                            </Column>
                            <Column width={100} fixed className='coluna-pedidos'>
                                <HeaderCell>Tipo</HeaderCell>
                                <Cell dataKey="tipo" />
                            </Column>
                            <Column width={100} fixed className='coluna-pedidos'>
                                <HeaderCell>Estoque</HeaderCell>
                                <Cell dataKey="estoque" />
                            </Column>
                            <Column width={100} fixed className='coluna-pedidos'>
                                <HeaderCell>Estoque Min.</HeaderCell>
                                <Cell dataKey="estoqueMin" />
                            </Column>
                            <Column width={100} fixed className='coluna-pedidos'>
                                <HeaderCell>Quantidade</HeaderCell>
                                <ActionCell dataKey={'id'} />
                            </Column>
                            <Column width={70} fixed className='coluna-pedidos'>
                                <HeaderCell>Excluir</HeaderCell>
                                <ActionCell dataKey={'id'} botao={true} />
                            </Column>
                        </Table>
                        <Pagination
                            showLengthMenu={false}
                            activePage={page}
                            displayLength={10}
                            total={produtos.length}
                            onChangePage={handleChangePage}
                            onChangeLength={handleChangeLength}
                        />

                        <div>
                            <Modal show={show} onHide={close} size="xs">
                                <Modal.Header>
                                    <Modal.Title>Adicionar produto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ControlLabel>Nome</ControlLabel>
                                    <AutoComplete data={nomesProd} onChange={setNome} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => { adicionaProd() }} appearance="primary">Adicionar</Button>
                                    <Button onClick={close} appearance="subtle">Cancelar</Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                    <center>
                        <Button appearance="primary" onClick={() => { finalizar() }}>Gerar Pedido</Button>
                    </center>
                    <IconButton icon={<Icon icon="plus" />} size="xs" color="cyan" onClick={open} />
                </div>
            </div>
        </FlexboxGrid>
    );

}


