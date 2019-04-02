import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeWrapper from './components/HomeWrapper/HomeWrapper';
import DashboardWrapper from './components/DashboardWrapper/DashboardWrapper';
import CreateWrapper from './components/CreateWrapper/CreateWrapper';
import LoginWrapper from './components/LoginWrapper/LoginWrapper';
import RegisterWrapper from './components/RegisterWrapper/RegisterWrapper';
import Shared from './components/Shared/Shared';
import Error404 from './components/Error404/Error404';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={HomeWrapper} exact={true} />
            <Route path='/dashboard' component={DashboardWrapper} />
            <Route path='/user/login' component={LoginWrapper} />
            <Route path='/user/register' component={RegisterWrapper} />
            <Route path='/create' component={CreateWrapper} />
            <Route path='/public/shared' component={Shared} />
            <Route path='/error' component={Error404} />
            {/* Redirect to /error if some error occurs fetching */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
