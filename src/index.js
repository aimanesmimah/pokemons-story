import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async' ;
import { Provider as StoreProvider } from 'react-redux' ;
import { configureStore } from './store' ;
import Router from './router';
import './styles/reset.scss';
//import './index.css';

/**
 * @name ReactJsBoilerplate
 * @author ayman smimah
 * @version 1.0.0
 * @host netlify
 * @technologies react 16, redux 4, webpack 4, gulp 4, eslint 7
 * @env node >= 8.0.0 , npm >= 6.0.0
 */


window.addEventListener('load',renderApp)

function renderApp(){
  const helmetContext= {}
  const store= configureStore()
  ReactDOM.render(
    <React.StrictMode>
      <HelmetProvider context={helmetContext} >
              <StoreProvider store={store} >
                  <Router />
              </StoreProvider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('app')
  );
}
