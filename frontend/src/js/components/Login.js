import React, { Component } from 'react';
import LoginStore from '../stores/LoginStore';
import * as LoginActions from '../actions/LoginActions';
import '../../css/App.css';
import '../../css/login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      showLoginForm: false,
      loggedIn: false,
      loginValid: 'true'
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleLoginForm = ()  => {
    var show = false;
    if (!this.state.showLoginForm) {
      show = true;
    }
    this.setState({showLoginForm: show});
  }

  login() {
    try {
      LoginActions.login();
      this.setState({
        showLoginForm: false,
        loggedIn: true
      });
    } catch (e) {
      console.error("Failed to log in!");
    }
  }

  logout() {
    try {
      LoginActions.logout();
      this.setState({loggedIn: false});
    } catch (e) {
      console.error("Failed to log in!");
    }
  }

  render() {
    const {
      showLoginForm,
      loggedIn,
      loginValid
    } = this.state;
    const showForm = showLoginForm ? !loggedIn ? 'dropdown show' : 'dropdown hide' : 'dropdown hide';
    const isValid = loginValid ? '' : 'invalid-value';

    return (
      <div className='login-container'>
        { loggedIn &&
          <div className='dropdown-trigger' onClick={this.logout}>
            Log out
          </div>
        }
        { !loggedIn &&
          <div className='dropdown-trigger' onClick={this.toggleLoginForm}>
            Login
          </div>
        }

        <div className={showForm}>
          <form id='login-form' className="formGroup">
          <div className='leftcell'>
            Username:
          </div>
          <div className='rightcell'>
            <input
              id='login_username'
              type='text'
              className={isValid} />
          </div>
          <div className='leftcell'>
            Password:
          </div>
          <div className='rightcell'>
            <input
              id='login_password'
              type='password'
              className={isValid} />
          </div>
          </form>

          <button onClick={this.login}>Log in</button>
        </div>
      </div>
    );
  }
}

export default Login;
