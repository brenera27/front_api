import React, { useState } from 'react';
import axios from 'axios';
import { history } from '../../../history';
import { Alert } from 'rsuite';
import Formulario from '../components/cadastraUser'

export default function App() {

    const [pessoa, setPessoa] = useState({
        "nome": "", "email": "", "senha": "", "palavraChave": "", "dataNascimento": "", "cep": "", "rua": "", "bairro": "", "cidade": "",
        "estado": "", "complemento": "", "numero": ""
    })
    const [loading, setLoad] = useState(false)

    async function cadastraUser() {
        setLoad(true)
        const { nome, email, senha, palavraChave, dataNascimento } = pessoa;
        if (nome != "" && email != "" && senha != "" && palavraChave != "" && dataNascimento != "") {
            await axios.post("https://apitestenode.herokuapp.com/api/usuarios/novo", { pessoa }).then(response => {
                if (response.data) {
                    history.push('/login');
                }
            }).catch(error => {
                Alert.error("" + error)
            })
        }
        setLoad(false)
    }

    return (
        <center>
            <Formulario pessoa={pessoa} setPessoa={setPessoa} cadastraUser={cadastraUser} setLoad={setLoad} loading={loading} />
        </center>
    );

}


