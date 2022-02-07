import { formatDataFromAPI } from '../../helpers';
import fetchDrinkByID from '../../services/drinks/fetchDrinkByID';
import fetchDrinkByName from '../../services/drinks/fetchDrinkByName';
import fetchDrinkIngredients from '../../services/drinks/fetchDrinkIngredients';
import fetchDrinksByCategory from '../../services/drinks/fetchDrinksByCategory';
import fetchDrinksByFirstLetter from '../../services/drinks/fetchDrinksByFirstLetter';
import fetchDrinksCategories from '../../services/drinks/fetchDrinksCategories';
import fetchIngredientsDrinks from '../../services/drinks/fetchIngredientsDrinks';
import fetchIngredients from '../../services/meals/fetchIngredients';
import fetchMealByID from '../../services/meals/fetchMealByID';
import fetchMealByName from '../../services/meals/fetchMealByName';
import fetchMealsByCategory from '../../services/meals/fetchMealsByCategory';
import fetchMealsByFirstLetter from '../../services/meals/fetchMealsByFirstLetter';
import fetchMealsByIngredients from '../../services/meals/fetchMealsByIngredients';
import fetchMealsCategories from '../../services/meals/fetchMealsCategories';

export const REQUEST_FOODS = 'REQUEST_FOODS';
export const REQUEST_DRINKS = 'REQUEST_DRINKS';
export const REQUEST_INGREDIENTS = 'REQUEST_INGREDIENTS';
export const REQUEST_RECIPE_ID = 'REQUEST_RECIPE_ID';
export const REQUEST_RECOMENDED_RECIPES = 'REQUEST_RECOMENDED_RECIPES';

export const REQUEST_CATEGORIES = 'REQUEST_CATEOGRIES';

export const requestRecomendedRecipes = (recipesData) => ({
  type: REQUEST_RECOMENDED_RECIPES,
  payload: recipesData,
});

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

export const requestFoodsByIdFromAPI = (id) => async (dispatch) => {
  const data = await fetchMealByID(id);
  const dataFormated = formatDataFromAPI(data.data, true);
  dispatch({
    type: REQUEST_RECIPE_ID,
    payload: { data: dataFormated, error: data.error },
  });
};

export const requestDrinksByIdFromAPI = (id) => async (dispatch) => {
  const data = await fetchDrinkByID(id);
  const dataFormated = formatDataFromAPI(data.data, false);
  dispatch({
    type: REQUEST_RECIPE_ID,
    payload: { data: dataFormated, error: data.error },
  });
};

export const requestRecomendedRecipesToAPI = (isMeal) => async (dispatch) => {
  if (isMeal) {
    const data = await fetchDrinkByName('');
    const dataFormated = formatDataFromAPI(data.data, false);
    dispatch(requestRecomendedRecipes({ data: dataFormated, error: data.error }));
  } else {
    const data = await fetchMealByName('');
    const dataFormated = formatDataFromAPI(data.data, true);
    dispatch(requestRecomendedRecipes({ data: dataFormated, error: data.error }));
  }
};

export const requestFoodsByName = (name) => async (dispatch) => {
  const data = await fetchMealByName(name);
  const dataFormated = formatDataFromAPI(data.data, true);
  dispatch({ type: REQUEST_FOODS, payload: { data: dataFormated, error: data.error } });
};

export const requestFoodsByFirstLetter = (letter) => async (dispatch) => {
  const data = await fetchMealsByFirstLetter(letter);
  const dataFormated = formatDataFromAPI(data.data, true);
  dispatch({ type: REQUEST_FOODS, payload: { data: dataFormated, error: data.error } });
};

export const requestDrinksByName = (name) => async (dispatch) => {
  const data = await fetchDrinkByName(name);
  const dataFormated = formatDataFromAPI(data.data, false);
  dispatch({ type: REQUEST_DRINKS, payload: { data: dataFormated, error: data.error } });
};

export const requestDrinksByFirstLetter = (letter) => async (dispatch) => {
  const data = await fetchDrinksByFirstLetter(letter);
  const dataFormated = formatDataFromAPI(data.data, false);
  dispatch({ type: REQUEST_DRINKS, payload: { data: dataFormated, error: data.error } });
};

export const requestCategories = (type = true) => async (dispatch) => {
  const { data, error } = (type)
    ? await fetchMealsCategories()
    : await fetchDrinksCategories();
  dispatch({
    type: REQUEST_CATEGORIES,
    payload: { data, error },
  });
};

export const requestByCategory = (type = true, category) => async (dispatch) => {
  const { data, error } = (type)
    ? await fetchMealsByCategory(category)
    : await fetchDrinksByCategory(category);
  const dataFormated = formatDataFromAPI(data, type);
  dispatch({
    type: (type) ? REQUEST_FOODS : REQUEST_DRINKS,
    payload: { data: dataFormated, error } });
};
