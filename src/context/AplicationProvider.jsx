import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import light from '../images/light_mode.svg';
import AplicationContext from './AplicationContext';

function AplicationProvider({ children }) {
  const [renderButton, setRenderButton] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectRadio, setSelectRadio] = useState('');
  const [reload, setReload] = useState(false);
  const [theme, setTheme] = useState('dark_mode');
  const [iconTheme, setIconTheme] = useState(light);

  const reloader = () => {
    setReload((previous) => !previous);
  };

  function changeTheme() {
    setTheme(theme === 'dark_mode' ? 'light_mode' : 'dark_mode');
  }

  useEffect(() => { document.body.classList = theme; }, [theme]);

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
    searchInput,
    setSearchInput,
    selectRadio,
    setSelectRadio,
    resetSearchInput,
    reload,
    reloader,
    theme,
    changeTheme,
    iconTheme,
    setIconTheme,
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
