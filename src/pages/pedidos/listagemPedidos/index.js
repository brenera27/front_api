import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, Icon, ControlLabel, Input, AutoComplete, IconButton, Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import 'rsuite/lib/styles/index.less';
import "./styles.css"
import { Table } from 'rsuite';

const styles = {
    marginBottom: 10
};
const CustomInput = ({ ...props }) => <Input {...props} style={styles} />;
const { Column, HeaderCell, Cell, Pagination } = Table;

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayLength: 10,
            loading: false,
            page: 1,
            produtos: [],
            total: null,
            page: 1,
            show: false,
            nome: null,
            todosProd: [],
            sugestoes: null,
            idProd : {id:null}
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.setNome = this.setNome.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.setValor = this.setValor.bind(this);
        this.handleChangeLength = this.handleChangeLength.bind(this);
    }

    componentDidMount() {
        this.loadProducts()
    }

    loadProducts = async () => {
        this.setState({ loading: true })
        const filtros = this.props.filtros
        // Busca com filtros
        await axios.post("https://apitestenode.herokuapp.com/api/produtos-filtrados", { filtros }).then(resposta => {
            let resultado = resposta.data.produtos
            resultado.map((produto) => {
                produto.qtdComprar = null
            })
            this.setState({ produtos: resultado })
        }).catch(error => {
            Alert.error(""+error)
            //console.error('Error during service worker registration:', error);
            this.setState({loading:false})
          });

        // Busca para salvar os nomes e usar o imput autoComplete e para validar se existe quadno o usuário for acrescentar outro produto
        await axios.get("https://apitestenode.herokuapp.com/api/produtos").then(resposta => {
            this.setState({ todosProd: resposta.data.produtos })
            let sugestoes = resposta.data.produtos.map((produto) => {
                return produto.nome
            })
            this.setState({ sugestoes: sugestoes })
        });

        this.setState({ loading: false })
    }

    // abrir e fechar modal de novo produto
    close() {
        this.setState({ show: false });
    }
    open() {
        this.setState({ show: true });
    }

    // nome do novo produto do autoComplete
    setNome(value) {
        this.setState({ nome: value });
    }

    // proxima página e página anterior
    handleChangePage(dataKey) {
        this.setState({
            page: dataKey
        });
    }
    handleChangeLength(dataKey) {
        this.setState({
            page: 1,
            displayLength: dataKey
        });
    }

    // pegando os produtos que vao ser listados
    getData() {
        const { displayLength, page, produtos } = this.state;

        return produtos.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
    }

    // salvando o ID do produto esta sendo editado
    setId = async (id) => {
        const {idProd} = this.state
        idProd.id = id
    }

    // setando a quantidade a comprar do produto com id salvo
    setValor = (value) => {
        const { produtos, idProd } = this.state
        produtos.map((produto) => {
            if (produto.id == idProd.id) {
                produto.qtdComprar = value
            }
        })
    }

    exclui = (id) => {
        const {produtos} = this.state
        for(let i = 0; i<produtos.length; i++){
            if(produtos[i].id == id){
                produtos.splice(i,1);
                this.setState({produtos:produtos})
                i=produtos.length
                Alert.success('Removido com sucesso.')
            }
        }
    }

    adicionaProd = () => {
        const { todosProd, nome, produtos } = this.state
        let contem = false
        let feito = false
        if(todosProd.length > 0){
            for(let i = 0; i<todosProd.length;i++){
                if (todosProd[i].nome == nome) {
                    produtos.map((filtrado) => {
                        if(filtrado.id == todosProd[i].id){
                            Alert.error('Produto ja adicionado a sacola.')
                            contem = true
                            feito = true
                        }
                    })
                    if(contem == false){
                        produtos.push(todosProd[i])
                        feito = true
                        Alert.success('Adicionado com sucesso.')
                        this.close()
                    }
                }
            }
            if(feito == false){
                Alert.error('Produto não encontrado.')
            }else{
                this.setState({produtos:produtos})
            }
        }      
    }

    // Envia os produtos selecionados para a proxima pagina de listagem
    finalizar = () => {
        const {produtos} = this.state
        let nulo = false
        produtos.map((produto)=>{
            if(produto.qtdComprar == null){
                nulo = true
                Alert.error('Produto com campo Quantidade vazio.')
            }
        })
        if(nulo === false){
            this.props.finalizar(this.state.produtos)
        }
    }
    
    render() {
        const data = this.getData();
        const { loading, displayLength, page } = this.state;

        const ActionCell = ({ value, rowData, dataKey, ...props }) => {
            if (props.botao == true) {
                return (
                    <Cell {...props} className="link-group" className='coluna-pedidos'>
                        <Icon icon="minus-square" size="lg" style={{ color: '#f44336', cursor: 'pointer' }} onClick={() => { this.exclui(rowData[dataKey]) }} />
                    </Cell>
                );
            } else {
                return (
                    <Cell {...props}  className='coluna-pedidos'>
                        <CustomInput value={rowData.qtdComprar} size="xs" type="number" onChange={this.setValor} onSelect={() => { this.setId(rowData[dataKey]) }}  />
                    </Cell>
                );
            }
        };
        return (
            <div id="tabela-pedidos">
                <br />
                <center>
                    <h3>Produtos Filtrados</h3>
                </center>
                <hr className="my-4"></hr>
                <div>
                    <Table autoHeight AutoComplete data={data} loading={loading} className='tabela-pedidos'>
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
                        total={this.state.produtos.length}
                        onChangePage={this.handleChangePage}
                        onChangeLength={this.handleChangeLength}
                    />
                    
                    <div>
                        <Modal show={this.state.show} onHide={this.close} size="xs">
                            <Modal.Header>
                                <Modal.Title>Adicionar produto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ControlLabel>Nome</ControlLabel>
                                <AutoComplete data={this.state.sugestoes} onChange={this.setNome} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>{this.adicionaProd()}} appearance="primary">Adicionar</Button>
                                <Button onClick={this.close} appearance="subtle">Cancelar</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>
                <center>
                    <Button appearance="primary" onClick={() => { this.finalizar() }}>Finalizar</Button>
                </center>
                <IconButton icon={<Icon icon="plus" />} size="xs" color="cyan" onClick={this.open} />
            </div>
        );
    }
}


