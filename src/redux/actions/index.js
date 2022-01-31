import { formatDataFromAPI } from '../../helpers';
import fetchDrinkByName from '../../services/drinks/fetchDrinkByName';
import fetchMealByName from '../../services/meals/fetchMealByName';

export const REQUEST_FOODS = 'REQUEST_FOODS';
export const REQUEST_DRINKS = 'REQUEST_DRINKS';

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
