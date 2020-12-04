import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";
import { history } from '../../history';
import { Button, Modal, Icon, Grid, Col, Table, Alert, Row, IconButton, CheckPicker, FlexboxGrid } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;

export default function App(props) {

  const displayLength = 10
  const [escolha, setEscolha] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState([])
  const [produtos, setProdutos] = useState([])
  const [show, setShow] = useState(false)
  const data = getData()
  const opcoes = [
    {
      "label": "Estoque Baixo",
      "value": "estoque-baixo",
      "role": "Tipo"
    },
    {
      "label": "Alimento",
      "value": "alimento",
      "role": "Tipo"
    },
    {
      "label": "Bebida",
      "value": "bebida",
      "role": "Tipo"
    },
    {
      "label": "Brinquedo",
      "value": "brinquedo",
      "role": "Tipo"
    },
    {
      "label": "Ferramenta",
      "value": "ferramenta",
      "role": "Tipo"
    },
    {
      "label": "Roupa",
      "value": "roupa",
      "role": "Tipo"
    }
  ]

  const ActionCell = ({ value, rowData, dataKey, ...props }) => {
    return (
      <Cell {...props} className="link-group">
        <Icon icon={props.icon} size="lg" style={{ cursor: 'pointer' }} onClick={() => { props.funcao(rowData[dataKey]) }} />
      </Cell>
    )
  }

  useEffect(() => {
    loadProducts();
  }, [])

  async function loadProducts() {
    setLoading(true)
    await axios.get("https://apitestenode.herokuapp.com/api/produtos").then(resultado => {
      setProdutos(resultado.data.produtos);
    }).catch(error => {
      Alert.error("" + error)
    });
    setLoading(false)

  }

  function update(id) {
    history.replace(`/app/atualiza/${id}`);
  }

  async function deleta(id) {
    setLoading(true)
    try {
      await axios.delete(`https://apitestenode.herokuapp.com/api/produtos/apagar?id=${id}`);
      Alert.success('Excluido com sucesso.')
    } catch (err) {
      console.error(err);
    }
    loadProducts();
  }

  //avança e retorna pagina
  function handleChangePage(dataKey) {
    setPage(dataKey);
  }
  function handleChangeLength(dataKey) {
    setPage(1);
    displayLength = dataKey
  }

  //organiza os pordutos para listagem
  function getData() {
    return produtos.filter((v, i) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    });
  }

  //abrir e fechar modal
  function close() {
    setShow(false)
  }
  function open() {
    setShow(true)
  }
  async function seleciona(escolha) {
    await setEscolha(escolha)
  }

  async function filtrar() {
    close()
    const filtros = escolha
    if (filtros.length == 0) {
      loadProducts()
    } else {
      setLoading(true)
      await axios.post("https://apitestenode.herokuapp.com/api/produtos-filtrados", { "filtros": filtros }).then(resultado => {
        setProdutos(resultado.data.produtos);
      }).catch(error => {
        Alert.error("" + error)
      });
      setLoading(false)
    }
  }

  return (
    <FlexboxGrid justify="center">
      <div id="home">
        <div id="corpo-home">
          <center>
            <h1>Produtos</h1>
          </center>
          <hr className="my-4"></hr>
          <Grid fluid>
            <Table autoHeight AutoComplete data={data} loading={loading} className='tabela-produtos'>
              <Column width={50} align="center" fixed >
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>
              <Column width={200} fixed>
                <HeaderCell>Nome</HeaderCell>
                <Cell dataKey="nome" />
              </Column>
              <Column width={100} fixed>
                <HeaderCell>Tipo</HeaderCell>
                <Cell dataKey="tipo" />
              </Column>
              <Column width={100} fixed>
                <HeaderCell>Estoque</HeaderCell>
                <Cell dataKey="estoque" />
              </Column>
              <Column width={100} fixed >
                <HeaderCell>Estoque Min.</HeaderCell>
                <Cell dataKey="estoqueMin" />
              </Column>
              <Column width={100} fixed>
                <HeaderCell>Preço</HeaderCell>
                <Cell dataKey="preco" />
              </Column>
              <Column width={100} fixed>
                <HeaderCell>Editar</HeaderCell>
                <ActionCell dataKey={'id'} funcao={update} icon={'edit2'} />
              </Column>
              <Column width={70} fixed>
                <HeaderCell>Excluir</HeaderCell>
                <ActionCell dataKey={'id'} funcao={deleta} icon={'trash'} />
              </Column>
            </Table>
            <Pagination
              showLengthMenu={false}
              activePage={page}
              displayLength={displayLength}
              total={produtos.length}
              onChangePage={handleChangePage}
              onChangeLength={handleChangeLength}
            />
            <IconButton icon={<Icon icon="filter" />} size="xs" color="blue" onClick={open}>Filtrar</IconButton>
          </Grid>
          {
            //modal de filtragem
          }
          <Modal show={show} onHide={close} size="xs">
            <Modal.Header>
              <Modal.Title>Filtrar Produtos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CheckPicker data={opcoes} value={escolha} onChange={seleciona} style={{ width: 224 }} />
            </Modal.Body>
            <Modal.Footer>
              <Button appearance="primary" onClick={() => { filtrar() }}>Filtrar</Button>
              <Button onClick={close} appearance="subtle">Cancelar</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </FlexboxGrid>
  );

}


