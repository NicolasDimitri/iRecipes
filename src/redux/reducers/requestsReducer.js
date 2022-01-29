import { REQUEST_FOODS } from '../actions';

const INTIAL_STATE = {
  data: [],
  error: '',
};

const requestReducers = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FOODS:
    return {
      ...state,
      data: action.payload.data,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default requestReducers;
