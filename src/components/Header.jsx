import React, { Component } from 'react';
import Loading from '../pages/Loading';
// import { Link } from 'react-router-dom';
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
        {/* <nav>
          <Link to="/search" data-testid="link-to-search">Procurar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="profile" data-testid="link-to-profile">Perfil</Link>
        </nav> */}
      </header>
    );
  }
}
export default Header;
