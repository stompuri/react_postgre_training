import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

const baseURL = 'http://localhost:9000/api';

class LoginStore extends EventEmitter {
  constructor() {
    super();
    this.user = {};
    this.loggedIn = false;
    this.loading = false;
  }

  login() {
    console.log("Logged in");
    this.loggedIn = true;
    this.loading = false;
    this.emit('change');
  }

  logout() {
    console.log("Logged out");
    this.loggedIn = false;
    this.loading = false;
    this.emit('change');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  handleActions(action) {
    switch(action.type) {
    case 'LOG_IN':
      this.login();
      break;
    case 'LOG_OUT':
      this.logout();
      break;
    default:
      console.error('<LoginStore> No action defined for "' + action.type + '"');
      break;
    }
  }
}

const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;
