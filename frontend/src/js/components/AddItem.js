import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/portfolio.css';
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
    this.toggleAddForm = this.toggleAddForm.bind(this);
  }

  toggleAddForm() {
    var show = false;
    if (!this.state.showAddForm) {
      show = true;
    }
    this.setState({showAddForm: show});
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => {
      this.validateField(name, value);
    });
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

  hasError(isValid) {
    return(isValid ? '' : 'invalid-value');
  }
  
  showForm(val) {
    return(val ? '' : 'hide');
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
      <div className='container'>
        { showAddForm &&
          <div className='dropdown' onClick={this.toggleAddForm}>
            Hide Add Form
          </div>
        }
        { !showAddForm &&
          <div className='dropdown' onClick={this.toggleAddForm}>
            Show Add Form
          </div>
        }

        <div className={this.showForm(showAddForm)}>
          <form id='add_item_form' className="formGroup">
            <div className='leftcell'>
              Title:
            </div>
            <div className='rightcell'>
              <input
                id='item_title'
                name='title'
                type='text'
                value={title}
                className={this.hasError(titleValid)}
                onChange={(event) => this.handleUserInput(event)} />
            </div>
            <div className='leftcell'>
              Year:
            </div>
            <div className='rightcell'>
              <input
                id='item_year'
                name='year'
                type='text'
                value={year}
                className={this.hasError(yearValid)}
                onChange={(event) => this.handleUserInput(event)} />
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
                name='loc'
                type='text'
                value={loc}
                className={this.hasError(locValid)}
                onChange={(event) => this.handleUserInput(event)} />
            </div>
            <div className='leftcell'>
              Image url:
            </div>
            <div className='rightcell'>
              <input
                id='item_imgUrl'
                name='imgUrl'
                type='text'
                value={imgUrl}
                className={this.hasError(imgUrlValid)}
                onChange={(event) => this.handleUserInput(event)} />
            </div>
            <div className='leftcell'>
              Link:
            </div>
            <div className='rightcell'>
              <input
                id='item_link'
                name='link'
                type='text'
                value={link}
                className={this.hasError(linkValid)}
                onChange={(event) => this.handleUserInput(event)} />
            </div>
          </form>
          <button disabled={!isEnabled} onClick={this.addItem}>Add item</button>
        </div>
      </div>
    );
  }
}

export default AddItem;
