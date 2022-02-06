import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import Header from '../components/Header';
import { getLocalStorage, setLocalStorage } from '../helpers/localstorage';
import styles from '../styles/Details.module.css';
import style from '../styles/FavoriteRecipes.module.css';

export default function FavoritesRecipes() {
  const [favorites, setFavorites] = useState(getLocalStorage('favoriteRecipes'));

  const filterByAll = () => setFavorites(favoriteRecipes);

  const filterByFoods = () => {
    const filter = favoriteRecipes.filter((recipe) => recipe.type === 'foods');
    setFavorites(filter);
  };

  const filterByDrinks = () => {
    const filter = favoriteRecipes.filter((recipe) => recipe.type === 'drinks');
    setFavorites(filter);
  };

  useEffect(() => {
    if (!favorites) {
      setLocalStorage('favoriteRecipes', []);
    }
    setFavorites(favorites);
  }, [favorites]);

  if (!favorites) return ('');
  return (
    <>
      <Header title="Favorite Recipes" renderExplore={ false } />
      <div className={ style['btn-div'] }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterByAll() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterByFoods() }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterByDrinks() }
        >
          Drinks
        </button>
      </div>
      <div className={ style['cards-list'] }>
        {console.log('teste')}
        {

          favorites && favorites.map((fav, i) => (
            <div key={ fav.id } className={ style.card_container }>
              <div className="card u-clearfix">
                <div>
                  <img
                    src={ fav.image }
                    data-testid={ `${i}-horizontal-image` }
                    alt=""
                    className={ style['card-media'] }
                  />
                </div>
                <div className={ style['card-body'] }>
                  <div className={ style['card-info'] }>
                    <span
                      className={ style['card-category'] }
                      data-testid={ `${i}-horizontal-top-text` }
                    >
                      {`${fav?.nationality}`}
                      {`${fav?.alcoholicOrNot} - `}
                      {`${fav?.category}`}

                    </span>
                    <h2
                      className={ style['card-location'] }
                      data-testid={ `${i}-${fav.location}-horizontal-tag` }
                    >
                      { fav.location }
                    </h2>
                  </div>
                  <div
                    className={ style['card-title'] }
                    data-testid={ `${i}-horizontal-name` }
                  >
                    { fav.name }
                  </div>
                </div>
                <Feed
                  styles={ styles }
                  item={ fav }
                  tshare={ `${i}-horizontal-share-btn` }
                  tfav={ `${i}-horizontal-favorite-btn` }
                />
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
