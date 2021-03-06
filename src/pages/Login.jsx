import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

/**
 * Consultei o repositório do Paulo Renan Almeida para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-014-a-project-trybetunes/pull/19/commits/c72f1ed68af91cfd18726a1ce27634bc3fb6fd5d
 */
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

    if (loading) return <Loading />;
    if (logado) return (<Redirect to="/search" />);

    return (
      <div data-testid="page-login main">
        <form>
          <label htmlFor="login-name">
            <input
              type="text"
              id="login-name"
              name="nameLogin"
              value={ nameLogin }
              onChange={ this.handleChange }
              data-testid="login-name-input"
              className="input-pesquisa"
              placeholder="Name"
            />
          </label>
          <button
            type="button"
            disabled={ nameLogin.length < MIN_LENGTH }
            onClick={ this.criarUsuario }
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
