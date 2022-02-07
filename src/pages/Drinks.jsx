import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExibitionComponent from '../components/ExibitionComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AplicationContext from '../context/AplicationContext';
import {
  requestByCategory, requestCategories, requestDrinksFromAPI,
} from '../redux/actions';
import styles from '../styles/Home.module.css';

export default function Drinks() {
  const { selectedIngredient } = useContext(AplicationContext);
  const dispatch = useDispatch();
  const MAXIMUM_RECIPES_CARD = 12;
  const MAX_CATEGORIES = 5;

  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!selectedIngredient) {
      dispatch(requestDrinksFromAPI());
      dispatch(requestCategories(false));
    }
    if (category !== '') dispatch(requestByCategory(false, category));
  }, [category, selectedIngredient, dispatch]);

  const categories = useSelector((state) => state.requestReducers.categories);
  const data = useSelector((state) => state.requestReducers.drinks);

  function changeCategory(value) {
    setCategory((prev) => (
      prev === value ? '' : value));
  }

  if (!data || !categories) return (<main><Loading /></main>);

  return (
    <>
      <Header title="Drinks" />
      <main>
        <h1 style={ { display: 'none' } }>Drinks page</h1>
        <div className={ styles.categories }>
          <button
            type="button"
            onClick={ () => changeCategory('') }
            data-testid="All-category-filter"
          >
            All
          </button>
          {
            categories && categories.map(({ strCategory }, i) => {
              if (i < MAX_CATEGORIES) {
                return (
                  <button
                    key={ i }
                    type="button"
                    onClick={ () => changeCategory(strCategory) }
                    onDoubleClick={ () => {} }
                    data-testid={ `${strCategory}-category-filter` }
                  >
                    {strCategory}

                  </button>
                );
              }
              return false;
            })
          }
        </div>
        {
          data.length > 0 && (
            data.map((item, index) => {
              if ((index + 1) <= MAXIMUM_RECIPES_CARD) {
                return (
                  <ExibitionComponent
                    key={ item.title }
                    data={ item }
                    index={ index }
                  />
                );
              }
              return false;
            })
          )
        }
      </main>
      <Footer />
    </>
  );
}
