import React, { Fragment } from 'react';
import './CreateWrapper.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import Header from '../Header/Header';
import Create from '../Create/Create';
import { addBlogArr } from '../../redux/actions/blogs';
import { getBlogsFromDb } from '../../controllers/getBlogs';
import { userLogOut, userLogin } from '../../redux/actions/auth';

class CreateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
      id: '',
    };
  }

  getBlogs = () => {
    getBlogsFromDb().then((res) => {
      if (res.error) {
        // if token invalid dispatch userlogout action
        this.props.dispatch(userLogOut());
        this.setState({ verifying: false });
      } else {
        // else dispatch userlogin action
        this.props.dispatch(userLogin());
        this.props.dispatch(addBlogArr(res.blogs));
        this.setState({ verifying: false });
      }
    });
  };

  componentWillMount() {
    // if id field exist in url, if so set id in local state
    const id = window.location.search.split('=')[1];
    if (id) this.setState({ id });
    // if id exists and blogs length is not zero get all user blogs from server
    if (id && !this.props.auth.loggedIn) {
      // page was refreshed
      this.getBlogs();
    } else {
      // user was redirected to create route to create new blog
      if (!this.props.auth.loggedIn) {
        this.getBlogs();
      } else {
        this.setState({ verifying: false });
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Header />
        {this.state.verifying ? (
          <LinearProgress />
        ) : this.props.auth.loggedIn ? (
          <Create />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              search: this.state.id !== '' ? `?id=${this.state.id}` : '',
            }}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(CreateWrapper);
