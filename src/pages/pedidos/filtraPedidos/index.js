import React from 'react'
import "./styles.css"
import { CheckPicker, Checkbox, InputGroup, Input, Grid, Row, Col, Button } from 'rsuite';

function filtragem(props) {
    const styles = {
        width: 200,
        marginBottom: 10
    };
    return (
        <center>
            <div id="filtro-pedidos">
                <div id="corpo-filtro-pedidos">
                    <center>
                        <h3>Filtro de Pedidos</h3>
                    </center>
                    <hr className="my-4"></hr>
                    <br />
                    <Grid fluid>
                        <Row className="show-grid">
                            <Col xs={12}>
                                <Checkbox defaultChecked onClick={props.estoqueBaixo}>Apenas estoque baixo</Checkbox>
                                <br />
                                <label>Departamentos:</label>
                                <br />
                                <CheckPicker defaultValue={['estoque-baixo']} data={props.opcoes} value={props.escolha} onChange={props.seleciona} style={{ width: 224 }} />

                            </Col>

                            <Col xs={12}>
                                <label>Preço:</label>
                                <InputGroup style={styles}>
                                    <Input value={props.precoMin} onChange={props.setPrecoMin} />
                                    <InputGroup.Addon>Até</InputGroup.Addon>
                                    <Input value={props.precoMax} onChange={props.setPrecoMax} />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Grid>
                    <br />
                    <center>
                        <Button appearance="primary" onClick={() => { props.trocaConteudo() }}>Filtrar</Button>
                    </center>
                </div>
            </div>
        </center>
    )
}
export default filtragem
