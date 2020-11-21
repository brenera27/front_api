import React, { useState } from 'react'
import axios from 'axios'
import "./styles.css"
import { history } from '../../history'
import { Alert, Schema, Form, FormControl, Button, FlexboxGrid } from 'rsuite'
export default function App(props) {

    const { StringType } = Schema.Types
    const model = Schema.Model({
        palavraChave: StringType().isRequired('Campo obrigatório')
    });

    const email = props.email
    const [palavraChave, setPalavra] = useState("")
    const [loading, setLoad] = useState(false)

    async function mudaPalavra(value) {
        setPalavra(value)
    }

    async function verificaPalavra() {
        setLoad(true)
        await axios.post("https://apitestenode.herokuapp.com/api/usuarios/palavraChave", { "email": email, "palavraChave": palavraChave }).then(resultado => {
        console.log(resultado)    
        const { data } = resultado;
            if (data.mensagem) {
                Alert.error("" + data.mensagem)
            } else {
                localStorage.setItem('app-token', data.token);
                localStorage.setItem('id', data.id);
                history.push('/trocaSenha');
            }
        });
        setLoad(false)
    }


    return (
        <center>
            <div className="corpoPalavraC">
                <div className="conteudo-palavraC">
                    <FlexboxGrid justify="center">
                        <h4>Digite sua palavra chave</h4>
                        <br/> <br/> <br/>
                        <Form model={model} onSubmit={verificaPalavra}>
                            <FormControl name="palavraChave" value={palavraChave} onChange={mudaPalavra}/>
                            <br />
                            <center>
                                <Button appearance="primary" type="submit">Enviar</Button>
                            </center>
                        </Form>
                    </FlexboxGrid>
                </div>
            </div>
        </center>
    );
}

