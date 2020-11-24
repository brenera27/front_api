import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";
import { Alert } from 'rsuite';
import Formulario from '../components/cadastraProd'
export default function App() {

  const [produto, setProduto] = useState({ id: "", nome: "", tipo: "", preco: "", estoque: "", estoqueMin: "" })
  const [loading, setLoad] = useState(false)

  async function salvar() {
    const { nome, preco, estoque, estoqueMin, tipo } = produto
    if (nome != "" && preco != "" && estoque != "" && estoqueMin != "" && tipo != null) {
      setLoad(true)
      console.log(produto)
      await axios.post("http://localhost:3000/api/produtos/novo", { produto }).then(() => {
        Alert.success('Cadastrado com Sucesso.')
        window.location.reload(false);
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


