import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

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
      <form>
        <label htmlFor="artista-input">
          <input
            type="text"
            name="nome"
            id="artista-input"
            value={ nome }
            onChange={ this.handleChange }
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
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
    const numeroAlbum = `${album.length} álbuns encontrados.`;
    const results = `Resultado de álbuns de: ${artist}`;
    return (
      <div>
        <p>{results}</p>
        {album.length ? <p>{numeroAlbum}</p> : <p>Nenhum álbum foi encontrado</p>}
        {album.map(
          ({ artistName, collectionId, collectionName, artworkUrl100 }, index) => (
            <div key={ index }>
              <p>{collectionName}</p>
              <p>{artistName}</p>
              <img src={ artworkUrl100 } alt="AlbumIMG" />
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `album/${collectionId}` }
              >
                Ir Para o Album
              </Link>
            </div>
          ),
        )}
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
