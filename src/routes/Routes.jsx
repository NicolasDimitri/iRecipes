import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={}/>
      <Route exact path='/foods' component={}/>
      <Route exact path='/drinks' component={}/>
      <Route exact path='/foods:id' component={}/>
      <Route exact path='/drinks:id' component={}/>
      <Route exact path='/foods:id/in-progress' component={}/>
      <Route exact path='/explore' component={}/>
      <Route exact path='/explore/foods' component={}/>
      <Route exact path='/explore/drinks' component={}/>
      <Route exact path='/explore/foods/ingredients' component={}/>
      <Route exact path='/explore/drinks/ingredients' component={}/>
      <Route exact path='/explore/foods/nationalities' component={}/>
      <Route exact path='/profile' component={}/>
      <Route exact path='/done-recipes' component={}/>
      <Route exact path='/favorite-recipes' component={}/>
    </Switch>
  );
}
