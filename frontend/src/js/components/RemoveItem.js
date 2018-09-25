import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/portfolio.css';
import '../../css/removeitem.css';
import * as PortfolioActions from '../actions/PortfolioActions';

class RemoveItem extends Component {
  constructor() {
    super();
    this.state = {
      showRemoveForm: false,
      id: ''
    };
  }

  toggleRemoveForm = () => {
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
    return(val ? 'dropdown show' : 'dropdown hide');
  }


  hasError(val) {
    return(val ? 'dropdown show' : 'dropdown hide');
  }

  handleUserInput = name => event => {
    this.setState({[name]: event.target.value});
  }

  render() {
    const { showRemoveForm, id } = this.state;
    const isEnabled = !(isNaN(id) || id < 0);
    const hasError = isEnabled ? '' : 'invalid-value';

    return (
      <div className='remove-item'>
        <div className='dropdown-trigger' onClick={this.toggleRemoveForm}>
          Remove item
        </div>

        <div className={this.showForm(showRemoveForm)}>
          <form id='remove_item_form' className="formGroup">
            <div className='leftcell'>
              ID:
            </div>
            <div className='rightcell'>
              <input
                id='item_id'
                type='text'
                value={id}
                className={hasError}
                onChange={this.handleUserInput('id')} />
            </div>
          </form>
          <button disabled={isEnabled} onClick={this.removeItem}>Remove item with ID</button>
        </div>
      </div>
    );
  }
}

export default RemoveItem;
