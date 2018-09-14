import React, { Component } from 'react';
import '../../css/App.css';
import * as ListActions from '../actions/ListActions';

class AddItem extends Component {
  addItem() {
    const name = document.getElementById('item_name').value;
    if (!name) {
      console.log("action for empty form");
    } else {
      document.getElementById('item_name').value = "";
      ListActions.addItem(name);
    }
  }

  render() {
    return (
      <div>
        <input id="item_name" type="text" />
        <button onClick={this.addItem}>Add item</button>
      </div>
    );
  }
}

export default AddItem;
