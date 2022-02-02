import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AplicationContext from './AplicationContext';

function AplicationProvider({ children }) {
  const [renderButton, setRenderButton] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [darkMode, toggleDarkMode] = useState(true);

  /**
   * Altera o tema da aplicaçao para dark ou light mode
   * @function changeTheme
   * @param void - Don't recive param
   */
  const changeTheme = () => {
    toggleDarkMode(!darkMode);
  };

  /**
   * Altera o status do renderButton
   *@function toggleSearchBar;
   */
  const toggleSearchBar = () => {
    setRenderButton(!renderButton);
  };

  const stateValue = {
    renderButton,
    toggleSearchBar,
    setSelectedIngredient,
    selectedIngredient,
    changeTheme,
    darkMode,
  };

  return (
    <AplicationContext.Provider value={ stateValue }>
      { children }
    </AplicationContext.Provider>
  );
}

AplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AplicationProvider;
