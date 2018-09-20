import React, { Component } from 'react';
import '../../css/App.css';
import * as PortfolioActions from '../actions/PortfolioActions';

class RemoveItem extends Component {
  async removeItem() {
    const id = document.getElementById('item_id').value;
    if (!id) {
      console.log('action for empty form');
    } else {
      document.getElementById('item_id').value = '';
      PortfolioActions.deleteItem(id);
    }
  }

  render() {
    return (
      <div className='formGroup'>
        <input id='item_id' type='text' />
        <button onClick={this.removeItem}>Remove item with ID</button>
      </div>
    );
  }
}

export default RemoveItem;
