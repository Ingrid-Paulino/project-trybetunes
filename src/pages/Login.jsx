import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      loading: false,
      logado: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.criarUsuario = this.criarUsuario.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async criarUsuario() {
    const { nameLogin } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameLogin });
    this.setState({ loading: false, logado: true });
  }

  render() {
    const { nameLogin, loading, logado } = this.state;
    const MIN_LENGTH = 3;
    if (loading) return (<p>Carregando...</p>);
    if (logado) return (<Redirect to="/search" />);
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name">
            Nome:
            <input
              type="text"
              id="login-name"
              name="nameLogin"
              value={ nameLogin }
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            disabled={ nameLogin.length < MIN_LENGTH }
            onClick={ () => this.criarUsuario() }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
