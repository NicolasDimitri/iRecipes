import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Feed from '../components/Feed';
import Loading from '../components/Loading';
import MergeButtons from '../components/pages/details/MergeButtons';
import RecomendedRecipes from '../components/RecomendedRecipes';
import {
  updateInProgress,
  verifyLocalStorage,
} from '../helpers/localstorage';
import { requestDrinksByIdFromAPI, requestFoodsByIdFromAPI } from '../redux/actions';
import styles from '../styles/Details.module.css';
import ChangeTheme from '../components/change_theme';

export default function RecipeDetails({ match: { params: { id } }, history }) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [reload, setReload] = useState(false);
  const data = useSelector((state) => state.requestReducers.recipeDetails);
  const item = data[0];

  const property = path.includes('foods') ? 'meals' : 'cocktails';

  const handleCheckbox = ({ target: { value } }) => {
    updateInProgress('inProgressRecipes', path, id, value);
    setReload((prev) => !prev);
  };

  useEffect(() => {
    if (path.includes('foods')) {
      dispatch(requestFoodsByIdFromAPI(id));
    } else {
      dispatch(requestDrinksByIdFromAPI(id));
    }
  }, [dispatch, id, path, reload]);

  if (!item) return <main><Loading /></main>;
  return (
    <main>
      <h1 style={ { display: 'none' } }>Recipe page</h1>
      <section
        id="details"
        className={ `primary_color flex flex_direction_column ${styles.box}` }
      >
        <img
          id="hero"
          src={ item.image }
          alt={ `the ready ${item.title} recipe.` }
          data-testid="recipe-photo"
        />
        <div
          id="head"
          className={ `flex justify_content_between ${styles.head}` }
        >
          <h1 id="title" data-testid="recipe-title">{ item.title }</h1>
          <Feed id="feed" styles={ styles } item={ item } />
        </div>
        <div className="flex" data-testid="recipe-category">
          <p
            id="category"
            className={ styles.category }
          >
            { item.category }
          </p>
          { item.isAlcolic && (
            <p
              id="isAlcolic"
              className={ styles.category }
            >
              { item.isAlcolic }
            </p>
          )}
        </div>
        <section id="ingredients" className={ styles.box_gray }>
          <h4>Ingredients:</h4>
          { item.ingredients.map((ing, i) => (path.includes('in-progress')
            ? (
              <span
                key={ i }
                className="flex align_items_center"
                style={ { margin: '3px 0' } }
              >
                <label
                  htmlFor={ `${i}-${ing[0]}` }
                  data-testid={ `${i}-ingredient-step` }
                >
                  <input
                    id={ `${i}-${ing[0]}` }
                    type="checkbox"
                    name={ `${i}-${ing[0]}` }
                    value={ ing[0] }
                    className={ styles.checkbox }
                    onChange={ handleCheckbox }
                    checked={
                      verifyLocalStorage('inProgressRecipes', [property, id], ing[0])
                    }
                  />
                  <p data-testid={ `${i}-ingredient-name-and-measure` }>
                    {`${ing[0]} - ${ing[1]}`}
                  </p>
                </label>
              </span>
            )
            : (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {` - ${ing[0]} - ${ing[1]}`}
              </p>
            )))}
        </section>
        <section
          id="intrudctions"
          className={ styles.box_gray }
          data-testid="instructions"
        >
          <h4>Instructions:</h4>
          <p>{item.intructions}</p>
        </section>
        <section
          id="video"
          className={ styles.box_gray }
          data-testid="video"
        >
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
      <MergeButtons
        styles={ styles }
        path={ path }
        data={ item }
        history={ history }
      />
      <ChangeTheme />
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
