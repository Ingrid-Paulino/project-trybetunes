import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/heart-favorite.css';

class MusicCard extends Component {
  musics = () => {
    // forma 1
    // const { musica } = this.props;
    // const { trackName, previewUrl } = musica;

    // forma 2
    // quebrei as props
    const {
      musica: { trackName, previewUrl, trackId },
      value,
      onChange,
      checked } = this.props;

    return (
      <section>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ trackId }
          className="fav-heart"
        >
          <input
            type="checkbox"
            name="favorite"
            checked={ checked }
            onChange={ onChange }
            value={ value }
            data-testid={ `checkbox-music-${trackId}` }
          />
          <span className="tw-heart" />
        </label>
      </section>
    );
  }

  render() {
    return (this.musics());
  }
}

MusicCard.propTypes = {
  musica: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default MusicCard;
