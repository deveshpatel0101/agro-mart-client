import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import './FinalLogin.css';

import Header from '../Header/Header';
import Login from '../Login/Login';
import { userLogin, userLogOut } from '../../redux/actions/auth';
import { getBlogsFromDb } from '../../controllers/getBlogs';

class FinalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
      id: ''
    }
  }

  componentWillMount() {
    const id = window.location.search.split('=')[1];
    if (id) this.setState(() => ({ id }));
    // get blogs from server
    getBlogsFromDb().then(res => {
      if (res.tokenStatus === 'invalid' || res.error) { // if error or invalid token status render login page, user is logged out
        this.props.dispatch(userLogOut());
        this.setState(() => ({ verifying: false }));
      } else { // else redirect to dashboard page, user is already logged in
        this.props.dispatch(userLogin());
        this.setState(() => ({ verifying: false }));
      }
    });
  }

  render() {
    return (
      this.state.verifying ?
        (
          <Fragment>
            <Header />
            <LinearProgress />
          </Fragment>
        ) :
        (
          this.props.auth.loggedIn ?
            <Redirect to={this.state.id !== '' ? `/create?id=${this.state.id}` : '/dashboard'} /> :
            (
              <Fragment>
                <Header />
                <Login />
              </Fragment>
            )
        )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(FinalLogin);