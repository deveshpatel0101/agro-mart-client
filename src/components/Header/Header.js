import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { userLogOut } from '../../redux/actions/user';
import { addItemsArr } from '../../redux/actions/items';

class Header extends React.Component {
  handleLogout = () => {
    // if logout button click remove, login token from local storage
    this.props.dispatch(addItemsArr([]));
    this.props.dispatch(userLogOut());
    localStorage.removeItem('loginToken');
  };

  render() {
    return (
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='body1' color='inherit'>
                <Link to='/' className='my-item-title'>
                  Agro Mart
                </Link>
              </Typography>
              <span className='header-buttons'>
                {this.props.auth ? (
                  <span className='logout-button'>
                    <Button onClick={this.handleLogout} color='inherit'>
                      Logout
                    </Button>
                  </span>
                ) : (
                  <span>
                    <Link to='/search' className='search-button'>
                      <Button color='inherit'>Search</Button>
                    </Link>
                    <Link to='/user/login' className='login-button'>
                      <Button color='inherit'>Login</Button>
                    </Link>
                  </span>
                )}
              </span>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.auth,
  };
};

export default connect(mapStateToProps)(Header);
