import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cooked from '../pages/Cooked';
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
import PrivateRoutes from './PrivateRoutes';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <PrivateRoutes exact path="/foods" component={ Foods } />
      <PrivateRoutes exact path="/drinks" component={ Drinks } />
      <PrivateRoutes exact path="/foods/:id" component={ RecipeDetails } />
      <PrivateRoutes exact path="/drinks/:id" component={ RecipeDetails } />
      <PrivateRoutes exact path="/foods/:id/in-progress" component={ RecipeDetails } />
      <PrivateRoutes exact path="/drinks/:id/in-progress" component={ RecipeDetails } />
      <PrivateRoutes exact path="/explore" component={ Explore } />
      <PrivateRoutes exact path="/explore/foods" component={ ExploreFoods } />
      <PrivateRoutes exact path="/explore/drinks" component={ ExploreDrinks } />
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
      <PrivateRoutes
        exact
        path="/explore/foods/nationalities"
        component={ ExploreNationalities }
      />
      <PrivateRoutes exact path="/profile" component={ Profile } />
      <PrivateRoutes exact path="/done-recipes" component={ Cooked } />
      <PrivateRoutes exact path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route path="*" component={ NotFoundPage } />
    </Switch>
  );
}
