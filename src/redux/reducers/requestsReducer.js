import { REQUEST_DRINKS, REQUEST_FOODS, REQUEST_INGREDIENTS } from '../actions';

const INTIAL_STATE = {
  foods: [],
  drinks: [],
  ingredients: [],
  error: '',
};

const requestReducers = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FOODS:
    return {
      ...state,
      foods: action.payload.data,
      error: action.payload.error,
    };
  case REQUEST_INGREDIENTS:
    return {
      ...state,
      ingredients: action.payload.data,
      error: action.payload.error,

    };
  case REQUEST_DRINKS:
    return {
      ...state,
      drinks: action.payload.data,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default requestReducers;
