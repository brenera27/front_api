import React, { useState } from 'react';
import { Form,ControlLabel, FormControl} from 'rsuite';
export default function App() {

    const [form, setForm] = useState({nome:null,idade:null})
    return (
        <>  
                { <span>nome: {form.nome}</span> }
                <br />
                {<span>idade: {form.idade}</span>}
                <Form
                onChange={setForm}
              >

                  <ControlLabel>Nome:</ControlLabel>
                  <FormControl name="nome" />
                  <ControlLabel>Idade: </ControlLabel>
                  <FormControl name="idade" type="number"/>

              </Form>      
        </>
    );
}