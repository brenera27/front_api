import React, { useState } from 'react'
import axios from 'axios'
import "./styles.css"
import { history } from '../../history'
import { Alert, Button, Form, ControlLabel, FormGroup, Schema, FormControl, Loader, FlexboxGrid } from 'rsuite'

export default function App() {
    const { StringType } = Schema.Types
    const model = Schema.Model({
        email: StringType().isEmail('Email inválido').isRequired('Email obrigatório'),
        senha: StringType().isRequired('Senha Obrigatória.')
    });

    const [usuario, setUsuario] = useState({ email: "", senha: "" })
    const [palavraChave, setPalavra] = useState(null)
    const [loading, setLoad] = useState(false)
    const [senhaErrada, setSenhaErrada] = useState(false)

    async function verificaLogin() {
        setLoad(true)
        await axios.post("https://apitestenode.herokuapp.com/api/usuarios/login", { "email": usuario.email, "senha": usuario.senha }).then(resultado => {
            const { data } = resultado
            if (data.mensagem) {
                Alert.error("" + data.mensagem)
                if (data.mensagem == "Senha inválida") {
                    localStorage.setItem('email', usuario.email)
                    setSenhaErrada(true)
                }
            } else {
                localStorage.setItem('app-token', data.token)
                localStorage.setItem('id', data.id)
                history.push('/app/home')
            }
        });
        setLoad(false)
    }

    return (
        <FlexboxGrid justify="center">   
            <div className="corpoLogin">            
                <div className="conteudo-login">                 
                    <center>
                        <h2>Login</h2>
                    </center>
                    <hr className="my-4"></hr>
                    <br />
                    <Form onChange={setUsuario} model={model} onSubmit={verificaLogin}>                   
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl name="email" value={usuario.email} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Senha</ControlLabel>
                            <FormControl name="senha" type="password" value={usuario.senha} />
                        </FormGroup>
                        {senhaErrada == true ? <a id="esqueci-senha" href="/verificaPalavraChave">Esqueci minha senha</a> : null}  
                        <br />
                        <br />
                        <center>
                            <Button appearance="primary" type="submit">Enviar</Button>
                        </center>
                    </Form>
                    {loading == true ? <Loader size="sm" content="Carregando..."  backdrop vertical /> : null}  
                    <br />                      
                    <br />
                    <span className="possuiConta">Não possui uma conta? <a href="/cadastro">Cadastrar</a></span>
                </div>
            </div>
       </FlexboxGrid>
    )

}

