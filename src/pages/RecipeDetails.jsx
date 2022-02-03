import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Feed from '../components/Feed';
import Loading from '../components/Loading';
import RecomendedRecipes from '../components/RecomendedRecipes';
import { requestDrinksByIdFromAPI, requestFoodsByIdFromAPI } from '../redux/actions';
import styles from '../styles/Details.module.css';

export default function RecipeDetails({ match: { params: { id } } }) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.requestReducers.recipeDetails);
  const item = data[0];

  useEffect(() => {
    if (path.includes('foods')) {
      dispatch(requestFoodsByIdFromAPI(id));
    } else {
      dispatch(requestDrinksByIdFromAPI(id));
    }
  }, [dispatch, id, path]);

  return (
    <main>
      <h1 style={ { display: 'none' } }>Recipe page</h1>
      {
        item ? (
          <section
            id="details"
            className={ `primary_color flex flex_direction_column ${styles.box}` }
          >
            <img id="hero" src={ item.image } alt={ `the ready ${item.title} recipe.` } />
            <div
              id="head"
              className={ `flex flex justify_content_between ${styles.head}` }
            >
              <h1 id="title">{ item.title }</h1>
              <Feed id="feed" styles={ styles } item={ item } />
            </div>
            <p
              id="category"
              className={ styles.category }
            >
              { item.category }
            </p>
            <section id="ingredients" className={ styles.box_gray }>
              <h4>Ingredients:</h4>
              { item.ingredients.map((ingredient, i) => (
                <p key={ i }>
                  {` - ${ingredient[0]} - ${ingredient[1]}`}
                </p>
              ))}
            </section>
            <section id="intrudctions" className={ styles.box_gray }>
              <h4>Instructions:</h4>
              <p>{item.intructions}</p>
            </section>
            <section id="video" className={ styles.box_gray }>
              <h4>Video: </h4>
              <iframe
                title="YouTube video player"
                id="ytplayer"
                type="text/html"
                src={ `https://www.youtube.com/embed/${item.movie}` }
                frameBorder="0"
              />
            </section>
            <section
              id="recommended"
              className={ styles.box_gray }
            >
              <h4>Recomemnded: </h4>
              <div
                className={
                  `flex flex_direction_row flex_now_wrap ${styles.recommended}`
                }
              >
                <RecomendedRecipes styles={ styles } />
              </div>
            </section>
          </section>
        ) : <Loading />
      }
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
