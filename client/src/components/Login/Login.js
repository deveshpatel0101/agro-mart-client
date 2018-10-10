import React from 'react';
import './Login.css';
import validator from 'validator';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { postLoginData } from '../../controllers/loginController';
import { userLogin } from '../../redux/actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: false,
      errorPassword: false,
      errorEmailText: null,
      errorPasswordText: null,
      id: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(e) {
    const temp = e.target.value;
    this.setState(() => ({ email: temp, errorEmail: false }));
  }

  handlePasswordChange(e) {
    const temp = e.target.value;
    this.setState(() => ({ password: temp, errorPassword: false }));
  }

  handleSubmit(e) {
    // will show errors depending on values of text fields and if everything is perfect dispatch user login
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    if (!validator.isEmail(email)) {
      this.setState(() => ({ errorEmail: true, errorEmailText: 'Please input valid email.' }));
    } else if (password === '') {
      this.setState(() => ({ errorPassword: true, errorPasswordText: 'Password is required' }));
    } else {
      // send login data to server
      postLoginData({ email, password }).then(res => {
        if (res.error === 'wrong password') {
          this.setState(() => ({ errorPassword: true, errorPasswordText: res.error }));
        } else if (res.error === 'user does not exist') {
          this.setState(() => ({ errorEmail: true, errorEmailText: res.error }));
        } else { // successful login
          console.log(res.token);
          const id = window.location.search.split('=')[1];
          localStorage.setItem('loginToken', res.token);
          if (id) {
            this.setState(() => ({ id: id }));
          }
          this.props.dispatch(userLogin());
        }
      });
    }
  }

  render() {
    return (
      <div className='login-form'>
        <form method='POST' onSubmit={this.handleSubmit}>

          <div className='email-field'>
            <TextField
              id="email"
              label="Email"
              margin="normal"
              name='email'
              fullWidth
              helperText={this.state.errorEmail ? this.state.errorEmailText : null}
              error={this.state.errorEmail ? true : false}
              onChange={this.handleEmailChange}
              value={this.state.email}
            />
          </div>

          <div className='password-field'>
            <TextField
              id="password-input"
              label="Password"
              error={this.state.errorPassword ? true : false}
              type="password"
              margin="normal"
              name='password'
              onChange={this.handlePasswordChange}
              helperText={this.state.errorPassword ? this.state.errorPasswordText : null}
              fullWidth
              value={this.state.password}
            />
          </div>

          <div className='form-login-button'>
            <Button size="small" variant='outlined' fullWidth type='submit'>
              Login
            </Button>
          </div>

          <div className='new-user'>
            <Link to='/user/register'>
              <Button size="small" variant='outlined' fullWidth>
                Sign up
              </Button>
            </Link>
          </div>

          <div className='third-party-login'>
            <a href='/auth/google'>
              <Button size="small" variant='outlined' fullWidth>
                <img alt='google logo' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkMxMDc7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzMy42NTIzNDQgMzIuNjU2MjUgMjkuMjIyNjU2IDM2IDI0IDM2IEMgMTcuMzcxMDk0IDM2IDEyIDMwLjYyODkwNiAxMiAyNCBDIDEyIDE3LjM3MTA5NCAxNy4zNzEwOTQgMTIgMjQgMTIgQyAyNy4wNTg1OTQgMTIgMjkuODQzNzUgMTMuMTUyMzQ0IDMxLjk2MDkzOCAxNS4wMzkwNjMgTCAzNy42MTcxODggOS4zODI4MTMgQyAzNC4wNDY4NzUgNi4wNTQ2ODggMjkuMjY5NTMxIDQgMjQgNCBDIDEyLjk1MzEyNSA0IDQgMTIuOTUzMTI1IDQgMjQgQyA0IDM1LjA0Njg3NSAxMi45NTMxMjUgNDQgMjQgNDQgQyAzNS4wNDY4NzUgNDQgNDQgMzUuMDQ2ODc1IDQ0IDI0IEMgNDQgMjIuNjYwMTU2IDQzLjg2MzI4MSAyMS4zNTE1NjMgNDMuNjA5Mzc1IDIwLjA4MjAzMSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkYzRDAwOyIgZD0iTSA2LjMwNDY4OCAxNC42OTE0MDYgTCAxMi44Nzg5MDYgMTkuNTExNzE5IEMgMTQuNjU2MjUgMTUuMTA5Mzc1IDE4Ljk2MDkzOCAxMiAyNCAxMiBDIDI3LjA1ODU5NCAxMiAyOS44NDM3NSAxMy4xNTIzNDQgMzEuOTYwOTM4IDE1LjAzOTA2MyBMIDM3LjYxNzE4OCA5LjM4MjgxMyBDIDM0LjA0Njg3NSA2LjA1NDY4OCAyOS4yNjk1MzEgNCAyNCA0IEMgMTYuMzE2NDA2IDQgOS42NTYyNSA4LjMzNTkzOCA2LjMwNDY4OCAxNC42OTE0MDYgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzRDQUY1MDsiIGQ9Ik0gMjQgNDQgQyAyOS4xNjQwNjMgNDQgMzMuODU5Mzc1IDQyLjAyMzQzOCAzNy40MTAxNTYgMzguODA4NTk0IEwgMzEuMjE4NzUgMzMuNTcwMzEzIEMgMjkuMjEwOTM4IDM1LjA4OTg0NCAyNi43MTQ4NDQgMzYgMjQgMzYgQyAxOC43OTY4NzUgMzYgMTQuMzgyODEzIDMyLjY4MzU5NCAxMi43MTg3NSAyOC4wNTQ2ODggTCA2LjE5NTMxMyAzMy4wNzgxMjUgQyA5LjUwMzkwNiAzOS41NTQ2ODggMTYuMjI2NTYzIDQ0IDI0IDQ0IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMxOTc2RDI7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzNC41MTE3MTkgMzAuMjM4MjgxIDMzLjA3MDMxMyAzMi4xNjQwNjMgMzEuMjE0ODQ0IDMzLjU3MDMxMyBDIDMxLjIxODc1IDMzLjU3MDMxMyAzMS4yMTg3NSAzMy41NzAzMTMgMzEuMjE4NzUgMzMuNTcwMzEzIEwgMzcuNDEwMTU2IDM4LjgwODU5NCBDIDM2Ljk3MjY1NiAzOS4yMDMxMjUgNDQgMzQgNDQgMjQgQyA0NCAyMi42NjAxNTYgNDMuODYzMjgxIDIxLjM1MTU2MyA0My42MDkzNzUgMjAuMDgyMDMxIFogIj48L3BhdGg+PC9nPjwvc3ZnPg==" />
                Sign in with google
              </Button>
            </a>
          </div>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Login);