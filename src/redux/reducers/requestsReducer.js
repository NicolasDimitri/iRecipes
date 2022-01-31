import { REQUEST_DRINKS, REQUEST_FOODS } from '../actions';

const INTIAL_STATE = {
  foods: [],
  drinks: [],
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
