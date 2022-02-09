import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import AplicationContext from '../../../context/AplicationContext';
import { createInProgressRecipesKeys } from '../../../helpers';
import { getLocalStorage, setLocalStorage } from '../../../helpers/localstorage';
import FinishButton from './FinishButton';
import StartButton from './StartButton';

export default function MergeButtons({ styles, path, data, history }) {
  const { reload, reloader } = useContext(AplicationContext);
  const doneRecipes = getLocalStorage('doneRecipes');
  const inprogress = getLocalStorage('inProgressRecipes');
  const PROPERTY = path.includes('foods') ? 'meals' : 'cocktails';

  useEffect(() => {
    if (!doneRecipes) {
      setLocalStorage('doneRecipes', []);
      reloader();
    }
    if (!inprogress) {
      const MODEL = createInProgressRecipesKeys(PROPERTY, data.id);
      setLocalStorage('inProgressRecipes', MODEL);
    }
  }, [doneRecipes, inprogress, PROPERTY, data.id, reload, reloader]);

  console.log(doneRecipes && doneRecipes.some(({ id }) => console.log('done: ', id)));

  if (!path.includes('in-progress')
    && inprogress && !doneRecipes.some(({ id }) => id === data.id)) {
    return (
      <StartButton
        styles={ styles }
        path={ path }
        data={ data }
        history={ history }
      />
    );
  }

  return doneRecipes && !doneRecipes.some(({ id }) => id === data.id) && (
    <FinishButton
      styles={ styles }
      path={ path }
      data={ data }
      history={ history }
    />
  );
}

MergeButtons.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  path: PropTypes.string.isRequired,
  styles: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

MergeButtons.defaultProps = {
  data: {},
};
