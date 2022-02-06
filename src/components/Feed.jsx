import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { NotificationContainer } from 'react-notifications';
import { createNotification } from '../helpers/index';
import isHearth from '../images/blackHeartIcon.svg';
import shared from '../images/sharedIcon.svg';
import share from '../images/shareIcon.svg';
import hearth from '../images/whiteHeartIcon.svg';

export default function Feed({ styles, item }) {
  const [shareIcon, setShareIcon] = useState(share);
  const [hearthIcon, setHearthIcon] = useState(hearth);
  const type = item.type.match(/food|drink/)[0];

  function copyToClipboard() {
    const link = `http://localhost:3000/${item.type}/${item.id}`;
    navigator.clipboard.writeText(link);
    setShareIcon(shared);
    createNotification('copy');
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
        className={ `${styles.button} ${styles.copyButton}` }
        onClick={ copyToClipboard }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        type="button"
        className={ styles.button }
        onClick={ manageFavorites }

      >
        <img data-testid="favorite-btn" src={ hearthIcon } alt="black heart icon" />
      </button>
      <NotificationContainer />
    </div>
  );
}

Feed.propTypes = {
  styles: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
