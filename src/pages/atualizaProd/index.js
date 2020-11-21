import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./styles.css";
import { Button, Form, FlexboxGrid, FormControl, SelectPicker, ControlLabel, FormGroup, Schema, Loader, Alert } from 'rsuite';
const { StringType, NumberType } = Schema.Types;

export default function App() {

    let { id } = useParams()

    useEffect(() => {
        carregaProd()
    }, [])

    async function carregaProd() {
        setLoad(true)
        await axios.get(`https://apitestenode.herokuapp.com/api/busca-id?id=${id}`).then((resposta) => {
            setProduto(resposta.data.produto)

        })
        setLoad(false)
    }
    const model = Schema.Model({
        nome: StringType().isRequired('Campo Obrigatório.'),
        preco: NumberType().isRequired('Campo Obrigatório.'),
        estoque: NumberType().isRequired('Campo Obrigatório.'),
        estoqueMin: NumberType().isRequired('Campo Obrigatório.'),
    });


    const [produtos, setProduto] = useState()
    const [loading, setLoad] = useState(false)


    async function salvar() {
        setLoad(true)
        const { nome, preco, estoque, estoqueMin, tipo } = produtos
        if (nome != "" && preco != "" && estoque != "" && estoqueMin != "" && tipo != null) {
            await axios.put("https://apitestenode.herokuapp.com/api/produtos/update", { "produto": produtos }).then((resposta) => {
                Alert.success('Atualizado com Sucesso.')
            }).catch((error) => {
                Alert.error("" + error)
            });
        }
        setLoad(false)
    }

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
            "value": "Brinquedo",
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
    function setaValores(valor) {
        const { nome, tipo, id, estoque, estoqueMin, preco } = valor;
        if (nome == undefined) { valor.nome = produtos.nome }
        if (tipo == undefined) { valor.tipo = produtos.tipo }
        if (preco == undefined) { valor.preco = produtos.preco }
        if (estoque == undefined) { valor.estoque = produtos.estoque }
        if (estoqueMin == undefined) { valor.estoqueMin = produtos.estoqueMin }
        valor.id = produtos.id
        setProduto(valor)
    }
    async function mudaTipo(escolha) {
        console.log(produtos.tipo)
        const prod = produtos
        prod.tipo = escolha
        await setProduto(prod)
        console.log(produtos)
    }


    return (
        <>
            <center>
                <div className="corpoImput">

                    <div className="conteudo-input">
                        <center>
                            <h2>Atualizar Produto</h2>
                        </center>
                        <hr className="my-4"></hr>
                        {produtos != undefined ?
                            <FlexboxGrid justify="center">
                                <Form onChange={(valor) => setaValores(valor)} onSubmit={() => salvar()} model={model}>
                                    <FormGroup>
                                        <ControlLabel>Nome</ControlLabel>
                                        <FormControl name="nome" value={produtos.nome} />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Tipo</ControlLabel>
                                        <SelectPicker data={tipos} defaultValue={produtos.tipo} onChange={mudaTipo} style={{ width: 224 }} />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Preço</ControlLabel>
                                        <FormControl name="preco" type="number" step="0.01" value={produtos.preco} />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Estoque</ControlLabel>
                                        <FormControl name="estoque" type="number" value={produtos.estoque} />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Estoque Mínimo</ControlLabel>
                                        <FormControl name="estoqueMin" type="number" value={produtos.estoqueMin} />
                                    </FormGroup>
                                    <center>
                                        <Button appearance="primary" type="submit">Salvar</Button>
                                    </center>

                                </Form>

                            </FlexboxGrid>
                            : null}

                    </div>
                </div>
            </center>

            {loading == true ? <Loader backdrop content="Carregando..." vertical /> : null}
        </>
    )

}


