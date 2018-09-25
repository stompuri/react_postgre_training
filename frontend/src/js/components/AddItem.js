import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/portfolio.css';
import '../../css/additem.css';
import * as PortfolioActions from '../actions/PortfolioActions';

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      year: '',
      title: '',
      lang: '',
      desc: '',
      platform: '',
      loc: '',
      imgUrl: '',
      link: '',
      yearValid: true,
      titleValid: false, // required
      locValid: true,
      imgUrlValid: true,
      linkValid: true,
      showAddForm: false
    };
  }

  addItem() {
    const body = {
      'year': document.getElementById('item_year').value,
      'title': document.getElementById('item_title').value,
      'lang': document.getElementById('item_lang').value,
      'desc': document.getElementById('item_desc').value,
      'platform': document.getElementById('item_platform').value,
      'loc': document.getElementById('item_loc').value,
      'imgUrl': document.getElementById('item_imgUrl').value,
      'link': document.getElementById('item_link').value
    };

    if (!body) {
      console.log('action for empty form');
    } else {
      document.getElementById('add_item_form').reset();
      PortfolioActions.addItem(body);
    }
  }

  validateField(fieldName, value) {
    var valid = true;
    switch(fieldName) {
    case 'title':
      valid = (value.length > 0);
      this.setState({titleValid: valid});
      break;
    case 'year':
      valid = !(isNaN(value) || value < 0);
      this.setState({yearValid: valid});
      break;
    case 'loc':
      valid = !(isNaN(value) || value < 0);
      this.setState({locValid: valid});
      break;
    case 'imgUrl':
      valid = this.validImgUri(value);
      this.setState({imgUrlValid: valid});
      break;
    case 'link':
      valid = this.validUri(value);
      this.setState({linkValid: valid});
      break;
    default:
      break;
    }
  }

  validImgUri(str) {
    var pattern = new RegExp(/^(http|ftp):\/\/.*\..{2,}\/.*/);
    return pattern.test(str);
  }

  validUri(str) {
    var pattern = new RegExp(/^(http|ftp):\/\/.*\..{2,}/);
    return pattern.test(str);
  }

  toggleAddForm = ()  => {
    var show = false;
    if (!this.state.showAddForm) {
      show = true;
    }
    this.setState({showAddForm: show});
  }

  handleUserInput = name => event => {
    this.setState({[name]: event.target.value}, () => {
      this.validateField(name, event.target.value);
    });
  }

  hasError(isValid) {
    return(isValid ? '' : 'invalid-value');
  }

  showForm(val) {
    return(val ? 'dropdown show' : 'dropdown hide');
  }

  render() {
    const {
      year,
      title,
      loc,
      imgUrl,
      link,
      yearValid,
      titleValid,
      locValid,
      imgUrlValid,
      linkValid,
      showAddForm } = this.state;
    const isEnabled = titleValid && yearValid;

    return (
      <div className='add-item'>
        <div className='dropdown-trigger' onClick={this.toggleAddForm}>
          Add Item
        </div>

        <div className={this.showForm(showAddForm)}>
          <form id='add_item_form' className="formGroup">
            <div className='leftcell'>
              Title:
            </div>
            <div className='rightcell'>
              <input
                id='item_title'
                type='text'
                value={title}
                className={this.hasError(titleValid)}
                onChange={this.handleUserInput('title')} />
            </div>
            <div className='leftcell'>
              Year:
            </div>
            <div className='rightcell'>
              <input
                id='item_year'
                type='text'
                value={year}
                className={this.hasError(yearValid)}
                onChange={this.handleUserInput('year')} />
            </div>
            <div className='leftcell'>
              Description:
            </div>
            <div className='rightcell'>
              <input id='item_desc' type='text' />
            </div>
            <div className='leftcell'>
              Platform:
            </div>
            <div className='rightcell'>
              <input id='item_platform' type='text' />
            </div>
            <div className='leftcell'>
              Language:
            </div>
            <div className='rightcell'>
              <input id='item_lang' type='text' />
            </div>
            <div className='leftcell'>
              Lines of code:
            </div>
            <div className='rightcell'>
              <input
                id='item_loc'
                type='text'
                value={loc}
                className={this.hasError(locValid)}
                onChange={this.handleUserInput('loc')} />
            </div>
            <div className='leftcell'>
              Image url:
            </div>
            <div className='rightcell'>
              <input
                id='item_imgUrl'
                type='text'
                value={imgUrl}
                className={this.hasError(imgUrlValid)}
                onChange={this.handleUserInput('imgUrl')} />
            </div>
            <div className='leftcell'>
              Link:
            </div>
            <div className='rightcell'>
              <input
                id='item_link'
                type='text'
                value={link}
                className={this.hasError(linkValid)}
                onChange={this.handleUserInput('link')} />
            </div>
          </form>
          <button disabled={!isEnabled} onClick={this.addItem}>Add item</button>
        </div>
      </div>
    );
  }
}

export default AddItem;
