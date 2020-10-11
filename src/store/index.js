import {createStore, applyMiddleware  } from 'redux';
import reducers from './reducers';



const logger= store => next => action => {
   let result;
   console.groupCollapsed("dispatching", action.type);
   console.log('prev state', store.getState());
   console.log('action', action);
   result = next(action);
   console.log('next state', store.getState());
   console.groupEnd();
}

export const configureStore = () => {
         // const preloadedState = { pokemons: {} }
         //const middlewares= [logger]
         return applyMiddleware(logger)(createStore)(reducers)
}