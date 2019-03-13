import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FinalHome from './components/FinalHome/FinalHome';
import FinalDashboard from './components/FinalDashboard/FinalDashboard';
import FinalCreate from './components/FinalCreate/FinalCreate';
import FinalLogin from './components/FinalLogin/FinalLogin';
import FinalRegister from './components/FinalRegister/FinalRegister';
import Shared from './components/Shared/Shared';
import Error404 from './components/Error404/Error404';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/' component={FinalHome} exact={true} />
            <Route path='/dashboard' component={FinalDashboard} />
            <Route path='/user/login' component={FinalLogin} />
            <Route path='/user/register' component={FinalRegister} />
            <Route path='/create' component={FinalCreate} />
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