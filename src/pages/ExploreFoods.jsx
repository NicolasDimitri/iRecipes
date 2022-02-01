import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreFoods({ history }) {
  /**
   * @function redirect(path) - função para redirecionar para uma nova pagina;
   * @param {string} path - uma string com o endereço da pagina;
   * @return { void } ` void ` — função sem retorno;
   */
  function redirect(path) { history.push(path); }

  return (
    <>
      <Header title="Explore Foods" renderExplore={ false } />
      <section
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          marginTop: '90px',
        } }
        id="nav-explore"
        className="wrapper"
      >
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => redirect('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => redirect('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => redirect('/foods/52771') }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
