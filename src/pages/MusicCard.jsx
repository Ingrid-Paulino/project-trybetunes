import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    // forma 1
    // const { musica } = this.props;
    // const { trackName, previewUrl } = musica;

    // forma 2
    const { musica: { trackName, previewUrl } } = this.props;
    return (
      <section>
        <p>{ trackName }</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </section>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default MusicCard;
