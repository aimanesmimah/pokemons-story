import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from './store';
import Router from './router';
import ErrorBoundary from './components/Errorboundary';
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

window.addEventListener('load', function(){
  renderApp()
  registerSW()
});

function renderApp() {
  const helmetContext = {};
  const store = configureStore();
  ReactDOM.render(
      <React.StrictMode>
          <HelmetProvider context={helmetContext} >
              <StoreProvider store={store} >
                  <ErrorBoundary>
                        <ResponsivenessProvider>
                            <Router />
                        </ResponsivenessProvider>
                  </ErrorBoundary>
              </StoreProvider>
          </HelmetProvider>
      </React.StrictMode>,
      document.getElementById('app')
  );
}

function registerSW(){
    if(process.env.NODE_ENV === 'production')
        if('serviceWorker' in navigator){
            navigator.serviceWorker.register('/service-worker.js')
               .then(registration => {
                 console.log('service worker registration',registration)
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker == null) {
                      return;
                    }
                    installingWorker.onstatechange = () => {
                      if (installingWorker.state === 'installed') {
                        /*if (navigator.serviceWorker.controller) {
                          const config= {}
                          if (config && config.onUpdate) {
                            config.onUpdate(registration);
                          }
                        } else {
                          if (config && config.onSuccess) {
                            config.onSuccess(registration);
                          }
                        }*/
                      }
                    };
                  };
               })
               .catch(error => {
                    console.log('Registration error', error);
                });
        }
}
