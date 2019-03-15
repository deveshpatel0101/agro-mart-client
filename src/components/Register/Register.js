import React from 'react';
import './Register.css';
import validator from 'validator';
import { Redirect, Link } from 'react-router-dom';
import { TextField, Button, Radio, Typography } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';

import MessageSnackBar from '../MessageSnackBar/MessageSnackBar';
import { postSignupData } from '../../controllers/signupController';
import secrets from '../../secret';
import { googleAuth } from '../../controllers/googleAuthController';
import { addBlogArr } from '../../redux/actions/blogs';
import { userLogin } from '../../redux/actions/auth';
import { errorMessage, clearMessages, successMessage } from '../../redux/actions/message';

const regEx = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorEmail: false,
      errorPassword: false,
      errorConfirmPassword: false,
      errorName: false,
      errorNameText: 'Name should be atleast three characters long.',
      errorEmailText: 'Email should be valid',
      errorPasswordText: 'Password should be 6 characters long and should include atleast one uppercase letter or numeric character.',
      errorConfirmPasswordText: 'Both passwords should match.',
      redirect: false,
      typePerson: 'farmer',
      position: undefined,
      errorPosition: false,
      errorPositionText: 'Please enable location'
    }
  }

  handleNameChange = (e) => {
    const temp = e.target.value;
    this.setState(() => ({ name: temp, errorName: false }));
  }
  handleEmailChange = (e) => {
    const temp = e.target.value;
    this.setState(() => ({ email: temp, errorEmail: false }));
  }

  handleTypeChange = (e) => {
    if (e.target.value === 'customer') {
      this.setState(() => ({ typePerson: 'customer' }));
    } else {
      this.setState(() => ({ typePerson: 'farmer' }));
    }
  }

  handlePasswordChange = (e) => {
    const temp = e.target.value;
    this.setState(() => ({ password: temp, errorPassword: false }));
  }

  handleConfirmPasswordChange = (e) => {
    const temp = e.target.value;
    this.setState(() => ({ confirmPassword: temp, errorConfirmPassword: false }));
  }

  handleGeolocationClick = (e) => {
    let that = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        that.setState({ position: { latitude: position.coords.latitude, longitude: position.coords.longitude } })
      });
    } else {

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.pass0.value;
    const confirmPassword = e.target.elements.pass1.value;
    const personType = this.state.typePerson;
    const position = this.state.position;
    if (name.length < 3) {
      this.setState(() => ({ errorName: true }));
    } else if (!validator.isEmail(email)) {
      this.setState(() => ({ errorEmail: true }));
    } else if (!validator.matches(password, regEx)) {
      this.setState(() => ({ errorPassword: true }));
    } else if (password !== confirmPassword) {
      this.setState(() => ({ errorConfirmPassword: true }));
    } else {
      postSignupData({ username: name, email, password, confirmPassword, userType: personType, position }).then(res => {
        if (res.errorName) {
          this.setState(() => ({ errorName: true, errorNameText: res.errorMessage }));
        } else if (res.errorEmail) {
          this.setState(() => ({ errorEmail: true, errorEmailText: res.errorMessage }));
        } else if (res.errorConfirmPassword) {
          this.setState(() => ({ errorPassword: true, errorPasswordText: res.errorMessage }));
        } else if (res.errorPassword) {
          this.setState(() => ({ errorPassword: true, errorConfirmPasswordText: res.errorMessage }));
        } else if (res.errorPosition) {
          this.setState({ errorPosition: true });
        } else if (res.success) {
          this.props.dispatch(successMessage('User created! You can now login.', res.successMessage));
          this.setState(() => ({ redirect: true }));
        } else {
          this.props.dispatch(errorMessage('Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.', res.errorMessage))
          setTimeout(() => {
            this.props.dispatch(clearMessages())
          }, 8000);
        }
      });
    }
  }

  responseGoogle = (response) => {
    if (!this.state.position) {
      this.setState({ errorPosition: true });
      this.props.dispatch(errorMessage('We need to know your location in order to show your items to nearby cosumers.'));
      setTimeout(() => {
        this.props.dispatch(clearMessages())
      }, 8000);
    } else if (!response.error) {
      let user = {
        username: response.profileObj.name,
        email: response.profileObj.email,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        profileImage: response.profileObj.imageUrl,
        googleId: response.googleId,
        userType: this.state.typePerson,
        position: this.state.position
      }
      googleAuth(user).then(res => {
        if (!response.error) {
          localStorage.setItem('loginToken', res.jwtToken);
          this.props.dispatch(addBlogArr(res.blogs));
          this.props.dispatch(userLogin());
        } else {
          this.props.dispatch(errorMessage('Oops! Something went wrong. This might be an API error. Report the error here or try refreshing the page.', res.errorMessage))
          setTimeout(() => {
            this.props.dispatch(clearMessages())
          }, 8000);
        }
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={'/dashboard'} />
      )
    }
    return (
      this.state.redirect ?
        (
          <Redirect to='/user/login' />
        ) :
        (
          <div className='register-form'>
            <form method='POST' onSubmit={this.handleSubmit}>

              <div className='name-field'>
                <TextField
                  id="name"
                  label="Name"
                  margin="normal"
                  name='username'
                  onChange={this.handleNameChange}
                  value={this.state.name}
                  error={this.state.errorName}
                  helperText={this.state.errorName ? this.state.errorNameText : null}
                  fullWidth
                />
              </div>

              <div className='email-field'>
                <TextField
                  id="email"
                  label="Email"
                  margin="normal"
                  name='email'
                  onChange={this.handleEmailChange}
                  value={this.state.email}
                  error={this.state.errorEmail}
                  helperText={this.state.errorEmail ? this.state.errorEmailText : null}
                  fullWidth
                />
              </div>

              <div className='password-field-1'>
                <TextField
                  id="password-input-1"
                  label="Password"
                  type="password"
                  margin="normal"
                  name='pass0'
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                  error={this.state.errorPassword}
                  helperText={this.state.errorPassword ? this.state.errorPasswordText : null}
                  fullWidth
                />
              </div>

              <div className='password-field-2'>
                <TextField
                  id="password-input-2"
                  label="Confirm Password"
                  type="password"
                  margin="normal"
                  name='pass1'
                  onChange={this.handleConfirmPasswordChange}
                  value={this.state.confirmPassword}
                  error={this.state.errorConfirmPassword}
                  helperText={this.state.errorConfirmPassword ? this.state.errorConfirmPasswordText : false}
                  fullWidth
                />
              </div>

              <div className='mandatory-fields-alert'>
                <Typography variant="body2" gutterBottom>
                  Below two fields are mandatory even if you register with google.
                </Typography>
              </div>

              <div>
                <div>
                  <Radio
                    checked={this.state.typePerson === 'farmer'}
                    onChange={this.handleTypeChange}
                    value="farmer"
                    name="radio-button-demo"
                    aria-label="A"
                  /> Farmer
                </div>
                <div>
                  <Radio
                    checked={this.state.typePerson === 'customer'}
                    onChange={this.handleTypeChange}
                    value="customer"
                    name="radio-button-demo"
                    aria-label="A"
                  /> Customer
                </div>
              </div>

              <div className='enable-geolocation'>
                <Button size="small" onClick={this.handleGeolocationClick}>
                  <i className="fal fa-location"></i>Location
                </Button>
                &nbsp;&nbsp;
                <TextField
                  placeholder={'Geo-Location'}
                  className='geolocation-input'
                  error={this.state.errorPosition}
                  helperText={this.state.errorPosition ? this.state.errorPositionText : false}
                  value={this.state.position && `${this.state.position.latitude}, ${this.state.position.longitude}`}
                  margin="normal"
                />
              </div>

              <div className='register-new-user'>
                <Button size="small" variant='outlined' fullWidth type='submit'>
                  Sign up
                </Button>
              </div>

              <div className='register-form-login-button'>
                <Link to='/user/login'>
                  <Button size="small" variant='outlined' fullWidth>
                    Log In
                  </Button>
                </Link>
              </div>

              <div className='third-party-login'>
                <GoogleLogin
                  clientId={secrets.GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  render={renderProps => (
                    <Button onClick={renderProps.onClick} size="small" variant='outlined' fullWidth>
                      <img alt='google logo' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkMxMDc7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzMy42NTIzNDQgMzIuNjU2MjUgMjkuMjIyNjU2IDM2IDI0IDM2IEMgMTcuMzcxMDk0IDM2IDEyIDMwLjYyODkwNiAxMiAyNCBDIDEyIDE3LjM3MTA5NCAxNy4zNzEwOTQgMTIgMjQgMTIgQyAyNy4wNTg1OTQgMTIgMjkuODQzNzUgMTMuMTUyMzQ0IDMxLjk2MDkzOCAxNS4wMzkwNjMgTCAzNy42MTcxODggOS4zODI4MTMgQyAzNC4wNDY4NzUgNi4wNTQ2ODggMjkuMjY5NTMxIDQgMjQgNCBDIDEyLjk1MzEyNSA0IDQgMTIuOTUzMTI1IDQgMjQgQyA0IDM1LjA0Njg3NSAxMi45NTMxMjUgNDQgMjQgNDQgQyAzNS4wNDY4NzUgNDQgNDQgMzUuMDQ2ODc1IDQ0IDI0IEMgNDQgMjIuNjYwMTU2IDQzLjg2MzI4MSAyMS4zNTE1NjMgNDMuNjA5Mzc1IDIwLjA4MjAzMSBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojRkYzRDAwOyIgZD0iTSA2LjMwNDY4OCAxNC42OTE0MDYgTCAxMi44Nzg5MDYgMTkuNTExNzE5IEMgMTQuNjU2MjUgMTUuMTA5Mzc1IDE4Ljk2MDkzOCAxMiAyNCAxMiBDIDI3LjA1ODU5NCAxMiAyOS44NDM3NSAxMy4xNTIzNDQgMzEuOTYwOTM4IDE1LjAzOTA2MyBMIDM3LjYxNzE4OCA5LjM4MjgxMyBDIDM0LjA0Njg3NSA2LjA1NDY4OCAyOS4yNjk1MzEgNCAyNCA0IEMgMTYuMzE2NDA2IDQgOS42NTYyNSA4LjMzNTkzOCA2LjMwNDY4OCAxNC42OTE0MDYgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzRDQUY1MDsiIGQ9Ik0gMjQgNDQgQyAyOS4xNjQwNjMgNDQgMzMuODU5Mzc1IDQyLjAyMzQzOCAzNy40MTAxNTYgMzguODA4NTk0IEwgMzEuMjE4NzUgMzMuNTcwMzEzIEMgMjkuMjEwOTM4IDM1LjA4OTg0NCAyNi43MTQ4NDQgMzYgMjQgMzYgQyAxOC43OTY4NzUgMzYgMTQuMzgyODEzIDMyLjY4MzU5NCAxMi43MTg3NSAyOC4wNTQ2ODggTCA2LjE5NTMxMyAzMy4wNzgxMjUgQyA5LjUwMzkwNiAzOS41NTQ2ODggMTYuMjI2NTYzIDQ0IDI0IDQ0IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiMxOTc2RDI7IiBkPSJNIDQzLjYwOTM3NSAyMC4wODIwMzEgTCA0MiAyMC4wODIwMzEgTCA0MiAyMCBMIDI0IDIwIEwgMjQgMjggTCAzNS4zMDQ2ODggMjggQyAzNC41MTE3MTkgMzAuMjM4MjgxIDMzLjA3MDMxMyAzMi4xNjQwNjMgMzEuMjE0ODQ0IDMzLjU3MDMxMyBDIDMxLjIxODc1IDMzLjU3MDMxMyAzMS4yMTg3NSAzMy41NzAzMTMgMzEuMjE4NzUgMzMuNTcwMzEzIEwgMzcuNDEwMTU2IDM4LjgwODU5NCBDIDM2Ljk3MjY1NiAzOS4yMDMxMjUgNDQgMzQgNDQgMjQgQyA0NCAyMi42NjAxNTYgNDMuODYzMjgxIDIxLjM1MTU2MyA0My42MDkzNzUgMjAuMDgyMDMxIFogIj48L3BhdGg+PC9nPjwvc3ZnPg==" />
                      Sign up with Google
                    </Button>
                  )}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
              </div>

            </form>

            {this.props.message.errorMessage &&
              <MessageSnackBar
                show={this.props.message.errorMessage === '' ? false : true}
                message={this.props.message.errorMessage}
              />
            }

          </div>
        )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  };
}

export default connect(mapStateToProps)(Register);