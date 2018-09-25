import dispatcher from '../dispatcher';

export function login() {
  dispatcher.dispatch({
    type: 'LOG_IN'
  });
}

export function logout() {
  dispatcher.dispatch({
    type: 'LOG_OUT'
  });
}
