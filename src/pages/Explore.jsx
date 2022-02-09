import { PropTypes } from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Explore({ history }) {
  /**
   * @function redirect(path) - função para redirecionar para uma nova pagina;
   * @param {string} path - uma string com o endereço da pagina;
   * @return { void } ` void ` — função sem retorno;
   */
  function redirect(path) { history.push(path); }

  return (
    <>
      <Header title="Explore" renderExplore={ false } />
      <section
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          marginTop: '90px',
        } }
        className="wrapper"
        id="buttons-explor"
      >
        <button
          type="button"
          style={ {
            marginBottom: '30px',
          } }
          data-testid="explore-foods"
          onClick={ () => redirect('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => redirect('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
