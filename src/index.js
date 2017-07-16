import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import modules from './modules';
import { Home } from './components';

const store = createStore(modules);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Home} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
