import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Alert } from 'rsuite';
import Formulario from '../components/cadastraProd'
import API from '../../api'
export default function App() {

    useEffect(() => {
        carregaProd()
    }, [])

    let { id } = useParams()
    const [produto, setProduto] = useState({ id: "", nome: "", tipo: "", preco: "", estoque: "", estoqueMin: "" })
    const [loading, setLoad] = useState(false)

    async function carregaProd() {
        setLoad(true)
        await API.get(`busca-id?id=${id}`).then((resposta) => {
            setProduto(resposta.data.produto)
        })
        setLoad(false)
    }

    async function salvar() {
        setLoad(true)
        let vazio = false
        const { nome, preco, estoque, estoqueMin, tipo } = produto
        if (nome != "" && preco != "" && estoque != "" && estoqueMin != "" && tipo != null) {
            await API.put("produtos/update", { produto }).then((resposta) => {
                Alert.success('Atualizado com Sucesso.')
            }).catch((error) => {
                Alert.error("" + error)
            });
        }else{
            if(nome == ""){Alert.warning('Nome obrigatório.')}
            if(preco == ""){Alert.warning('Preco obrigatório.')}
            if(estoque == ""){Alert.warning('Estoque obrigatório.')}
            if(estoqueMin == ""){Alert.warning('Estoque Mínimo obrigatório.')}
        }
        setLoad(false)
    }



    return (
        <>
           <Formulario produto={produto} salvar={salvar} setProduto={setProduto} loading={loading}/>
        </>
    )

}


