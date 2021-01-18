import React, { useState } from 'react'
import API from '../../api'
import "./styles.css"

import { Alert, Form, FormControl, Button, FlexboxGrid } from 'rsuite'
export default function App(props) {

    const [email, setEmail] = useState("")
    const [loading, setLoad] = useState(false)

    async function mudaPalavra(value) {
        setPalavra(value)
    }

    async function buscaEmail() {
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
            <div className="buscaEmail">
                    <FlexboxGrid justify="center">
                        <h4>Digite Seu email</h4>
                        <br/>
                        <Form>
                            <FormControl name="palavraChave" value={palavraChave} onChange={mudaPalavra}/>
                            <br />
                            <center>
                                <Button appearance="primary" type="submit">Enviar</Button>
                            </center>
                        </Form>
                    </FlexboxGrid>
            </div>
    );
}

