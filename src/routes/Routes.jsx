import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreIngredients from '../pages/ExploreIngredients';
import ExploreNationalities from '../pages/ExploreNationalities';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import Profile from '../pages/Profile';
import RecipeDetails from '../pages/RecipeDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/foods/:id/in-progress" component={ RecipeDetails } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        render={ () => <ExploreIngredients isDrink={ false } /> }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        render={ () => <ExploreIngredients isDrink /> }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route path="*" component={ NotFoundPage } />
    </Switch>
  );
}
