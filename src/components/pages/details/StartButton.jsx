import PropTypes from 'prop-types';
import React from 'react';
import {
  getLocalStorage,
  setLocalStorage,
  verifyLocalStorage,
} from '../../../helpers/localstorage';

export default function StartButton({ styles, path, data, history }) {
  const PROPERTY = path.includes('foods') ? 'meals' : 'cocktails';
  function handleButton() {
    const storage = getLocalStorage('inProgressRecipes');
    const MODEL = { cocktails: {}, meals: {} };

    if (!storage) {
      MODEL[PROPERTY][data.id] = [];
      setLocalStorage('inProgressRecipes', MODEL);
    } else if (!verifyLocalStorage('inProgressRecipes', [PROPERTY], data.id)) {
      storage[PROPERTY][data.id] = [];
      setLocalStorage('inProgressRecipes', storage);
    }
    history.push(path.replace(':id', `${data.id}/in-progress`));
  }

  return (
    <button
      type="button"
      className={ `fixed ${styles.event_button}` }
      onClick={ handleButton }
      data-testid="start-recipe-btn"
    >
      {
        !verifyLocalStorage('inProgressRecipes', [PROPERTY], data.id)
          ? 'Start recipe' : 'Continue Recipe'
      }
    </button>);
}

StartButton.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  path: PropTypes.string.isRequired,
  styles: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
