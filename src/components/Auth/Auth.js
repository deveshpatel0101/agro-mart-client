import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Auth.css';

import Header from '../Header/Header';
import { LinearProgress } from '@material-ui/core';
import { getItemsFromDb } from '../../controllers/getItems';
import { addItemsArr } from '../../redux/actions/items';
import { userLogin } from '../../redux/actions/user';

const checkAuth = (WrappedComponent, route) => {
  class Auth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        validating: true,
      };
    }

    componentDidMount() {
      if (this.props.auth) {
        this.setState({ validating: false });
      } else if (localStorage.getItem('loginToken')) {
        getItemsFromDb().then((res) => {
          if (res.error) {
            // if error or invalid token status render login page, user is logged out
            this.setState({ verifying: false, validating: false });
          } else {
            // else redirect to dashboard page, user is already logged in
            this.props.dispatch(userLogin());
            this.props.dispatch(addItemsArr(res.items));
            this.setState({ verifying: false, validating: false });
          }
        });
      } else {
        this.setState({ validating: false });
      }
    }

    render() {
      // if user is authenticated and is on the login or register route, then redirect to dashboard
      // Note: the "userLogin" dispatch action will activate following condition and no need to redirect explicity in the login route
      if (
        !this.state.validating &&
        this.props.auth &&
        (route === 'login' || route === 'register')
      ) {
        return <Redirect to='/dashboard' />;
      }

      // if user is not authenticated and is on the route which requires authentication, then redirect to login
      if (
        !this.state.validating &&
        !this.props.auth &&
        !(route === 'login' || route === 'register')
      ) {
        return <Redirect to='/user/login' />;
      }

      // if user is not authenticated and is on the login or register route, then render the component
      if (
        !this.state.validating &&
        !this.props.auth &&
        (route === 'login' || route === 'register')
      ) {
        return (
          <React.Fragment>
            <Header route={route} />
            <WrappedComponent />
          </React.Fragment>
        );
      }

      // if user is authenticated and is on the route which requires authentication, then render the component
      return (
        <div className='Auth-Container'>
          <Header />
          {this.state.validating && <LinearProgress />}
          {!this.state.validating && this.props.auth && <WrappedComponent />}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.user.auth,
    };
  };

  return connect(mapStateToProps)(Auth);
};

export default checkAuth;
