import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { userLogOut } from '../../redux/actions/auth';
import { addBlogArr } from '../../redux/actions/blogs';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    // if logout button click remove, login token from local storage
    this.props.dispatch(addBlogArr([]));
    this.props.dispatch(userLogOut());
    localStorage.removeItem('loginToken');
  }

  render() {
    return (
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='title' color='inherit'>
                <Link to="/dashboard" className='my-blog-title'>
                  Agro Market
                </Link>
              </Typography>
              {this.props.auth.loggedIn ?
                (
                  window.location.pathname === '/' ?
                    (
                      <Link to="/user/login" className='login-button'>
                        <Button color='inherit'>Login</Button>
                      </Link>
                    ) :
                    (
                      <a className='logout-button'>
                        <Button onClick={this.handleLogout} color='inherit'>logout</Button>
                      </a>
                    )
                )
                :
                (
                  <Link to="/user/login" className='login-button'>
                    <Button color='inherit'>Login</Button>
                  </Link>
                )
              }
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header);