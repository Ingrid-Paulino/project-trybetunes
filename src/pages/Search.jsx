import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

import '../App.css';

/**
 * Consultei o repositório do Paulo Renan Almeida para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-014-a-project-trybetunes/pull/19/commits/c72f1ed68af91cfd18726a1ce27634bc3fb6fd5d
 */

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nome: '', // nome é do artista ou da banda
      loading: false,
      artist: '',
      album: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.btnRequisicaoAlbun = this.btnRequisicaoAlbun.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    // console.log(value);
  }

  screenArtist = () => {
    const MIN_LENGTH = 2;
    const { nome } = this.state;
    return (
      <form className="main input-button">
        <label htmlFor="artista-input">
          <input
            type="text"
            name="nome"
            id="artista-input"
            value={ nome }
            onChange={ this.handleChange }
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            className="input-pesquisa"
          />
        </label>
        <button
          type="button"
          onClick={ this.btnRequisicaoAlbun }
          disabled={ nome.length < MIN_LENGTH }
          data-testid="search-artist-button"
        >
          Procurar
        </button>
      </form>
    );
  };

  resultsListAlbum = () => {
    const { artist, album } = this.state;
    if (artist === '') return null;
    const numeroAlbum = `${album.length} álbuns encontrados`;
    const results = `Resultado de álbuns de: ${artist}`;
    return (
      <div className="container-album">
        <div className="result-album-container">
          <p className="result-album">{results}</p>
          {album.length ? <p className="result-album">{numeroAlbum}</p>
            : <p>Nenhum álbum foi encontrado</p>}
        </div>

        <div className="albuns">
          {album.map(
            ({ artistName, collectionId, collectionName, artworkUrl100 }, index) => (
              <div className="album-container" key={ index }>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `album/${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt="AlbumIMG" />
                </Link>
                <p>{collectionName}</p>
                <p>{artistName}</p>
              </div>
            ),
          )}
        </div>
      </div>
    );
  };

  // limpa e faz a requisição
  async btnRequisicaoAlbun() {
    const { nome } = this.state;
    // console.log(nome, 'oi');
    this.setState({ nome: '', loading: true, artist: nome });
    const album = await searchAlbumsAPI(nome);
    // console.log(artist);

    this.setState({ album, loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : this.screenArtist()}
        {this.resultsListAlbum()}
      </div>
    );
  }
}

export default Search;
