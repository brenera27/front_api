import React, { Component } from 'react';
import "./styles.css";
import Moment, { months } from "moment";
import { Icon, Button } from 'rsuite';
function DadosUser() {

    const user = JSON.parse(localStorage.getItem('user'));
    var aux = Moment(user.dataNascimento);
    var dia = aux.date();
    dia++;
    var mes = aux.month();
    mes++;
    const ano = aux.year();
    const dataNascimentoReal = `${dia}/${mes}/${ano}`;
    if (localStorage.getItem('updateProd') == "true") {
        localStorage.setItem('updateProd', "false");
        localStorage.setItem('produto', null);
    }
    function editar() {
        localStorage.setItem('update', "true");
    }
    const { nome, email, senha, rua, palavraChave, bairro, cidade, estado, cep, complemento, numero } = user;
    return (
        <center>
            <div className="corpoDadosUser">
                <div className="conteudo-user">
                    <center>
                        <h1 className="display-4">Dados do usuário</h1>
                    </center>
                    <hr className="my-4"></hr>
                    <div className="row">
                        <div className="col-md-4">
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
                                <dd>{dataNascimentoReal}</dd>
                            </dl>
                        </div>
                        <div className="col-md-4">
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
                        </div>
                        <div className="col-md-4">
                            <dl>
                                <dt>Número</dt>
                                <dd>{numero}</dd>
                                <dt>Complemento</dt>
                                <dd>{complemento}</dd>
                            </dl>
                        </div>
                    </div>
                    <br />
                    <center>
                        <Button appearance="primary" onClick={editar()} href="/cadastro">
                            <Icon icon="edit" /> Editar
    </Button>

                    </center>
                </div>
            </div>
        </center>
    );

}

export default DadosUser




