import React, { useState } from 'react'
import "./styles.css"
import API from '../api'

import { Alert, Form, Input, Button, FlexboxGrid } from 'rsuite'
export default function App(props) {

    const [email, setEmail] = useState("")
    const [palavraChave, setPalavra] = useState("")
    const [loading, setLoad] = useState(false)

    async function verificaPalavra() {
        setLoad(true)
        await API.post("usuarios/palavraChave", { "email": email, "palavraChave": palavraChave }).then(resultado => {
            console.log(resultado)
            const { data } = resultado;
            if (data.mensagem) {
                Alert.error("" + data.mensagem)
            } else {
                localStorage.setItem('app-token', data.token);
                localStorage.setItem('id', data.id);

            }
        });
        setLoad(false)
    }


    return (
        <FlexboxGrid justify="center">
            <div className="corpoPalavraC">
                <div className="conteudo-palavraC">
                    <Form onSubmit={verificaPalavra}>
                        <label>Digite seu email</label>
                        <Input value={email} onChange={setEmail} />
                        <br />
                        <label>Digite sua palavra chave</label>
                        <Input value={palavraChave} onChange={setPalavra} />
                        
                       

                        <center>
                            <Button appearance="primary" type="submit">Enviar</Button>
                        </center>
                    </Form>

                </div>
            </div>
        </FlexboxGrid>
    );
}

