import React, { Fragment } from 'react';
import './RegisterWrapper.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import Register from '../Register/Register';
import { userLogin, userLogOut } from '../../redux/actions/auth';
import { getBlogsFromDb } from '../../controllers/getBlogs';
import { LinearProgress } from '@material-ui/core';
import { addBlogArr } from '../../redux/actions/blogs';

class RegisterWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
    };
  }

  componentWillMount() {
    getBlogsFromDb().then((res) => {
      if (res.error) {
        // invalid token status or error in response of server
        this.props.dispatch(userLogOut());
        this.setState({ verifying: false });
      } else {
        // valid token and user is already logged in
        this.props.dispatch(userLogin());
        this.props.dispatch(addBlogArr(res.blogs));
        this.setState({ verifying: false });
      }
    });
  }

  render() {
    return this.state.verifying ? (
      <Fragment>
        <Header />
        <LinearProgress />
      </Fragment>
    ) : this.props.auth.loggedIn ? (
      <Redirect to='/dashboard' />
    ) : (
      <Fragment>
        <Header />
        <Register />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(RegisterWrapper);
