import { formatDataFromAPI } from '../../helpers';
import fetchDrinkByName from '../../services/drinks/fetchDrinkByName';
import fetchMealByName from '../../services/meals/fetchMealByName';
import fetchIngredients from '../../services/meals/fetchIngredients';
import fetchIngredientsDrinks from '../../services/drinks/fetchIngredientsDrinks';
import fetchDrinkIngredients from '../../services/drinks/fetchDrinkIngredients';
import fetchMealsByIngredients from '../../services/meals/fetchMealsByIngredients';

export const REQUEST_FOODS = 'REQUEST_FOODS';
export const REQUEST_DRINKS = 'REQUEST_DRINKS';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';

export const requestIngredients = (ingredientsData) => ({
  type: REQUEST_INGREDIENTS,
  payload: ingredientsData,
});

export const requestMealIngredientsFromAPI = () => async (dispatch) => {
  const data = await fetchIngredients();
  dispatch(requestIngredients(data));
};

export const requestDrinksIngredientsFromAPI = () => async (dispatch) => {
  const data = await fetchIngredientsDrinks();
  dispatch(requestIngredients(data));
};

export const requestFoodsToAPI = () => async (dispatch) => {
  const data = await fetchMealByName('');
  const dataFormated = formatDataFromAPI(data.data, true);
  dispatch({ type: REQUEST_FOODS, payload: { data: dataFormated, error: data.error } });
};

export const requestDrinksFromAPI = () => async (dispatch) => {
  const data = await fetchDrinkByName('');
  const dataFormated = formatDataFromAPI(data.data, false);
  dispatch({ type: REQUEST_DRINKS, payload: { data: dataFormated, error: data.error } });
};

export const requestFoodsByIngredientsToAPI = (ingredient) => async (dispatch) => {
  const data = await fetchMealsByIngredients(ingredient);
  const dataFormated = formatDataFromAPI(data.data, true);
  dispatch({ type: REQUEST_FOODS, payload: { data: dataFormated, error: data.error } });
};

export const requestDrinksByIngredientsFromAPI = (ingredient) => async (dispatch) => {
  const data = await fetchDrinkIngredients(ingredient);
  const dataFormated = formatDataFromAPI(data.data, false);
  dispatch({ type: REQUEST_DRINKS, payload: { data: dataFormated, error: data.error } });
};
