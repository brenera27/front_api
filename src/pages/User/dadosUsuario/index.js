import React, { useState, useEffect } from 'react';
import "./styles.css";
import { Loader, Icon, FlexboxGrid, IconButton } from 'rsuite';
import API from '../../api'
import { history } from '../../../history'
export default function DadosUser() {

    const [user, setUser] = useState({ nome: "", email: "", senha: "", rua: "", palavraChave: "", bairro: "", cidade: "", estado: "", cep: "", complemento: "", numero: "" })
    const [loading, setLoad] = useState(false)
    const id = JSON.parse(localStorage.getItem("id"))

    useEffect(() => {
        buscaUser()
    }, [])

    async function buscaUser() {
        setLoad(true)
        await API.get(`usuarios/busca?id=${id}`).then((resposta) => {
            setUser(resposta.data.usuario)
        })
        setLoad(false)
    }

    const { nome, email, senha, rua, palavraChave, bairro, cidade, estado, cep, complemento, numero, dataNascimento } = user;

    return (
        <FlexboxGrid justify="center">
            {user == null ? null :
                <div className="corpoDadosUser">
                    <div className="conteudo-user">
                        <center>
                            <h1>Dados do usuário</h1>
                        </center>
                        <hr className="my-4"></hr>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={8}>
                                <dl>
                                    <dt>Nome</dt>
                                    <dd>{nome}</dd>
                                    <dt>Email</dt>
                                    <dd>{email}</dd>
                                    <dt>Senha</dt>
                                    <dd>{senha}</dd>
                                    <dt>palavra Chave</dt>
                                    <dd>{palavraChave}</dd>
                                    <dt>Data de Nascimento</dt>
                                    <dd>{dataNascimento}</dd>
                                </dl>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={8}>
                                <dl>
                                    <dt>CEP</dt>
                                    <dd>{cep}</dd>
                                    <dt>Estado</dt>
                                    <dd>{estado}</dd>
                                    <dt>Cidade</dt>
                                    <dd>{cidade}</dd>
                                    <dt>Bairro</dt>
                                    <dd>{bairro}</dd>
                                    <dt>Rua</dt>
                                    <dd>{rua}</dd>
                                </dl>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={8}>
                                <dl>
                                    <dt>Número</dt>
                                    <dd>{numero}</dd>
                                    <dt>Complemento</dt>
                                    <dd>{complemento}</dd>
                                </dl>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>

                        <br />
                        <center>
                            <IconButton appearance="primary" onClick={()=>{history.replace('/app/atualizaUser')}} icon={<Icon icon="edit" />}> Editar </IconButton>
                        </center>
                    </div>
                </div>
            }{loading == true ? <Loader backdrop content="Carregando..." center vertical /> : null}
        </FlexboxGrid>
    );

}





