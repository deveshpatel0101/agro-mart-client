import React, { Fragment } from 'react';
import './FinalCreate.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import Header from '../Header/Header';
import Create from '../Create/Create';
import { addBlogArr } from '../../redux/actions/blogs';
import { getBlogsFromDb } from '../../controllers/getBlogs';
import { userLogOut, userLogin } from '../../redux/actions/auth';

class FinalCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
      id: ''
    }
  }

  componentWillMount() {
    // if id field exist in url, if so set id in local state
    const id = window.location.search.split('=')[1];
    if (id) this.setState(() => ({ id }));
    // if id exists and blogs length is not zero get all user blogs from server
    if (id && !this.props.blogs.length > 0) { // page was refreshed
      getBlogsFromDb().then(res => {
        if (res.error || res.tokenStatus === 'invalid') { // if token invalid dispatch userlogout action
          this.setState(() => ({ verifying: false }));
          this.props.dispatch(userLogOut());
        } else { // else dispatch userlogin action
          this.props.dispatch(userLogin());
          this.props.dispatch(addBlogArr(res.blogs));
          this.setState(() => ({ verifying: false }));
        }
      });
    } else if (!this.props.blogs.length > 0) { // id does not exist and create page was refreshed
      getBlogsFromDb().then(res => {
        if (res.tokenStatus === 'invalid' || res.error) { // if token invalid dispatch userlogout action
          this.props.dispatch(userLogOut());
          this.setState(() => ({ verifying: false }));
        } else {
          this.props.dispatch(userLogin());
          this.setState(() => ({ verifying: false }));
        }
      });
    } else { // user was redirected to create route to create new blog
      this.setState(() => ({ verifying: false }));
    }
  }

  render() {
    return (
      <Fragment>
        <Header />
        {this.state.verifying ? (<LinearProgress />) : (this.props.auth.loggedIn ? (<Create />) : (<Redirect to={{ pathname: '/user/login', search: this.state.id !== '' ? `?id=${this.state.id}` : '' }} />))}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(FinalCreate);