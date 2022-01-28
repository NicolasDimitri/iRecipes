import React, { useContext } from 'react';
import AplicationContext from '../context/AplicationContext';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const { renderButton } = useContext(AplicationContext);
  if (!renderButton) return '';
  return (
    <div className="divSearchInput">
      <input
        type="text"
        name="search"
        data-testid="search-input"
        className="searchInput"
      />
    </div>
  );
}
