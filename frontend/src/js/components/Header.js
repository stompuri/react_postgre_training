import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/App.css';
import '../../css/Header.css';
import AddItem from './AddItem';
import RemoveItem from './RemoveItem';

class Header extends Component {
  render() {
    const currentPath = window.location.pathname;

    return (
      <div className='header'>
        <h1>List with PostgreSQL</h1>
        <AddItem />
        <RemoveItem />

        <div className='navi'>
          { !currentPath.includes('about') &&
            <div className='navi_item'>
              <br />
              <Link to='/about'><button>About</button></Link>
            </div>
          }

          { currentPath.includes('about') &&
            <div className='navi_item'>
              <br />
              <Link to='/about'><button disabled>About</button></Link>
            </div>
          }

          { !currentPath.includes('contact') &&
            <div className='navi_item'>
              <br />
              <Link to='/contact'><button>Contact</button></Link>
            </div>
          }

          { currentPath.includes('contact') &&
            <div className='navi_item'>
              <br />
              <Link to='/contact'><button disabled>Contact</button></Link>
            </div>
          }

          { !currentPath.includes('portfolio') &&
            <div className='navi_item'>
              <br />
              <Link to='/portfolio'><button>Portfolio</button></Link>
            </div>
          }
          { currentPath.includes('portfolio') &&
            <div className='navi_item'>
              <br />
              <Link to='/portfolio'><button disabled>Portfolio</button></Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Header;
