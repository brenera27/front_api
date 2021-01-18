import React from 'react';
import { Button, Form, FlexboxGrid, Input, SelectPicker, ControlLabel, Row, Col, Loader } from 'rsuite';
import "./styles.css";
export default function App(props) {

  const produto = props.produto
  const { nome, preco, estoque, estoqueMin, tipo } = produto

  const tipos = [
    {
      "label": "Alimento",
      "value": "Alimento",
      "role": "Tipo"
    },
    {
      "label": "Bebida",
      "value": "Bebida",
      "role": "Tipo"
    },
    {
      "label": "Brinquedo",
      "value": "brinquedo",
      "role": "Tipo"
    },
    {
      "label": "Ferramenta",
      "value": "Ferramenta",
      "role": "Tipo"
    },
    {
      "label": "Roupa",
      "value": "Roupa",
      "role": "Tipo"
    }

  ]

  async function mudaTipo(escolha) {
    console.log(produto.tipo)
    const prod = produto
    prod.tipo = escolha
    await props.setProduto(prod)
    console.log(produto)
  }

  return (
    <FlexboxGrid justify="center">
      <div className="corpoImput">
        <div className="conteudo-input">
          <center>
            <h2>Cadastrar Produtos</h2>
          </center>
          <hr className="my-4"></hr>
          <FlexboxGrid justify="center">
            <Form onSubmit={() => props.salvar()}>
              <Row className="show-grid">
                <Col xs={12}>
                  <ControlLabel>Nome</ControlLabel>
                  <Input name="nome" value={nome} onChange={value => props.setProduto({ ...produto, nome: value })} />
                </Col>
                <Col xs={12}>
                  <ControlLabel>Tipo</ControlLabel>
                  <SelectPicker data={tipos} defaultValue={tipo} onChange={mudaTipo} style={{ width: 224 }} />
                </Col>
              </Row>
              <br />
              <Row className="show-grid">
                <Col xs={8}>
                  <ControlLabel>Preço</ControlLabel>
                  <Input name="preco" value={preco} type="number" step="0.01" onChange={value => props.setProduto({ ...produto, preco: value })} />
                </Col>
                <Col xs={8}>
                  <ControlLabel>Estoque</ControlLabel>
                  <Input name="estoque" type="number" value={estoque} onChange={value => props.setProduto({ ...produto, estoque: value })} />
                </Col>
                <Col xs={8}>
                  <ControlLabel>Estoque Mínimo</ControlLabel>
                  <Input name="estoqueMin" type="number" value={estoqueMin} onChange={value => props.setProduto({ ...produto, estoqueMin: value })} />
                </Col>
              </Row>
              <br />
              <center>
                <Button appearance="primary" type="submit">Salvar</Button>
              </center>
            </Form>
          </FlexboxGrid>
        </div>
      </div>
      {props.loading == true ? <Loader backdrop content="Carregando..." vertical /> : null}
    </FlexboxGrid>
  )

}


