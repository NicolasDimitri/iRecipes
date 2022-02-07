import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ExibitionComponent from '../components/ExibitionComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AplicationContext from '../context/AplicationContext';
import {
  requestByCategory, requestCategories, requestDrinksFromAPI,
} from '../redux/actions';
import styles from '../styles/Home.module.css';
import { alertUserWhenNoResults, redirectUserWhenOnlyOneResult } from '../helpers';

export default function Drinks() {
  const { selectedIngredient } = useContext(AplicationContext);
  const dispatch = useDispatch();
  const MAXIMUM_RECIPES_CARD = 12;
  const MAX_CATEGORIES = 5;

  const [category, setCategory] = useState('');

  const history = useHistory();

  const categories = useSelector((state) => state.requestReducers.categories);
  const wasDrinksFetched = useSelector((state) => state.requestReducers.wasDrinksFetched);
  const data = useSelector((state) => state.requestReducers.drinks);

  useEffect(() => {
    if (!selectedIngredient) {
      dispatch(requestDrinksFromAPI());
    }
  }, [category, selectedIngredient, dispatch]);

  useEffect(() => {
    if (category !== '') {
      dispatch(requestByCategory(false, category));
    }
  }, [category, dispatch]);

  useEffect(() => {
    dispatch(requestCategories(false));
  }, [dispatch]);

  useEffect(() => redirectUserWhenOnlyOneResult(data, false, history, category),
    [history, data, category]);

  function changeCategory(value) {
    setCategory((prev) => (
      prev === value ? '' : value));
  }

  alertUserWhenNoResults(data, wasDrinksFetched);

  if (!data) return (<main><Loading /></main>);

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
