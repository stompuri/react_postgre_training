import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

const baseURL = 'http://localhost:9000/api';

class ListStore extends EventEmitter {
  constructor() {
    super();
    this.list = [];
    this.loading = false;
    console.log("ListStore constructed, calling updateList");
    this.updateList();
  }

  async updateList() {
    this.loading = true;
    const _this = this;
    const uri = encodeURI(`${baseURL}/getAll`);
    console.log("ListStore - updateList called with: " + uri);
    try {
      fetch(uri)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          const mapped_list = json.map(item => {
            return {id:item.id, name:item.name}
          });
          console.log("list updated, sending change event");
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
    this.emit("change");
  }

  listActionFailed() {
    console.log("List action failed!");
    this.loading = false;
  }

  async addItem(name) {
    console.log("ListStore.js - addItem with name: " + name);
    this.loading = true;
    const _this = this;
    if (name) {
      const uri = encodeURI(`${baseURL}/addItem?name=${name}`);
      try {
        fetch(uri)
          .then((response) => {
            switch (response.status) {
              case 200:
                console.log("Success! Item was added");
                _this.updateList();
                return response.json();
              case 500:
                throw new Error("Failed! Could not add the item");
              default:
                throw new Error("Failed to add the item. Something went wrong.");
            }
          })
          .catch((error) => {
            console.error(error);
            _this.listActionFailed();
          })
          .then((json) => {
            console.log(json);
          })
      } catch (error) {
        console.error(error);
        _this.listActionFailed();
      }
    } else {
      _this.listActionFailed();
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
                console.log("Success! Item was removed");
                _this.updateList();
                return response.json();
              case 500:
                throw new Error("Failed! Could not remove the item");
              default:
                throw new Error("Failed to remove the item. Something went wrong.");
            }
          })
          .catch((error) => {
            console.error(error);
            _this.listActionFailed();
          })
          .then((json) => {
            console.log(json);
          })
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
    console.log("ListStore received an action", action.type);
    switch(action.type) {
      case "UPDATE_LIST":
        this.updateList();
        break;
      case "LIST_UPDATED":
        this.listUpdated();
        break;
      case "LIST_ACTION_FAILED":
        this.listActionFailed();
        break;
      case "ADD_ITEM":
        this.addItem(action.name);
        break;
      case "DELETE_ITEM":
        this.removeItem(action.id);
        break;
      default:
        console.log("No action defined for '" + action.type + "'");
        break;
    }
  }
}

const listStore = new ListStore();
dispatcher.register(listStore.handleActions.bind(listStore));

export default listStore;
