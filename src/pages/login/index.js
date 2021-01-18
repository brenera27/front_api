import React, { useState, useEffect } from 'react'
import "./styles.css"
import { history } from '../../history'
import { Alert, Button, Form, ControlLabel, FormGroup, Schema, Input, Loader, FlexboxGrid } from 'rsuite'
import API from '../api'
export default function App() {

    const { StringType } = Schema.Types
    const model = Schema.Model({
        email: StringType().isEmail('Email inválido').isRequired('Campo obrigatório'),
        senha: StringType().isRequired('Campo Obrigatória.')
    });

    const [usuario, setUsuario] = useState({ email: "", senha: "" })
    const [palavraChave, setPalavra] = useState(null)
    const [senhaErrada, setSenhaErrada] = useState(false)
    const [loading, setLoad] = useState(false)

    async function verificaLogin() {
        setLoad(true)
        await API.post("usuarios/login", { "email": usuario.email, "senha": usuario.senha }).then(resultado => {
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
                    <Form model={model} onSubmit={verificaLogin}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <Input name="email" onChange={value => setUsuario({ ...usuario, email: value })} value={usuario.email} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Senha</ControlLabel>
                            <Input name="senha" type="password" onChange={value => setUsuario({ ...usuario, senha: value })} value={usuario.senha} />
                        </FormGroup>
                        {senhaErrada == true ? <a id="esqueci-senha" href="/verificaPalavraChave">Esqueci minha senha</a> : null}
                        <br />
                        <br />
                        <center>
                            <Button appearance="primary" type="submit">Enviar</Button>
                        </center>
                    </Form>
                    {loading == true ? <Loader size="sm" content="Carregando..." backdrop vertical /> : null}
                    <br />
                    <br />
                    <span className="possuiConta">Não possui uma conta? <a href="/cadastro">Cadastrar</a></span>
                </div>
            </div>
        </FlexboxGrid>
    )

}

