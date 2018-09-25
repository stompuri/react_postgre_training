import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

const baseURL = 'http://localhost:9000/api';

class PortfolioStore extends EventEmitter {
  constructor() {
    super();
    this.list = [];
    this.loading = true;
    this.updateList();
  }

  async updateList() {
    this.loading = true;
    const _this = this;
    const uri = encodeURI(`${baseURL}/getAll`);
    try {
      fetch(uri)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          const mapped_list = json.map(item => {
            return {id:item.id, title:item.title};
          });
          _this.list = mapped_list;
          _this.listUpdated();
        });
    } catch (error) {
      console.error(error);
      _this.listActionFailed();
    }
  }

  listUpdated() {
    this.loading = false;
    this.emit('change');
  }

  PortfolioActionFailed() {
    console.log('Portfolio action failed!');
    this.loading = false;
  }

  async addItem(body) {
    this.loading = true;
    const _this = this;
    if (body) {
      const addRequest = new Request(baseURL + '/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      try {
        fetch(addRequest)
          .then((response) => {
            switch (response.status) {
            case 200:
              console.log('Success! Item was added');
              _this.updateList();
              return response.json();
            case 500:
              throw new Error('Failed! Could not add the item');
            default:
              throw new Error('Failed to add the item. Something went wrong.');
            }
          })
          .catch((error) => {
            console.error(error);
            _this.PortfolioActionFailed();
          })
          .then((json) => {
            console.log(json);
          });
      } catch (error) {
        console.error(error);
        _this.PortfolioActionFailed();
      }
    } else {
      _this.PortfolioActionFailed();
    }
  }

  async removeItem(id) {
    this.loading = true;
    const _this = this;
    if (id) {
      const uri = encodeURI(`${baseURL}/removeItem?id=${id}`);
      try {
        fetch(uri)
          .then((response) => {
            switch (response.status) {
            case 200:
              console.log('Success! Item was removed');
              _this.updateList();
              return response.json();
            case 500:
              throw new Error('Failed! Could not remove the item');
            default:
              throw new Error('Failed to remove the item. Something went wrong.');
            }
          })
          .catch((error) => {
            console.error(error);
            _this.listActionFailed();
          })
          .then((json) => {
            console.log(json);
          });
      } catch (error) {
        console.error(error);
        _this.listActionFailed();
      }
    } else {
      _this.listActionFailed();
    }
  }

  getAll() {
    return this.list;
  }

  getLoading() {
    return this.loading;
  }

  handleActions(action) {
    switch(action.type) {
    case 'UPDATE_LIST':
      this.updateList();
      break;
    case 'LIST_UPDATED':
      this.listUpdated();
      break;
    case 'LIST_ACTION_FAILED':
      this.listActionFailed();
      break;
    case 'ADD_ITEM':
      this.addItem(action.body);
      break;
    case 'DELETE_ITEM':
      this.removeItem(action.id);
      break;
    default:
      console.log('<PortfolioStore> No action defined for "' + action.type + '"');
      break;
    }
  }
}

const portfolioStore = new PortfolioStore();
dispatcher.register(portfolioStore.handleActions.bind(portfolioStore));

export default portfolioStore;
