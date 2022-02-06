import React, { useEffect, useState } from 'react';
import Feed from '../components/Feed';
import Header from '../components/Header';
import style from '../styles/FavoriteRecipes.module.css';
import styles from '../styles/Details.module.css';

const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

export default function FavoritesRecipes() {
  const [favorites, setFavorites] = useState(favoriteRecipes);

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
    setFavorites(favorites);
  }, [favorites]);

  console.log(favorites);

  return (
    <>
      <Header title="Favorite Recipes" renderExplore={ false } />
      <div className={ style['btn-div'] }>
        <button
          type="button"
          data-Testid="filter-by-all-btn"
          onClick={ () => filterByAll() }
        >
          All
        </button>
        <button
          type="button"
          data-Testid="filter-by-food-btn"
          onClick={ () => filterByFoods() }
        >
          Foods
        </button>
        <button
          type="button"
          data-Testid="filter-by-drink-btn"
          onClick={ () => filterByDrinks() }
        >
          Drinks
        </button>
      </div>
      <div className={ style['cards-list'] }>
        {
          favorites.map((fav) => (
            <div key={ fav.id } className={ style.card_container }>
              <div className="card u-clearfix">
                <div>
                  <img
                    src={ fav.image }
                    data-testid={ `${fav.id}-horizontal-image` }
                    alt=""
                    className={ style['card-media'] }
                  />
                </div>
                <div className={ style['card-body'] }>
                  <div className={ style['card-info'] }>
                    <span
                      className={ style['card-category'] }
                      data-testid={ `${fav.category}-horizontal-top-text` }
                    >
                      { fav.category }
                    </span>
                    <h2
                      className={ style['card-location'] }
                      data-testid={ `${fav.id}-${fav.location}-horizontal-tag` }
                    >
                      { fav.location }
                    </h2>
                  </div>
                  <div
                    className={ style['card-title'] }
                    data-testid={ `${fav.title}-horizontal-name` }
                  >
                    { fav.title }
                  </div>
                </div>
                <Feed styles={ styles } item={ fav } />
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
