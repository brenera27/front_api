import React from 'react'
import "./styles.css"
import { CheckPicker, Checkbox, Grid, Button } from 'rsuite';

// filtros para pré-selecionar produtos para o pedido
function filtragem(props) {
    const opcoes = [
        {
            "label": "Estoque Baixo",
            "value": "estoque-baixo",
            "role": "Tipo"
        },
        {
            "label": "Alimento",
            "value": "alimento",
            "role": "Tipo"
        },
        {
            "label": "Bebida",
            "value": "bebida",
            "role": "Tipo"
        },
        {
            "label": "Brinquedo",
            "value": "brinquedo",
            "role": "Tipo"
        },
        {
            "label": "Ferramenta",
            "value": "ferramenta",
            "role": "Tipo"
        },
        {
            "label": "Roupa",
            "value": "roupa",
            "role": "Tipo"
        }

    ]
    return (
        <center>
            <div id="filtro-pedidos">
                <div id="corpo-filtro-pedidos">
                    <center>
                        <h3>Filtro de Pedidos</h3>
                    
                    <hr className="my-4"></hr>
                    <br />
                    <Grid fluid>
                        <label>Departamentos:</label>
                        <br />
                        <CheckPicker data={opcoes} value={props.escolha} onChange={props.seleciona} style={{ width: 224 }} />
                    </Grid>
                    <br />
                    <center>
                        <Button appearance="primary" onClick={() => { props.filtrar() }}>Filtrar</Button>
                    </center>
                    </center>
                </div>
            </div>
        </center>
    )
}
export default filtragem
