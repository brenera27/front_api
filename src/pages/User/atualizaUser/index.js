import React, { useState, useEffect } from 'react'
import API from '../../api'
import { history } from '../../../history'
import { Alert } from 'rsuite'
import Formulario from '../components/cadastraUser'

export default function App() {

    const [pessoa, setPessoa] = useState({
        "nome": "", "email": "", "senha": "", "palavraChave": "", "dataNascimento": "", "cep": "", "rua": "", "bairro": "", "cidade": "",
        "estado": "", "complemento": "", "numero": ""
    })
    const [loading, setLoad] = useState(false)
    const id = JSON.parse(localStorage.getItem("id"))

    useEffect(() => {
        buscaUser()
    }, [])

    async function buscaUser() {
        setLoad(true)
        await API.get(`usuarios/busca?id=${id}`).then((resposta) => {
            setPessoa(resposta.data.usuario)
        })
        setLoad(false)
    }


    async function atualizaUser() {
        setLoad(true)
        const { nome, email, senha, palavraChave, dataNascimento } = pessoa
        if (nome != "" && email != "" && senha != "" && palavraChave != "" && dataNascimento != "") {
            await API.put("usuarios/update", { pessoa }).then(response => {
                if (response) {
                    history.replace('/app/usuario')
                    console.log(response)
                }
            }).catch(error => {
                Alert.error("" + error)
            })

        }
        setLoad(false)
    }

    return (
        <center>
            <Formulario pessoa={pessoa} setPessoa={setPessoa} cadastraUser={atualizaUser} setLoad={setLoad} loading={loading} />
        </center>
    )

}


