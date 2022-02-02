import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AplicationContext from '../context/AplicationContext';
import '../styles/SearchBar.css';
import {
  requestFoodsByIngredientsToAPI,
  requestFoodsByName,
  requestFoodsByFirstLetter,
  requestFoodsToAPI,
  requestDrinksByIngredientsFromAPI,
  requestDrinksByName,
  requestDrinksByFirstLetter,
  requestDrinksFromAPI } from '../redux/actions';

export default function SearchBar() {
  const {
    renderButton,
    searchInput,
    setSearchInput,
    selectRadio,
    setSelectRadio } = useContext(AplicationContext);

  const { path } = useRouteMatch();

  const dispatch = useDispatch();

  const verifyLetterFood = (letter) => {
    if (letter.length > 1) {
      const error = 'Your search must have only 1 (one) character';
      global.alert(error);
    }
    dispatch(requestFoodsByFirstLetter(searchInput));
  };
  const verifyLetterDrink = (letter) => {
    if (letter.length > 1) {
      const error = 'Your search must have only 1 (one) character';
      global.alert(error);
    }
    dispatch(requestDrinksByFirstLetter(searchInput));
  };

  const handleClick = () => {
    if (path.includes('foods')) {
      switch (selectRadio) {
      case 'ingredient':
        dispatch(requestFoodsByIngredientsToAPI(searchInput));
        break;
      case 'name':
        dispatch(requestFoodsByName(searchInput));
        break;
      case 'first-letter':
        verifyLetterFood(searchInput);
        break;
      default:
        dispatch(requestFoodsToAPI());
      }
    } if (path.includes('drinks')) {
      switch (selectRadio) {
      case 'ingredient':
        dispatch(requestDrinksByIngredientsFromAPI(searchInput));
        break;
      case 'name':
        dispatch(requestDrinksByName(searchInput));
        break;
      case 'first-letter':
        verifyLetterDrink(searchInput);
        break;
      default:
        dispatch(requestDrinksFromAPI());
      }
    }
  };

  if (!renderButton) return '';
  return (
    <div className="divSearchInput">
      <form>
        <input
          type="text"
          name="search"
          data-testid="search-input"
          className="searchInput"
          value={ searchInput }
          onChange={ ({ target }) => setSearchInput(target.value) }
        />

        <div className="radio-group">
          <label htmlFor="optradio" className="radio-inline">
            <input
              type="radio"
              value="ingredient"
              name="optradio"
              data-testid="ingredient-search-radio"
              onChange={ ({ target }) => setSelectRadio(target.value) }
            />
            {' '}
            Ingredient
          </label>
          <label htmlFor="optradio" className="radio-inline">
            <input
              type="radio"
              value="name"
              name="optradio"
              data-testid="name-search-radio"
              onChange={ ({ target }) => setSelectRadio(target.value) }
            />
            {' '}
            Name
          </label>
          <label htmlFor="optradio" className="radio-inline">
            <input
              type="radio"
              value="first-letter"
              name="optradio"
              data-testid="first-letter-search-radio"
              onChange={ ({ target }) => setSelectRadio(target.value) }
            />
            {' '}
            First Letter
          </label>
        </div>

        <button
          type="button"
          data-testid="exec-search-btn"
          className="search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </form>
    </div>
  );
}
