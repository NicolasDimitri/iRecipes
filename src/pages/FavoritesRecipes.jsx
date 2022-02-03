import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import style from '../styles/FavoriteRecipes.module.css';

export default function FavoritesRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favorites'));

  return (
    <>
      <Header title="Favorite Recipes" renderExplore={ false } />
      <div className={ style['btn-div'] }>
        <Button dataTestid="filter-by-all-btn" value="All" />
        <Button dataTestid="filter-by-food-btn" value="Food" />
        <Button dataTestid="filter-by-drink-btn" value="Drinks" />
      </div>
      <div className={ style['cards-list'] }>
        {
          favoriteRecipes.map((fav) => (
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
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}
