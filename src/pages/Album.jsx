import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusicsAPI from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      musicas: [],
    };
  }

  componentDidMount() {
    const { loading } = this.state;
    if (loading) this.musicasDoAlbum();
  }

  musicCard = () => {
    const { musicas } = this.state;
    return (
      <main>
        <h2 data-testid="artist-name">{musicas[0].artistName}</h2>
        <h3 data-testid="album-name">{musicas[0].collectionName}</h3>
        {musicas.slice(1).map((musica) => (
          <MusicCard key={ musica.trackName } musica={ musica } />)) }
      </main>
    );
  }

  /**
 * Consultei o repositório do Paulo Renan Almeida para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-014-a-project-trybetunes/pull/19/commits/c72f1ed68af91cfd18726a1ce27634bc3fb6fd5d
 */

  musicasDoAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusicsAPI(id);
    this.setState({ musicas, loading: false });
    // console.log(musicas);
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : this.musicCard()}
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
