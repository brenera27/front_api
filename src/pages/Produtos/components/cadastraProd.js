import React from 'react';

import { Button, Form, FlexboxGrid, FormControl, SelectPicker, ControlLabel, FormGroup, Schema, Loader } from 'rsuite';

export default function App(props) {

  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    nome: StringType().isRequired('Campo Obrigatório.'),
    preco: NumberType().isRequired('Campo Obrigatório.'),
    estoque: NumberType().isRequired('Campo Obrigatório.'),
    estoqueMin: NumberType().isRequired('Campo Obrigatório.'),
  });

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
    <>
      <center>
        <div className="corpoImput">
          <div className="conteudo-input">
            <center>
              <h2>Cadastrar Produtos</h2>
            </center>
            <hr className="my-4"></hr>
            <FlexboxGrid justify="center">
              <Form model={model} onSubmit={() => props.salvar()}>

                <FormGroup>
                  <ControlLabel>Nome</ControlLabel>
                  <FormControl name="nome" value={nome} onChange={value=>props.setProduto({...produto, nome:value})}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Tipo</ControlLabel>
                  <SelectPicker data={tipos} defaultValue={tipo} onChange={mudaTipo} style={{ width: 224 }} />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Preço</ControlLabel>
                  <FormControl name="preco" value={preco} type="number" step="0.01"  onChange={value=>props.setProduto({...produto, preco:value})}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Estoque</ControlLabel>
                  <FormControl name="estoque" type="number" value={estoque}  onChange={value=>props.setProduto({...produto, estoque:value})}/>
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Estoque Mínimo</ControlLabel>
                  <FormControl name="estoqueMin" type="number" value={estoqueMin}  onChange={value=>props.setProduto({...produto, estoqueMin:value})}/>
                </FormGroup>
                <center>
                  <Button appearance="primary" type="submit">Salvar</Button>
                </center>

              </Form>

            </FlexboxGrid>
          </div>
        </div>

      </center>

      {props.loading == true ? <Loader backdrop content="Carregando..." vertical /> : null}
    </>
  )

}


