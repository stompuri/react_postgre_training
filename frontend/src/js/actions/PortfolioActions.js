import dispatcher from '../dispatcher';

export function updateList() {
  dispatcher.dispatch({
    type: 'UPDATE_LIST'
  });
}

export function listUpdated() {
  dispatcher.dispatch({
    type: 'LIST_UPDATED'
  });
}

export function listUpdateFailed() {
  dispatcher.dispatch({
    type: 'LIST_ACTION_FAILED'
  });
}

export function addItem(body) {
  dispatcher.dispatch({
    type: 'ADD_ITEM',
    body,
  });
}

export function deleteItem(id) {
  dispatcher.dispatch({
    type: 'DELETE_ITEM',
    id,
  });
}
