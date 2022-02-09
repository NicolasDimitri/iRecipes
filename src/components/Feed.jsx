import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import AplicationContext from '../context/AplicationContext';
import isHearth from '../images/blackHeartIcon.svg';
import shared from '../images/sharedIcon.svg';
import share from '../images/shareIcon.svg';
import hearth from '../images/whiteHeartIcon.svg';

export default function Feed({ styles, item, tshare, tfav }) {
  const [shareIcon, setShareIcon] = useState(share);
  const [hearthIcon, setHearthIcon] = useState(hearth);
  const { reloader, theme } = useContext(AplicationContext);

  const type = item.type.match(/food|drink/)[0];

  function copyToClipboard() {
    const link = `http://localhost:3000/${type}s/${item.id}`;
    navigator.clipboard.writeText(link);
    setShareIcon(shared);
    createNotification('copy');
  }

  function applyStyleShare() {
    if (theme === 'light_mode' && shareIcon !== shared) {
      return { filter: 'invert(100%)' };
    }
  }

  function applyStyleHearth() {
    if (theme === 'light_mode' && hearthIcon !== isHearth) {
      return { filter: 'invert(100%)' };
    }
  }

  const manageFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // const type = path.match(RegExp(/food|drink/, ''))[0];
    const object = {
      id: item.id,
      type,
      nationality: item.location || '',
      category: item.category || '',
      alcoholicOrNot: item.isAlcolic || '',
      name: item.title,
      image: item.image,
    };

    // const object = { ...item, type, path };
    if (favorites && !favorites.some((already) => already.id === object.id)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...favorites,
        object,
      ]));
      setHearthIcon(isHearth);
    } else if (favorites && favorites.some((already) => already.id === object.id)) {
      favorites.map((fav, i) => {
        if (fav.id === object.id) {
          favorites.splice(i, 1);
          localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
        }
        return false;
      });
      setHearthIcon(hearth);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([object]));
      setHearthIcon(isHearth);
    }
    reloader();
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites && favorites.some((it) => it.id === item.id)) {
      setHearthIcon(isHearth);
    }

    return () => {
      setHearthIcon(hearth);
    };
  }, [item.id]);

  return (
    <div className={ `flex ${styles.feed}` }>
      <button
        type="button"
        style={ { transform: 'rotateZ(-35deg)', marginBottom: '7px' } }
        className={ `${styles.button} ${styles.copyButton} ` }
        onClick={ copyToClipboard }
      >
        <img
          style={ applyStyleShare() }
          data-testid={ tshare }
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      <button
        type="button"
        className={ styles.button }
        onClick={ manageFavorites }

      >
        <img
          style={ applyStyleHearth() }
          data-testid={ tfav }
          src={ hearthIcon }
          alt="black heart icon"
        />
      </button>
    </div>
  );
}

Feed.propTypes = {
  styles: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  tshare: PropTypes.string,
  tfav: PropTypes.string,
};

Feed.defaultProps = {
  tshare: 'share-btn',
  tfav: 'favorite-btn',
};
