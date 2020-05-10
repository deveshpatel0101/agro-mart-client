import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Shared from './components/Shared/Shared';
import Error404 from './components/Error404/Error404';
import MessageListener from './components/MessageListener/MessageListener';
import Search from './components/Search/Search';
import checkAuth from './components/Auth/Auth';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route
              path='/'
              render={() => (
                <React.Fragment>
                  <Header />
                  <Home />
                </React.Fragment>
              )}
              exact={true}
            />
            <Route path='/dashboard' component={checkAuth(Dashboard)} />
            <Route path='/user/login' component={checkAuth(Login, 'login')} />
            <Route path='/user/register' component={checkAuth(Register, 'register')} />
            <Route path='/create' component={checkAuth(Create)} />
            <Route path='/public/shared' component={Shared} />
            <Route path='/error' component={Error404} />
            <Route path='/search' component={Search} />
            {/* Redirect to /error if some error occurs fetching */}
          </Switch>
        </BrowserRouter>
        <MessageListener />
      </div>
    );
  }
}

export default App;
