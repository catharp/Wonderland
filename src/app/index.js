import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from '../components';
import { Provider } from 'react-redux';
import React from 'react';

export default (store) => {
  console.log('in app...');
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </Provider>
  );
};
