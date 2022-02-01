import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AplicationContext from '../context/AplicationContext';
import {
  requestMealIngredientsFromAPI,
  requestDrinksIngredientsFromAPI,
  requestDrinksByIngredientsFromAPI,
  requestFoodsByIngredientsToAPI,
} from '../redux/actions';

export default function ExploreIngredients({ isDrink }) {
  const MAXIMUM_INGREDIENT_CARD = 12;

  const { setSelectedIngredient } = useContext(AplicationContext);

  const history = useHistory();
  const dispatch = useDispatch();

  const setIngredientAndRedirectUser = (ingredient) => {
    if (!isDrink) {
      setSelectedIngredient(ingredient);
      dispatch(requestFoodsByIngredientsToAPI(ingredient));
      history.push('/foods');
    } else {
      setSelectedIngredient(ingredient);
      dispatch(requestDrinksByIngredientsFromAPI(ingredient));
      history.push('/drinks');
    }
  };

  const ingredients = useSelector((state) => state.requestReducers.ingredients);

  useEffect(() => {
    if (isDrink) {
      dispatch(requestDrinksIngredientsFromAPI());
    } else {
      dispatch(requestMealIngredientsFromAPI());
    }
  }, [dispatch, isDrink]);

  return (
    <>
      <Header title="Explore Ingredients" renderExplore={ false } />
      <SearchBar />
      {
        ingredients.length > 0 && (
          <section style={ { marginTop: '90px', marginBottom: '90px' } }>
            { ingredients.map(({ strIngredient1, strIngredient }, index) => {
              if ((index + 1 <= MAXIMUM_INGREDIENT_CARD)) {
                return (
                  <section
                    key={ index }
                    data-testid={ `${index}-ingredient-card` }
                    onClick={ () => setIngredientAndRedirectUser(
                      strIngredient1 || strIngredient,
                    ) }
                    aria-hidden="true"

                  >
                    <h1
                      data-testid={ `${index}-card-name` }
                    >
                      {strIngredient1 || strIngredient}

                    </h1>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ isDrink ? (
                        `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`
                      ) : (
                        `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
                      ) }
                      alt={ strIngredient || strIngredient1 }
                    />

                  </section>
                );
              }
              return false;
            })}
          </section>

        )
      }
      <Footer />
    </>
  );
}

ExploreIngredients.propTypes = {
  isDrink: PropTypes.bool.isRequired,
};
