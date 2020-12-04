import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from "moment";
import { history } from '../../../history';
import "./styles.css";
import { Alert, FormGroup, ControlLabel, Button, FlexboxGrid, Form, DatePicker, Schema, Loader, ButtonToolbar, Row, Col, Input } from 'rsuite';


export default function App(props) {

    const { pessoa, loading } = props

    const { StringType, NumberType } = Schema.Types;
    const model = Schema.Model({
        nome: StringType().isRequired('Campo Obrigatório.'),
        email: StringType().isEmail('E-mail inválido').isRequired('Campo Obrigatório.'),
        senha: StringType().isRequired('Campo Obrigatório.'),
        palavraChave: StringType().isRequired('Campo Obrigatório.'),
        cep: StringType(),
        estado: StringType(),
        cidade: StringType(),
        bairro: StringType(),
        rua: StringType(),
        numero: NumberType(),
        complemento: StringType()

    });

    async function cadastraEndereco() {
        props.setLoad(true)
        await axios.get(`https://viacep.com.br/ws/${pessoa.cep}/json/`).then((resultado) => {
            const { logradouro, bairro, localidade, uf } = resultado.data
            pessoa.rua = logradouro
            pessoa.bairro = bairro
            pessoa.cidade = localidade
            pessoa.estado = uf
        }).catch(error => {
            Alert.error("" + error)
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
                            <FlexboxGrid.Item colspan={24}>
                                <Row className="show-grid">
                                    <Col xs={12}>
                                        <FormGroup>
                                            <ControlLabel>Nome</ControlLabel>
                                            <Input name="nome" value={pessoa.nome} onChange={value => props.setPessoa({ ...pessoa, nome: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12}>
                                        <FormGroup>
                                            <ControlLabel>Email</ControlLabel>
                                            <Input name="email" value={pessoa.email} onChange={value => props.setPessoa({ ...pessoa, email: value })} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="show-grid">   
                                    <Col xs={8}>
                                        <FormGroup>
                                            <ControlLabel>Senha</ControlLabel>
                                            <Input name="senha" type="password" value={pessoa.senha} onChange={value => props.setPessoa({ ...pessoa, senha: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={8}>
                                        <FormGroup>
                                            <ControlLabel>Palavra de Segurança</ControlLabel>
                                            <Input name="palavraChave" value={pessoa.palavraChave} onChange={value => props.setPessoa({ ...pessoa, palavraChave: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={8}>
                                        <FormGroup>
                                            <ControlLabel>Data de Nascimento</ControlLabel>
                                            <DatePicker oneTap name="dataNascimento" onChange={value => setData(value)} style={{ width: 320 }} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="show-grid">
                                    <Col xs={4}>
                                        <FormGroup>
                                            <ControlLabel>CEP</ControlLabel>
                                            <Input name="cep" value={pessoa.cep} onBlur={cadastraEndereco} onChange={value => props.setPessoa({ ...pessoa, cep: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup>
                                            <ControlLabel>Cidade</ControlLabel>
                                            <Input name="cidade" value={pessoa.cidade} onChange={value => props.setPessoa({ ...pessoa, cidade: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup>
                                            <ControlLabel>Estado</ControlLabel>
                                            <Input name="estado" value={pessoa.estado} onChange={value => props.setPessoa({ ...pessoa, estado: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={8}>
                                        <FormGroup>
                                            <ControlLabel>Bairro</ControlLabel>
                                            <Input name="bairro" value={pessoa.bairro} onChange={value => props.setPessoa({ ...pessoa, bairro: value })} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <br />
                                <Row className="show-grid">
                                    <Col xs={10}>
                                        <FormGroup>
                                            <ControlLabel>Rua</ControlLabel>
                                            <Input name="rua" value={pessoa.rua} onChange={value => props.setPessoa({ ...pessoa, rua: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={4}>
                                        <FormGroup>
                                            <ControlLabel>Número</ControlLabel>
                                            <Input name="numero" value={pessoa.numero} onChange={value => props.setPessoa({ ...pessoa, numero: value })} />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={10}>
                                        <FormGroup>
                                            <ControlLabel>Complemento</ControlLabel>
                                            <Input name="complemento" value={pessoa.complemento} onChange={value => props.setPessoa({ ...pessoa, complemento: value })} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <br /><br />
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