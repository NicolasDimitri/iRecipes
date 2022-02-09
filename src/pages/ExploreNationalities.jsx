import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/ExploreNationalities.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestFoodsToAPI } from '../redux/actions';
import fetchMealByArea from '../services/meals/fetchMealByArea';
import fetchMealsNacionality from '../services/meals/fetchMealsNacionality';

export default function ExploreNationalities() {
  const MAX_LENGTH = 12;
  const [selectNationality, setSelectNationality] = useState();
  const [mealsByArea, setMealsByArea] = useState();

  const dispatch = useDispatch();
  const data = useSelector((s) => s.requestReducers.foods);

  useEffect(() => {
    fetchMealsNacionality().then((r) => setSelectNationality(r.data));
    dispatch(requestFoodsToAPI());
  }, [dispatch]);
  return (
    <>
      <Header title="Explore Nationalities" />
      <div
        className={ styles.content }
        style={ { marginTop: '90px' } }
      >
        <select
          data-testid="explore-by-nationality-dropdown"
          style={ styles.selectInput }
          name="explore-by-nationality-dropdown"
          id="explore-by-nationality-dropdown"
          onChange={ ({ target: { value } }) => {
            if (value !== 'All') {
              fetchMealByArea(value).then((r) => setMealsByArea(r.data.meals));
            }
            if (value === 'All') {
              setMealsByArea();
            }
          } }
        >
          <option
            data-testid={ `${'All'}-option` }
          >
            All
          </option>
          {selectNationality && selectNationality.map(({ strArea }, i) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ i }
            >
              {strArea}
            </option>))}
        </select>
        {mealsByArea ? mealsByArea
          .slice(0, MAX_LENGTH).map(({ idMeal, strMeal, strMealThumb }, i) => (
            <Link
              className={ styles.card }
              to={ `/foods/${idMeal}` }
              data-testid={ `${i}-recipe-card` }
              key={ idMeal }
            >
              <h1
                data-testid={ `${i}-card-name` }
              >
                {strMeal}
              </h1>
              <img
                style={ { width: '100px' } }
                data-testid={ `${i}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
            </Link>
          ))
          : data.slice(0, MAX_LENGTH).map(({ id, image, title }, i) => (
            <Link
              className={ styles.card }
              to={ `/foods/${id}` }
              data-testid={ `${i}-recipe-card` }
              key={ id }
            >
              <h1
                data-testid={ `${i}-card-name` }
              >
                {title}
              </h1>
              <img
                style={ { width: '100px' } }
                data-testid={ `${i}-card-img` }
                src={ image }
                alt={ title }
              />
            </Link>
          ))}
      </div>
      <Footer />
    </>
  );
}
