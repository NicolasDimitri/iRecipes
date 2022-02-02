import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { requestRecomendedRecipesToAPI } from '../redux/actions';
import style from '../styles/RecomendedRecipes.module.css';

const max = 6;

export default function RecomendedRecipes() {
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
  console.log(data);
  return (
    <section>
      <h1>RECOMENDED Reciepes</h1>
      {data && (
        <section className={ style.recomendedRecipesContainer }>
          {data.map((recipe, index) => {
            if (index + 1 <= max) {
              return (
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ recipe.id }
                  className={ style.recomendedRecipes }
                >
                  <h1 data-testid={ `${index}-recomendation-title` }>
                    {recipe.title}
                  </h1>
                  { recipe.isAlcolic && (
                    <p data-testid="recipe-category">{ recipe.isAlcolic }</p>
                  ) }
                  <img src={ recipe.image } alt={ recipe.title } />
                </div>
              );
            }
            return false;
          })}
        </section>
      )}
    </section>
  );
}
