import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import trybetunesLogo from '../img/logo.png';

import '../App.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: {},
    };

    this.obterUsuario = this.obterUsuario.bind(this);
  }

  componentDidMount() {
    this.obterUsuario();
  }

  async obterUsuario() {
    const usuario = await getUser();
    this.setState({ usuario, loading: false });
  }

  render() {
    const { usuario: { name }, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header
        data-testid="header-component"
        className="header"
      >
        <div
          className="header-part-1"
        >
          <Link to="/search">
            <img
              src={ trybetunesLogo }
              alt="trybrtunes logo"
              className="header-logo"
            />
          </Link>
          <Link
            className="header-user"
            to="/profile"
          >
            <p
              data-testid="header-user-name"
            >
              { name }
            </p>
          </Link>
        </div>

        <nav className="nav-container">
          <Link
            data-testid="link-to-search"
            className="link"
            to="/search"
          >
            Pesquisar
          </Link>
          <Link
            data-testid="link-to-favorites"
            className="link"
            to="/favorites"
          >
            Favoritos
          </Link>
          <Link data-testid="link-to-profile" className="link" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
export default Header;
