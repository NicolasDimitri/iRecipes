import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChangeTheme from '../components/change_theme';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getLocalStorage } from '../helpers/localstorage';
import styles from '../styles/Cooked.module.css';

export default function Cooked() {
  const storage = getLocalStorage('doneRecipes') || [];
  const [search, setSearch] = useState('');

  const filtered = storage
    && storage.filter((item) => item.type.match(RegExp(search, 'g')));

  if (!filtered) return (<Loading />);

  return (
    <>
      <Header title="Done Recipes" renderExplore={ false } />
      <main>
        <h1 style={ { display: 'none' } }>Cooked page</h1>
        <div className="flex justify_content_around">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            className={ styles.button_filter }
            onClick={ () => setSearch('') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            className={ styles.button_filter }
            onClick={ () => setSearch('food') }
          >
            Foods
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            className={ styles.button_filter }
            onClick={ () => setSearch('drink') }
          >
            Drinks
          </button>
        </div>
        <div
          className="flex align_items_center justify_content_around flex_direction_column"
        >
          {
            filtered && filtered.map(({
              image, name, category, nationality,
              alcoholicOrNot, tags, doneDate, id, type,
            }, i) => {
              const path = type.match(/food|drink/)[0];
              return (
                <div
                  key={ i }
                  className={
                    `flex flex_direction_column align_items_center ${styles.box}`
                  }
                >
                  <Link to={ `${path}s/${id}` }>
                    <img
                      src={ image }
                      alt={ name }
                      data-testid={ `${i}-horizontal-image` }
                    />
                  </Link>
                  <div className="flex justify_content_around flex_wrap">
                    <span
                      className={ styles.category }
                      data-testid={ `${i}-horizontal-top-text` }
                    >
                      {`${nationality}`}
                      {`${alcoholicOrNot} - `}
                      {`${category}`}
                    </span>
                    <span
                      className={ styles.category }
                    >
                      {Array.isArray(tags) ? tags.map((tag, iTag) => (
                        <p
                          key={ iTag }
                          data-testid={ `${i}-${tag}-horizontal-tag` }
                        >
                          {tag}
                        </p>
                      )) : (
                        <p data-testid={ `${i}-${tags}-horizontal-tag` }>
                          {tags}
                        </p>
                      )}
                    </span>
                    <span
                      className={ styles.date }
                      data-testid={ `${i}-horizontal-done-date` }
                    >
                      {doneDate}

                    </span>
                  </div>
                  <Link to={ `${path}s/${id}` }>
                    <h1 data-testid={ `${i}-horizontal-name` }>{name}</h1>
                  </Link>
                  <Feed
                    styles={ styles }
                    item={ {
                      image,
                      name,
                      category,
                      nationality,
                      alcoholicOrNot,
                      tags,
                      doneDate,
                      id,
                      type } }
                    tshare={ `${i}-horizontal-share-btn` }
                    tfav={ `${i}-horizontal-favorite-btn` }
                  />
                </div>
              );
            })
          }
        </div>
        <ChangeTheme />

      </main>
    </>
  );
}
