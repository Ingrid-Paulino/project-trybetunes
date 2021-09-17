import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistaName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const MIN_LENGTH = 2;
    const { artistaName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artista-input">
            <input
              type="text"
              name="artistaName"
              id="artista-input"
              value={ artistaName }
              onChange={ this.handleChange }
              placeholder="Nome do Artista"
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            disabled={ artistaName.length < MIN_LENGTH }
            data-testid="search-artist-button"
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
