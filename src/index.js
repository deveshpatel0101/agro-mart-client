import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './redux/store/configureStore';

const store = configureStore();

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function() {
  });
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
