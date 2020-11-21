import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import "./styles.css";
import Moment, { months } from "moment";
import { Loader, Icon, FlexboxGrid,IconButton } from 'rsuite';
import Axios from 'axios';

export default function DadosUser() {
    const  id  =  JSON.parse(localStorage.getItem("id"))

    useEffect(()=>{

        buscaUser()
        calcData()
    },[])
    async function buscaUser(){
        setLoad(true)
        await Axios.get(`https://apitestenode.herokuapp.com/api/usuarios/busca?id=${id}`).then((resposta)=>{
            console.log(id)
             setUser(resposta.data.usuario)
            })
            setLoad(false)
    }
    function calcData(){
        let aux = Moment(user.dataNascimento);
        let dia = aux.date();
        dia++;
        let mes = aux.month();
        mes++;
        const ano = aux.year();
        setData(`${dia}/${mes}/${ano}`)
    }
    const [user,setUser] = useState({nome:"", email:"", senha:"", rua:"", palavraChave:"", bairro:"", cidade:"", estado:"", cep:"", complemento:"", numero:""})
    const [dataNascimentoReal,setData] = useState(null)
    const [loading,setLoad] = useState(false)
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
                                <dd>{dataNascimentoReal}</dd>
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
    <IconButton appearance="primary" onClick={editar()} href="/cadastro" icon={<Icon icon="edit" />}> Editar </IconButton>

                    </center>
                </div>
            </div>
}{loading == true ? <Loader backdrop content="Carregando..." center vertical /> : null}
        </center>
    );

}





