import React from 'react';
import like from '../images/postLikeIcon.svg';
import share from '../images/postShareIcon.svg';
import '../styles/ShareFavoriteBtn.css';

export default function ShareFavoriteBtn() {
  return (
    <div className="div-share-favorite-btn">
      <div
        // onClick=""
        // onKeyPress=""
        role="button"
        tabIndex="0"
      >
        <img src={ like } alt="a" />
      </div>
      <div
        // onClick=""
        // onKeyPress=""
        // data-testid={ `${favorite.id}-horizontal-share-btn` }
        role="button"
        tabIndex="0"
      >
        <img src={ share } alt="b" />
      </div>
    </div>
  );
}
