import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks({ history }) {
  /**
   * @function redirect(path) - função para redirecionar para uma nova pagina;
   * @param {string} path - uma string com o endereço da pagina;
   * @return { void } ` void ` — função sem retorno;
   */
  function redirect(path) { history.push(path); }

  return (
    <>
      <Header title="Explore Drinks" renderExplore={ false } />
      <section
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        } }
        id="nav-explore"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => redirect('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => redirect('/drinks/178319') }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
