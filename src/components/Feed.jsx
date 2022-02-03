import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import hearth from '../images/blackHeartIcon.svg';
import shared from '../images/sharedIcon.svg';
import share from '../images/shareIcon.svg';
import isHearth from '../images/whiteHeartIcon.svg';

export default function Feed({ styles, item }) {
  const { path } = useRouteMatch();

  const [shareIcon, setShareIcon] = useState(share);
  const [hearthIcon, setHearthIcon] = useState(hearth);

  function copyToClipboard() {
    const link = `http://localhost:3000${path.replace(':id', item.id)}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        global.alert('Link copied!');
        setShareIcon(shared);
      })
      .catch((err) => global.alert('Something went wrong ', err));
  }

  const manageFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const type = path.match(RegExp(/foods|drinks/, ''))[0];
    const object = { ...item, type, path };
    if (favorites && !favorites.some((already) => already.id === object.id)) {
      localStorage.setItem('favorites', JSON.stringify([
        ...favorites,
        object,
      ]));
      setHearthIcon(isHearth);
    } else if (favorites && favorites.some((already) => already.id === object.id)) {
      favorites.map((fav, i) => {
        if (fav.id === object.id) {
          favorites.splice(i, 1);
          localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        return false;
      });
      setHearthIcon(hearth);
    } else {
      localStorage.setItem('favorites', JSON.stringify([object]));
      setHearthIcon(isHearth);
    }
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
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
        style={ { transform: 'rotateZ(-35deg)', marginBottom: '7px', width: '25px' } }
        className={ styles.button }
        onClick={ copyToClipboard }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        type="button"
        className={ styles.button }
        onClick={ manageFavorites }
        data-testid="favorite-btn"
      >
        <img src={ hearthIcon } alt="black heart icon" />
      </button>
    </div>
  );
}

Feed.propTypes = {
  styles: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};
