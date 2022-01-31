import { PropTypes } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/Details.module.css';

export default function RecipeDetails({ match: { params } }) {
  const { path } = useRouteMatch();
  const data = useSelector((state) => {
    if (path.includes('foods')) return state.requestReducers.foods;
    return state.requestReducers.drinks;
  });

  const item = data.filter(({ id }) => id === params.id)[0];
  console.log(item);
  return (
    <>
      <Header title="Details" />
      <section
        id="recipeDescription"
        style={ { margin: '90px 0' } }
      >
        {item && (
          <div className={ `flex flex_direction_column wrapper ${styles.box}` }>
            <img src={ item.image } alt="a" />
            <h1>{ item.title }</h1>
            <h3>{ item.category }</h3>
            <div className={ styles.ingredients }>
              <h4>Ingredients:</h4>
              { item.ingredients.map((ingredient, i) => (
                <p key={ i }>
                  {` - ${ingredient[0]} - ${ingredient[1]}`}
                </p>
              ))}
            </div>
            <div className={ styles.ingredients }>
              <h4>Instructions:</h4>
              <p>{item.intructions}</p>
            </div>
            <div className={ styles.ingredients }>
              <h4>Video: </h4>
              <iframe
                title="YouTube video player"
                id="ytplayer"
                type="text/html"
                src={ `https://www.youtube.com/embed/${item.movie}` }
                frameBorder="0"
              />
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
