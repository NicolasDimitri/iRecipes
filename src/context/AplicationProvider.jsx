import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AplicationContext from './AplicationContext';

function AplicationProvider({ children }) {
  const [renderButton, setRenderButton] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [darkMode, toggleDarkMode] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [selectRadio, setSelectRadio] = useState('');
  const [reload, setReload] = useState(false);

  /**
   * Altera o tema da aplicaçao para dark ou light mode
   * @function changeTheme
   * @param void - Don't recive param
   */
  const changeTheme = () => {
    toggleDarkMode(!darkMode);
  };

  const reloader = () => {
    setReload((previous) => !previous);
  };

  /**
   * Altera o status do renderButon
   *@function toggleSearchBar;
   */
  const toggleSearchBar = () => {
    setRenderButton(!renderButton);
  };

  const resetSearchInput = () => {
    if (renderButton) {
      toggleSearchBar();
    }
  };

  const stateValue = {
    renderButton,
    toggleSearchBar,
    setSelectedIngredient,
    selectedIngredient,
    changeTheme,
    darkMode,
    searchInput,
    setSearchInput,
    selectRadio,
    setSelectRadio,
    resetSearchInput,
    reload,
    reloader,
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
