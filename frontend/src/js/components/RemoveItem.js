import React, { Component } from 'react';
import '../../css/App.css';
import * as PortfolioActions from '../actions/PortfolioActions';

class RemoveItem extends Component {
  constructor() {
    super();
    this.state = {
      showRemoveForm: false
    };
    this.toggleRemoveForm = this.toggleRemoveForm.bind(this);
  }

  toggleRemoveForm() {
    var show = false;
    if (!this.state.showRemoveForm) {
      show = true;
    }
    this.setState({showRemoveForm: show});
  }

  async removeItem() {
    const id = document.getElementById('item_id').value;
    if (!id) {
      console.log('action for empty form');
    } else {
      document.getElementById('item_id').value = '';
      PortfolioActions.deleteItem(id);
    }
  }

  showForm(val) {
    return(val ? '' : 'hide');
  }

  render() {
    const { showRemoveForm } = this.state;

    return (
      <div className='container'>
        { showRemoveForm &&
          <div className='dropdown' onClick={this.toggleRemoveForm}>
            Hide Remove Form
          </div>
        }
        { !showRemoveForm &&
          <div className='dropdown' onClick={this.toggleRemoveForm}>
            Show Remove Form
          </div>
        }

        <div className={this.showForm(showRemoveForm)}>
          <div className='formGroup'>
            <input id='item_id' type='text' />
            <button onClick={this.removeItem}>Remove item with ID</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RemoveItem;
