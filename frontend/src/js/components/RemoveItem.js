import React, { Component } from 'react';
import '../../css/App.css';
import * as ListActions from '../actions/ListActions';

class RemoveItem extends Component {
  async removeItem() {
    const id = document.getElementById('item_id').value;
    if (!id) {
      console.log("action for empty form");
    } else {
      document.getElementById('item_id').value = "";
      ListActions.deleteItem(id);
    }
  }

  render() {
    return (
      <div>
        <input id="item_id" type="text" />
        <button onClick={this.removeItem}>Remove item with ID</button>
      </div>
    );
  }
}

export default RemoveItem;
