import React, { Fragment } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';

class FinalHome extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
}

export default FinalHome;