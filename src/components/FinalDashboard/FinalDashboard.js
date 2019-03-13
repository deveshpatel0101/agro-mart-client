import React, { Fragment } from 'react';
import './FinalDashboard.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import { getBlogsFromDb } from '../../controllers/getBlogs';
import { addBlogArr } from '../../redux/actions/blogs';
import { userLogin, userLogOut } from '../../redux/actions/auth';

class FinalDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true
    }
  }

  componentWillMount() {
    if (!this.props.auth.loggedIn) {
      // get blogs from server
      getBlogsFromDb().then(res => {
        if (res.error || res.tokenStatus === 'invalid') { // if token invalid dispatch userlogout action
          this.props.dispatch(userLogOut());
          this.setState(() => ({ verifying: false }));
        } else { // else token was valid and dispatch userlogin action
          this.props.dispatch(userLogin());
          this.setState(() => ({ verifying: false }));
          this.props.dispatch(addBlogArr(res.blogs));
        }
      });
    } else {
      this.setState(() => ({ verifying: false }));
    }
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
        (this.props.auth.loggedIn ?
          (
            <Fragment>
              <Header />
              <Dashboard />
            </Fragment>
          ) :
          (
            <Redirect to='/user/login' />
          )
        )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(FinalDashboard);