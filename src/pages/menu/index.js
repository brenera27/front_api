import React, { Component } from 'react';
import { Icon, Navbar, Dropdown, Nav, Modal, Button, ButtonToolbar } from 'rsuite';
import { history } from '../../history';

import "./style.css";
class Menu extends React.Component {

  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: '1',
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  sair() {
    localStorage.clear();
    history.push('/login');
  }
  render() {
    return (
      <>
        <Navbar appearance='default' id="menu">
          <Navbar.Body>
            <Nav>
              <Nav.Item href="/app/home" icon={<Icon icon="home" />} >Home</Nav.Item>
              <Nav.Item href="/app/cadastra" id="botao-menu" icon={<Icon icon="plus-circle" />}>Cadastrar</Nav.Item>
              <Nav.Item href="/app/pedidos" id="botao-menu" icon={<Icon icon="shopping-cart" />}>Pedidos</Nav.Item>
            </Nav>
            <Nav pullRight>
              <Dropdown title="Menu" icon={<Icon icon="gear-circle" />}>
                <Dropdown.Item href="/app/usuario" icon={<Icon icon="user" />}>Perfil</Dropdown.Item>
                  <Dropdown.Item id="sair" onClick={this.open} icon={<Icon icon="sign-out" />}>Sair</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar.Body>
        </Navbar>
        <div className="modal-container">
          <Modal backdrop="static" show={this.state.show} onHide={this.close} size={'xs'}>
            <Modal.Header>
              <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span>Tem certeza que deseja sair?</span>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => { this.sair() }} appearance="primary">
                Sim
            </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancelar
            </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }

}
export default Menu;