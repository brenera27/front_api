import React, { Component } from 'react';

import { history } from '../../history';

import "./style.css";
class Menu extends React.Component {

  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: '1'
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleToggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  sair() {

    localStorage.clear();
    history.push('/login');


  }
  render() {
    return (
      <div className="menu">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/app/home">Início</a>
          <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/app/usuario">Perfil</a>
              </li>
            </ul>
            <button className="btn btn-danger btn-sm " onClick={() => {
              this.sair()
            }}>Sair</button>

          </div>
        </nav>
      </div>
    );
  }

}
export default Menu;