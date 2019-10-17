/* global document:true */

import 'babel-polyfill';
import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { routerMiddleware } from 'connected-react-router'

import routes from './routes';
import store, { history } from './store';

import './sass/styles.scss';

const mainEl = document.querySelector('#js-app');

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  </Provider>
), mainEl);
