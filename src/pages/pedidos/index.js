import React, { Component } from 'react'
import axios from 'axios'
import "./styles.css"
import Listagem from './listagemPedidos'
import { Button, Alert } from 'rsuite';
import 'rsuite/lib/styles/index.less';
import Filtro from './filtraPedidos'

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            precoMax: 500,
            conteudo: null,
            precoMin: 0,
            opcoes: [
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

            ],
            escolha: ["estoque-baixo"]
        };

        this.seleciona = this.seleciona.bind(this);
        this.setPrecoMin = this.setPrecoMin.bind(this);
    }
    setPrecoMax(value){
        this.setState({ precoMax: value })
    }
    setPrecoMin (value){
        this.setState({ precoMin: value })
    }

    seleciona = async (escolha) => {
        await this.setState({ escolha })
        console.log(this.state.escolha)
    }

    estoqueBaixo = async () => {
        const { escolha } = this.state
        let contem = false
        for (let i = 0; i < escolha.length; i++) {
            if (escolha[i] == "estoque-baixo") {
                contem = true
                await escolha.splice(i, 1)
            }
        }
        if (contem == false) {
            await escolha.push("estoque-baixo")
        }
        await this.setState({ escolha: escolha })
        console.log(this.state.escolha)
    }

    comprar = (produtos) => {
        let emBranco = false
        if (produtos.length > 0) {
            produtos.map((produto) => {
                if (produto.qtdComprar == null) {
                    emBranco = true
                }
            })
            if (emBranco == false) {
                alert("foi lek")
                this.fechaErro()
            } else {
                Alert.warning('Produto com campo "Quantidade" vazio.')
            }
        }
    }

    componentDidMount() {
        this.setState({ conteudo: <Filtro setPrecoMax={this.setPrecoMax} setPrecoMin={this.setPrecoMin} precoMin={this.state.precoMin} precoMax={this.state.precoMax} seleciona={this.seleciona} valores={this.state.escolha} opcoes={this.state.opcoes} trocaConteudo={this.trocaConteudo} estoqueBaixo={this.estoqueBaixo} /> })
    }

    trocaConteudo = (filtros) => {
        const { escolha } = this.state
        if (escolha.length == 0 || (escolha.length == 1 && escolha[0] == "estoque-baixo")) {
            Alert.warning('Selecione pelo menos um Departamento.')
        } else {
            this.setState({ conteudo: <Listagem comprar={this.comprar} filtros={this.state.escolha}/> })
        }

    }

    render() {

        return (
            <> 
                {this.state.conteudo}
            </>
        );
    }
}


