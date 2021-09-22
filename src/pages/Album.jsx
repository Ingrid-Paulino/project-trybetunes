import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusicsAPI from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      musicas: [],
      favorite: [],
      loadingFav: true,
    };
  }

  componentDidMount() {
    const { loading, loadingFav } = this.state;
    if (loading) this.getMusicasDoAlbum();
    if (loadingFav) this.getFavoriteSongs();
  }

  /**
 * Consultei o repositório do Paulo Renan Almeida para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-014-a-project-trybetunes/pull/19/commits/c72f1ed68af91cfd18726a1ce27634bc3fb6fd5d
 */

  addOrRemove = async (event) => {
    const { target: { checked } } = event;
    if (checked === true) {
      // console.log(favorite)
      await this.addMusic(event);
    } else {
      // console.log(favorite);
      await this.removeMusic(event);
    }
    this.getFavoriteSongs();
  }

  addMusic = async ({ target: { value } }) => {
    const { musicas } = this.state;
    const musicSelected = musicas
      .find((musica) => musica.trackId === parseInt(value, 10));
    this.setState({ loadingFav: true });
    await addSong(musicSelected);
  }

  removeMusic = async ({ target: { value } }) => {
    const { musicas } = this.state;
    const musicSelected = musicas
      .find((musica) => musica.trackId === parseInt(value, 10));
    this.setState({ loadingFav: true });
    await removeSong(musicSelected);
  }

  getFavoriteSongs = async () => {
    const favorite = await getFavoriteSongs();
    this.setState({ favorite, loadingFav: false });
  }

  getMusicasDoAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusicsAPI(id);
    this.setState({ musicas, loading: false });
    // console.log(musicas);
  }

  musicCard = () => {
    const { musicas, favorite } = this.state;
    return (
      <main>
        <img src={ musicas[0].artworkUrl100 } alt="Imagem album" />
        <h2 data-testid="artist-name">{musicas[0].artistName}</h2>
        <h3 data-testid="album-name">{musicas[0].collectionName}</h3>
        <section>
          {musicas.slice(1).map((musica) => (
            <MusicCard
              key={ musica.trackId }
              musica={ musica }
              value={ musica.trackId }
              checked={ favorite.some((song) => song.trackId === musica.trackId) }
              onChange={ this.addOrRemove }
            />)) }
        </section>
      </main>
    );
  }

  render() {
    const { loading, loadingFav } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading || loadingFav ? <Loading /> : this.musicCard()}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
