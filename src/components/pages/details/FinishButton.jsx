import PropTypes from 'prop-types';
import React from 'react';
import {
  getLocalStorage,
  setLocalStorage,
  verifyLocalStorage,
} from '../../../helpers/localstorage';

export default function FinishButton({ styles, path, data, history }) {
  const PROPERTY = path.includes('foods') ? 'meals' : 'cocktails';
  function handleButtonDone() {
    const { id, type, category, title, image, tags } = data;
    const storage = getLocalStorage('doneRecipes');
    const progress = getLocalStorage('inProgressRecipes');

    const MODEL = {
      id,
      type,
      nationality: data.location || '',
      category: category || '',
      alcoholicOrNot: data.isAlcolic || '',
      name: title,
      image,
      doneDate: new Date().toLocaleString('pt-BR'),
      tags,
    };

    if (!storage) {
      setLocalStorage('doneRecipes', [MODEL]);
      delete progress[PROPERTY][data.id];
      setLocalStorage('inProgressRecipes', progress);
    } else {
      storage.push(MODEL);
      setLocalStorage('doneRecipes', storage);
      delete progress[PROPERTY][data.id];
      setLocalStorage('inProgressRecipes', progress);
    }

    history.push('/done-recipes');
  }
  return (
    <button
      type="button"
      className={ `fixed ${styles.event_button}` }
      data-testid="finish-recipe-btn"
      onClick={ handleButtonDone }
      disabled={ verifyLocalStorage('inProgressRecipes', [PROPERTY], data.id)
       && (data.ingredients.length > (
         getLocalStorage('inProgressRecipes')[PROPERTY][data.id].length)) }
    >
      Finish recipe
    </button>
  );
}

FinishButton.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  path: PropTypes.string.isRequired,
  styles: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
