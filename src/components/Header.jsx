import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
      >
        <p data-testid="header-user-name">{ name }</p>

        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}
export default Header;
