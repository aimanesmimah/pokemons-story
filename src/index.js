import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
//import BaseContainer from './containers/BaseContainer';
//import Sidebar from './Sidebar';
//import Notes from './Notes';
import createStore from './store';
//import '@/styles/main.scss';

/**
 * @name ReactJsBoilerplate
 * @author ayman smimah
 * @version 1.0.0
 * @host netlify
 * @technologies react 16, redux 4, webpack 4, gulp 4, eslint 7
 * @env node >= 8.0.0 , npm >= 6.0.0
 */

window.addEventListener('load', render);

function render() {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    throw new Error("Can't find container");
  }

  const app = (
      <Provider store={createStore()}>
          <div>react boilerplate</div>
      </Provider>
  );

  ReactDom.render(app, appContainer);
}
