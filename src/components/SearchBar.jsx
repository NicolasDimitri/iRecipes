import React, { useContext } from 'react';
import AplicationContext from '../context/AplicationContext';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const { renderButton } = useContext(AplicationContext);
  if (!renderButton) return '';
  return (
    <div className="divSearchInput">
      <form>
        <input
          type="text"
          name="search"
          data-testid="search-input"
          className="searchInput"
        />

        <div className="radio-group">
          <label htmlFor="optradio" className="radio-inline">
            <input type="radio" name="optradio" data-testid="ingredient-search-radio" />
            {' '}
            Ingredient
          </label>
          <label htmlFor="optradio" className="radio-inline">
            <input type="radio" name="optradio" data-testid="name-search-radio" />
            {' '}
            Name
          </label>
          <label htmlFor="optradio" className="radio-inline">
            <input type="radio" name="optradio" data-testid="first-letter-search-radio" />
            {' '}
            First Letter
          </label>
        </div>

        <button type="button" data-testid="exec-search-btn" className="search-btn">
          Search
        </button>
      </form>
    </div>
  );
}
