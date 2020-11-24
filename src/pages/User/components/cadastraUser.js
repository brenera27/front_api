import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from "moment";
import { history } from '../../../history';
import { Alert, FormGroup, ControlLabel, FormControl, Button, FlexboxGrid, Form, DatePicker, Schema, Loader, ButtonToolbar } from 'rsuite';


export default function App(props) {

    const { pessoa, loading } = props

    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
        nome: StringType().isRequired('Campo Obrigatório.'),
        email: StringType().isEmail('E-mail inválido').isRequired('Campo Obrigatório.'),
        senha: StringType().isRequired('Campo Obrigatório.'),
        palavraChave: StringType().isRequired('Campo Obrigatório.'),
        cep: StringType().isRequired('Campo Obrigatório.'),
        estado: StringType().isRequired('Campo Obrigatório.'),
        cidade: StringType().isRequired('Campo Obrigatório.'),
        bairro: StringType().isRequired('Campo Obrigatório.'),
        rua: StringType().isRequired('Campo Obrigatório.'),
        numero: NumberType().isRequired('Campo Obrigatório.'),
        complemento: StringType().isRequired('Campo Obrigatório.'),

    });

    async function cadastraEndereco() {
        props.setLoad(true)
        await axios.get(`https://viacep.com.br/ws/${pessoa.cep}/json/`).then((resultado) => {
            const { logradouro, bairro, localidade, uf } = resultado.data
            pessoa.rua = logradouro
            pessoa.bairro = bairro
            pessoa.cidade = localidade
            pessoa.estado = uf
        }).catch(error=>{
            Alert.error(""+error)
        })
        props.setLoad(false)
    }
    function setData(value) {
        let aux = Moment(value);
        let dia = aux.date();
        let mes = aux.month();
        mes++;
        const ano = aux.year();
        const data = `${dia}/${mes}/${ano}`
        console.log(data)
        pessoa.dataNascimento = data
        console.log(pessoa)
    }

    return (
        <div className="corpoCadastro">
            <div className="conteudo-Cadastro">
                <center><h1>Cadastro</h1></center>
                <hr className="my-4"></hr>
                <Form model={model} onSubmit={() => props.cadastraUser()}>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={8}>
                            <FormGroup>
                                <ControlLabel>Nome</ControlLabel>
                                <FormControl name="nome" value={pessoa.nome} onChange={value => props.setPessoa({ ...pessoa, nome: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl name="email" value={pessoa.email} onChange={value => props.setPessoa({ ...pessoa, email: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Senha</ControlLabel>
                                <FormControl name="senha" type="password" value={pessoa.senha} onChange={value => props.setPessoa({ ...pessoa, senha: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Data de Nascimento</ControlLabel>
                                <DatePicker oneTap name="dataNascimento" onChange={value => setData(value)} style={{ width: 280 }} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Palavra de Segurança</ControlLabel>
                                <FormControl name="palavraChave" value={pessoa.palavraChave} onChange={value => props.setPessoa({ ...pessoa, palavraChave: value })} />
                            </FormGroup>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item colspan={8}>
                            <FormGroup>
                                <ControlLabel>CEP</ControlLabel>
                                <FormControl name="cep" value={pessoa.cep} onBlur={cadastraEndereco} onChange={value => props.setPessoa({ ...pessoa, cep: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Cidade</ControlLabel>
                                <FormControl name="cidade" value={pessoa.cidade} onChange={value => props.setPessoa({ ...pessoa, cidade: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Estado</ControlLabel>
                                <FormControl name="estado" value={pessoa.estado} onChange={value => props.setPessoa({ ...pessoa, estado: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Bairro</ControlLabel>
                                <FormControl name="bairro" value={pessoa.bairro} onChange={value => props.setPessoa({ ...pessoa, bairro: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Rua</ControlLabel>
                                <FormControl name="rua" value={pessoa.rua} onChange={value => props.setPessoa({ ...pessoa, rua: value })} />
                            </FormGroup>
                        </FlexboxGrid.Item>

                        <FlexboxGrid.Item colspan={8}>
                            <FormGroup>
                                <ControlLabel>Número</ControlLabel>
                                <FormControl name="numero" value={pessoa.numero} onChange={value => props.setPessoa({ ...pessoa, numero: value })} />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Complemento</ControlLabel>
                                <FormControl name="complemento" value={pessoa.complemento} onChange={value => props.setPessoa({ ...pessoa, complemento: value })} />
                            </FormGroup>
                        </FlexboxGrid.Item>

                    </FlexboxGrid>
                    <br />
                    <center>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="primary" type="submit">Salvar</Button>
                                <Button onClick={() => { history.replace("/app/usuario") }} appearance="subtle">Cancelar</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </center>
                </Form>
                {loading == true ? <Loader backdrop content="Carregando..." vertical /> : null}
            </div>
        </div>
    )
}