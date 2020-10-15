import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from './store';
import Router from './router';
import { ResponsivenessProvider } from './contexts/responsiveness';
import './styles/reset.scss';
// import './index.css';

/**
 * @name ReactJsBoilerplate
 * @author ayman smimah
 * @version 1.0.0
 * @host netlify
 * @technologies react v16, redux v4, webpack v4, gulp v4, eslint v7
 * @env node >= 8.0.0 , npm >= 6.0.0
 */

window.addEventListener('load', renderApp);

function renderApp() {
  const helmetContext = {};
  const store = configureStore();
  ReactDOM.render(
      <React.StrictMode>
          <HelmetProvider context={helmetContext} >
              <StoreProvider store={store} >
                  <ResponsivenessProvider>
                      <Router />
                  </ResponsivenessProvider>
              </StoreProvider>
          </HelmetProvider>
      </React.StrictMode>,
      document.getElementById('app')
  );
}
