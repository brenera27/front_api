import React, { useState } from 'react';
import { Icon, Navbar, Dropdown, Nav, Modal, Button } from 'rsuite';
import { history } from '../../history';

import "./style.css";



export default function App() {

  const [activeKey, setActiveKey] = useState()
  const [expanded, setExpanded] = useState(true)

  const [show, setShow] = useState(false)

  const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
    return (
      <Navbar {...props} id="menu">
        <Navbar.Body>
          <Nav onSelect={onSelect} activeKey={activeKey}>
            <Nav.Item onClick={() => history.replace('/app/home')} icon={<Icon icon="home" />} >Home</Nav.Item>
            <Nav.Item onClick={() => history.replace('/app/cadastraProd')} id="botao-menu" icon={<Icon icon="plus-circle" />}>Cadastrar</Nav.Item>
            <Nav.Item onClick={() => history.replace('/app/pedidos')} id="botao-menu" icon={<Icon icon="shopping-cart" />}>Pedidos</Nav.Item>
          </Nav>
          <Nav pullRight>
            <Dropdown title="Menu" icon={<Icon icon="gear-circle" />}>
              <Dropdown.Item onClick={() => history.replace(`/app/usuario`)} eventKey="usuario" icon={<Icon icon="user" />}>Perfil</Dropdown.Item>
              <Dropdown.Item id="sair" onClick={props.open} icon={<Icon icon="sign-out" />}>Sair</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  };


  function close() {
    setShow(false)
  }
  function open() {
    setShow(true)
  }
  function sair() {
    localStorage.clear();
    history.replace('/login');
  }

  function handleSelect(eventKey) {
    setActiveKey(eventKey)
  }
  return (
    <>
      <NavBarInstance onSelect={handleSelect} open={open} />
      <div className="modal-container">
        <Modal backdrop="static" show={show} onHide={close} size={'xs'}>
          <Modal.Header>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Tem certeza que deseja sair?</span>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { sair() }} appearance="primary">
              Sim
            </Button>
            <Button onClick={close} appearance="subtle">
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );


}
