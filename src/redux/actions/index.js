import fetchMealByName from '../../services/meals/fetchMealByName';
import { formatDataFromAPI } from '../../helpers';

export const REQUEST_FOODS = 'REQUEST_FOODS';

const requestFoodsToAPI = () => async (dispatch) => {
  const data = await fetchMealByName('');
  const dataFormated = formatDataFromAPI(data.data, true);
  dispatch({ type: REQUEST_FOODS, payload: { data: dataFormated, error: data.error } });
};

export default requestFoodsToAPI;
