import React, { useContext } from 'react';
import AplicationContext from '../context/AplicationContext';

export default function SearchBar() {
  const { renderButton } = useContext(AplicationContext);
  if (!renderButton) return '';
  return (
    <div>
      <input
        type="text"
        name="search"
        data-testid="search-input"
      />
    </div>
  );
}
