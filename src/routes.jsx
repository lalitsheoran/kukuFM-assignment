import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Branches from './components/Branches';
import Favourites from './components/Favourites';
import Visit from './components/Visit';

function Routes() {
  return (
    <>
    <Switch>
    <Route path="/" exact render={() => <Branches />} />
    <Route path="/favourites" exact render={() => <Favourites />} />
    <Route path="/visit/:id" exact render={(props) => <Visit {...props} />} />


    </Switch>
    </>
  );
}

export default Routes;