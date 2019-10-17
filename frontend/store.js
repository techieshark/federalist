/* global window */
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import { reroute, createNotifier } from './middleware';
import { notificationSettings } from './util/notificationSettings';

export const history = createBrowserHistory();

const reducer = (history) => combineReducers({
  ...reducers,
  router: connectRouter(history),
});

// FRONTEND_CONFIG is a global variable rendered into the index
// template by the Main controller. We use it to initialize our
// store's state with configuration values from the server-side.
const FRONTEND_CONFIG = typeof window !== 'undefined'
  ? window.FRONTEND_CONFIG
  : global.FRONTEND_CONFIG;

const middlewares = [
  reroute,
  createNotifier(notificationSettings),
];

const enhancers = [
  applyMiddleware(routerMiddleware(history)),
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
  enhancers.unshift(composeWithDevTools);
}

const store = createStore(
  reducer(history),
  { FRONTEND_CONFIG },
  compose(...enhancers)(...middlewares)
);

const dispatch = store.dispatch;

export { dispatch };
export default store;
