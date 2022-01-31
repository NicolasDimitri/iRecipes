import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import '../styles/FavoriteRecipes.css';

export default function FavoritesRecipes() {
  const data = useSelector((state) => state.requestReducers.foods);
  const favoriteRecipes = JSON.parse(localStorage.getItem('favorites'));

  const filterFavorites = data.filter((recipe) => favoriteRecipes.includes(recipe.id));

  console.log(filterFavorites);
  return (
    <>
      <Header title="Favorite Recipes" renderExplore={ false } />
      <div className="btn-div">
        <Button dataTestid="filter-by-all-btn" value="All" />
        <Button dataTestid="filter-by-food-btn" value="Food" />
        <Button dataTestid="filter-by-drink-btn" value="Drinks" />
      </div>
      {
        filterFavorites.map((favorite) => (
          <div key={ favorite.id } className="card">
            <img src={ favorite.image } alt={ favorite.name } />
            <div className="container">
              <p>{ favorite.tag }</p>
              <h4><b>{ favorite.name }</b></h4>
            </div>
          </div>
        ))
      }
    </>
  );
}
