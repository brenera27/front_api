import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";
import { Button, Form, FlexboxGrid, FormControl, SelectPicker, ControlLabel, FormGroup, Schema, Loader, Alert } from 'rsuite';

export default function App() {

  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    nome: StringType().isRequired('Campo Obrigatório.'),
    preco: NumberType().isRequired('Campo Obrigatório.'),
    estoque: NumberType().isRequired('Campo Obrigatório.'),
    estoqueMin: NumberType().isRequired('Campo Obrigatório.'),
  });

  const [produto, setProduto] = useState({ id: "", nome: "", tipo: "", preco: "", estoque: "", estoqueMin: "" })
  const [loading, setLoad] = useState(false)


  async function salvar() {
    console.log(produto)

    const { nome, preco, estoque, estoqueMin, tipo } = produto
    if (nome != "" && preco != "" && estoque != "" && estoqueMin != "" && tipo != null) {
      setLoad(true)
      console.log(produto)
      await axios.post("https://apitestenode.herokuapp.com/api/produtos/novo", { "nome": produto.nome, "tipo": produto.tipo, "preco": produto.preco, "estoque": produto.estoque, "estoqueMin": produto.estoqueMin }).then(() => {
        Alert.success('Cadastrado com Sucesso.')
        window.location.reload(false);
      }).catch((error) => {
        Alert.error("" + error)
      });

    }
    setLoad(false)
  }
  const tipos = [
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
  function setaValores(valor) {
    const { nome, tipo, id, estoque, estoqueMin, preco } = valor;
    if (nome == undefined) { valor.nome = produto.nome }
    if (tipo == undefined) { valor.tipo = produto.tipo }
    if (preco == undefined) { valor.preco = produto.preco }
    if (estoque == undefined) { valor.estoque = produto.estoque }
    if (estoqueMin == undefined) { valor.estoqueMin = produto.estoqueMin }
    valor.id = produto.id
    setProduto(valor)
  }
  async function mudaTipo(escolha) {
    console.log(produto.tipo)
    const prod = produto
    prod.tipo = escolha
    await setProduto(prod)
    console.log(produto)
  }

  return (
    <>

      <center>
        <div className="corpoImput">
          <div className="conteudo-input">
            <center>
              <h2>Cadastrar Produtos</h2>
            </center>
            <hr className="my-4"></hr>
            <FlexboxGrid justify="center">
              <Form onChange={(valor) => setaValores(valor)} model={model} onSubmit={() => salvar()}>

                <FormGroup>
                  <ControlLabel>Nome</ControlLabel>
                  <FormControl name="nome" value={produto.nome} />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Tipo</ControlLabel>
                  <SelectPicker data={tipos} defaultValue={produto.tipo} onChange={mudaTipo} style={{ width: 224 }} />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Preço</ControlLabel>
                  <FormControl name="preco" value={produto.preco} type="number" step="0.01" />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Estoque</ControlLabel>
                  <FormControl name="estoque" type="number" value={produto.estoque} />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Estoque Mínimo</ControlLabel>
                  <FormControl name="estoqueMin" type="number" value={produto.estoqueMin} />
                </FormGroup>
                <center>
                  <Button appearance="primary" type="submit">Salvar</Button>
                </center>

              </Form>

            </FlexboxGrid>
          </div>
        </div>

      </center>

      {loading == true ? <Loader backdrop content="Carregando..." vertical /> : null}
    </>
  )

}


