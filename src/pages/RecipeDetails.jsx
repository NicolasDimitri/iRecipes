import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import styles from '../styles/Details.module.css';
import { requestFoodsByIdFromAPI, requestDrinksByIdFromAPI } from '../redux/actions';
import RecomendedRecipes from '../components/RecomendedRecipes';

export default function RecipeDetails({ match: { params: { id } } }) {
  const { path } = useRouteMatch();

  const dispatch = useDispatch();

  useEffect(() => {
    if (path.includes('foods')) {
      dispatch(requestFoodsByIdFromAPI(id));
    } else {
      dispatch(requestDrinksByIdFromAPI(id));
    }
  }, [dispatch, id, path]);

  const data = useSelector((state) => state.requestReducers.recipeDetails);

  const item = data[0];
  return (
    <section
      id="recipeDescription"
      style={ { margin: '90px 0' } }
    >
      {item && (
        <div className={ `flex flex_direction_column wrapper ${styles.box}` }>
          <img src={ item.image } alt="a" data-testid="recipe-photo" />
          <div className={ `flex flex justify_content_between ${styles.head}` }>
            <h1 data-testid="recipe-title">{ item.title }</h1>
            <div className={ styles.feedback }>
              <button
                type="button"
                className={ styles.button }
                data-testid="share-btn"
              >
                <img src={ shareIcon } alt="share icon" />
              </button>
              <button
                type="button"
                className={ styles.button }
                data-testid="favorite-btn"
              >
                <img src={ blackHeartIcon } alt="black heart icon" />
              </button>
            </div>
          </div>

          <h3 data-testid="recipe-category">{ item.category }</h3>
          { item.isAlcolic && (
            <p data-testid="recipe-category">{ item.isAlcolic }</p>
          ) }
          <div className={ styles.ingredients }>
            <h4>Ingredients:</h4>
            { item.ingredients.map((ingredient, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {` - ${ingredient[0]} - ${ingredient[1]}`}
              </p>
            ))}
          </div>
          <div className={ styles.ingredients }>
            <h4>Instructions:</h4>
            <p data-testid="instructions">{item.intructions}</p>
          </div>
          <div className={ styles.ingredients }>
            <h4>Video: </h4>
            <iframe
              data-testid="video"
              title="YouTube video player"
              id="ytplayer"
              type="text/html"
              src={ `https://www.youtube.com/embed/${item.movie}` }
              frameBorder="0"
            />
          </div>
          <RecomendedRecipes />
          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ styles.btnStartRecipe }
          >
            Start Recipe
          </button>
        </div>
      )}
    </section>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
