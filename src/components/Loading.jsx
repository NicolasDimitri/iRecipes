import React from 'react';
import loading from '../images/loading.svg';

export default function Loading() {
  return (
    <section id="loading" style={ { textAlign: 'center' } }>
      <img id="loading_image" src={ loading } alt="carregando" width="70px" />
    </section>
  );
}
