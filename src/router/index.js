import React from 'react';
import {
  HashRouter, Switch, Route, Redirect
} from 'react-router-dom';
import AppRoutes from '../constants/app-routes.constants';

const Home = React.lazy(() => Promise.resolve(import('../containers/Home')));
const ViewPokemon = React.lazy(()=> Promise.resolve(import('../containers/Pokemon')));
const PokemonTypes = React.lazy(()=> Promise.resolve(import('../containers/Types')));
const Whoops404 = React.lazy(()=> Promise.resolve(import('../containers/Whoops404')));

function Router() {
  return (
      <HashRouter>
          <React.Suspense fallback={<div>loading page...</div>} >
              <Switch>
                  <Route exact path={AppRoutes.HOME_REDIRECT} render={() => <Redirect to={AppRoutes.HOME} />} />
                  <Route component={Home} path={AppRoutes.HOME} />
                  <Route component={PokemonTypes} path={AppRoutes.POKEMON_TYPES} />
                  <Route component={ViewPokemon} path={AppRoutes.VIEW_POKEMON_ID} />
                  <Route component={Whoops404} />
              </Switch>
          </React.Suspense>
      </HashRouter>
  );
}

export default Router;
