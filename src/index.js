import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import modules from './modules';

const store = createStore(modules);

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(<App store={store} />, document.getElementById('root'));
