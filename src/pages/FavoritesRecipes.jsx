import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AplicationContext from '../context/AplicationContext';
import { getLocalStorage } from '../helpers/localstorage';
import styles from '../styles/Details.module.css';
import style from '../styles/FavoriteRecipes.module.css';

export default function FavoritesRecipes() {
  const storage = getLocalStorage('favoriteRecipes');
  const [search, setSearch] = useState('');
  const { reload } = useContext(AplicationContext);

  const favorites = storage.filter((item) => item.type.match(RegExp(search, 'g')));

  useEffect(() => {
    if (!favorites) setLocalStorage('favoriteRecipes', []);
  }, [favorites, reload]);

  if (!storage) return <Loading />;
  return (
    <>
      <Header title="Favorite Recipes" renderExplore={ false } />
      <div className={ style['btn-div'] }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setSearch('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setSearch('food') }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setSearch('drink') }
        >
          Drinks
        </button>
      </div>
      <div className={ style['cards-list'] }>
        {console.log('teste')}
        {

          favorites && favorites.map((fav, i) => {
            const path = fav.type.match(/food|drink/)[0];
            return (
              <div key={ fav.id } className={ style.card_container }>
                <div className="card u-clearfix">
                  <div>
                    <Link to={ `${path}s/${fav.id}` }>
                      <img
                        src={ fav.image }
                        data-testid={ `${i}-horizontal-image` }
                        alt=""
                        className={ style['card-media'] }
                      />
                    </Link>
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
                    <Link to={ `${path}s/${fav.id}` }>
                      <div
                        className={ style['card-title'] }
                        data-testid={ `${i}-horizontal-name` }
                      >
                        { fav.name }
                      </div>
                    </Link>
                  </div>
                  <Feed
                    styles={ styles }
                    item={ fav }
                    tshare={ `${i}-horizontal-share-btn` }
                    tfav={ `${i}-horizontal-favorite-btn` }
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
}
