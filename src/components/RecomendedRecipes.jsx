import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { requestRecomendedRecipesToAPI } from '../redux/actions';

const MAX = 6;

export default function RecomendedRecipes({ styles }) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    if (path.includes('foods')) {
      dispatch(requestRecomendedRecipesToAPI(true));
    } else {
      dispatch(requestRecomendedRecipesToAPI(false));
    }
  }, [dispatch, path]);

  const data = useSelector((state) => state.requestReducers.recomendedRecipes);

  return data ? data.map((recipe, i) => {
    if (i + 1 <= MAX) {
      return (
        <Link
          key={ recipe.id }
          id={ `link_recommended_${i}` }
          to={ `/${recipe.type}/${recipe.id}` }
        >
          <section
            id={ `card_recommended_${i}` }
            className={ `flex flex_direction_column ${styles.recommended_card}` }
            data-testid={ `${i}-recomendation-card` }
          >
            <img
              id={ `image_recommended_${i}` }
              src={ recipe.image }
              alt={ recipe.title }
            />
            <div className={ styles.recommended_card_title }>
              <h1
                id={ `title_recommended_${i}` }
                data-testid={ `${i}-recomendation-title` }
              >
                {recipe.title}
              </h1>
              { recipe.isAlcolic && (
                <p
                  id={ `category_recommended_${i}` }
                  data-testid="recipe-category"
                >
                  { recipe.isAlcolic }
                </p>
              ) }
            </div>
          </section>
        </Link>
      );
    } return false;
  }) : '';
}
