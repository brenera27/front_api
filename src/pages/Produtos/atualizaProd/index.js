import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./styles.css";
import { Alert } from 'rsuite';
import Formulario from '../components/cadastraProd'

export default function App() {

    useEffect(() => {
        carregaProd()
    }, [])

    let { id } = useParams()
    const [produto, setProduto] = useState({ id: "", nome: "", tipo: "", preco: "", estoque: "", estoqueMin: "" })
    const [loading, setLoad] = useState(false)

    async function carregaProd() {
        setLoad(true)
        await axios.get(`https://apitestenode.herokuapp.com/api/busca-id?id=${id}`).then((resposta) => {
            setProduto(resposta.data.produto)
        })
        setLoad(false)
    }

    async function salvar() {
        setLoad(true)
        const { nome, preco, estoque, estoqueMin, tipo } = produto
        if (nome != "" && preco != "" && estoque != "" && estoqueMin != "" && tipo != null) {
            await axios.put("https://apitestenode.herokuapp.com/api/produtos/update", { produto }).then((resposta) => {
                Alert.success('Atualizado com Sucesso.')
            }).catch((error) => {
                Alert.error("" + error)
            });
        }
        setLoad(false)
    }



    return (
        <>
           <Formulario produto={produto} salvar={salvar} setProduto={setProduto} loading={loading}/>
        </>
    )

}


