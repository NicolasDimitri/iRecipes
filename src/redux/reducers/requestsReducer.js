import {
  REQUEST_DRINKS,
  REQUEST_FOODS,
  REQUEST_INGREDIENTS,
  REQUEST_RECIPE_ID,
  REQUEST_RECOMENDED_RECIPES,
} from '../actions';

const INTIAL_STATE = {
  foods: [],
  drinks: [],
  ingredients: [],
  recipeDetails: [],
  recomendedRecipes: [],
  error: '',
};

const requestReducers = (state = INTIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECOMENDED_RECIPES:
    return {
      ...state,
      recomendedRecipes: action.payload.data,
      error: action.payload.error,
    };
  case REQUEST_RECIPE_ID:
    return {
      ...state,
      recipeDetails: action.payload.data,
      error: action.payload.error,
    };
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
