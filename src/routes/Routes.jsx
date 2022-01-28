import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreNationalities from '../pages/ExploreNationalities';
import ExploreIngredients from '../pages/ExploreIngredients';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods:id" component={ Foods } />
      <Route exact path="/drinks:id" component={ Drinks } />
      <Route exact path="/foods:id/in-progress" component={ Foods } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreIngredients } />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
    </Switch>
  );
}
