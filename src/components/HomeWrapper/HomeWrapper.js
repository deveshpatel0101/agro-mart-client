import React, { Fragment } from 'react';
import './HomeWrapper.css';

import Header from '../Header/Header';
import Home from '../Home/Home';

class HomeWrapper extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

export default HomeWrapper;
