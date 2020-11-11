import React from 'react'
import "./styles.css"

function alerta(props) {
    console.log("teste")
    return (
        <div class="alert alert-warning alert-dismissible fade show" id="alerta-caixa" role="alert">
            {props.mensagem}
            <button type="button" class="close" aria-label="Close" onClick={() => { props.fecharAlerta() }}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}
export default alerta
