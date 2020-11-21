import React, { useState, useEffect } from 'react'
import "./styles.css"
import { Alert } from 'rsuite'
import 'rsuite/lib/styles/index.less'
import Filtro from './filtragem'
import Listagem from './listagemPedidos'
import Finalizacao from './finalizacao'

export default function App() {
    const [produtos, setProdutos] = useState([])
    const [filtros, setFiltros] = useState([])
    const [componente, setComponente] = useState()

    useEffect(() => {
        setComponente(<Filtro seleciona={seleciona} valores={filtros} filtrar={filtrar} estoqueBaixo={estoqueBaixo} />)
    }, [])


    async function seleciona(value) {
        filtros.splice(0,filtros.length)
        value.map((filtro)=>{
            filtros.push(filtro)
        })
        console.log(filtros)
    }

    async function estoqueBaixo() {
        let contem = false
        for (let i = 0; i < filtros.length; i++) {
            if (filtros[i] == "estoque-baixo") {
                contem = true
                await filtros.splice(i, 1)
            }
        }
        if (contem == false) {
            await filtros.push("estoque-baixo")
        }
        await setFiltros(filtros)
        console.log(filtros)
    }

    function finalizar(produtos) {
        setComponente(<Finalizacao data={produtos} />)
    }

    function filtrar() {
        console.log(filtros)
        if (filtros.length == 0 || (filtros.length == 1 && filtros[0] == "estoque-baixo")) {
            Alert.warning('Selecione pelo menos um Departamento.')
        } else {
            setComponente(<Listagem finalizar={finalizar} filtros={filtros} />)
        }

    }

   
    return (
        <>
            {componente}
        </>
    )

}


