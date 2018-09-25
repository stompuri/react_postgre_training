import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import '../../css/App.css';
import '../../css/header.css';

class Header extends Component {
  render() {
    const currentPath = window.location.pathname;
    const about = currentPath.includes('about');
    const contact = currentPath.includes('contact');
    const portfolio = currentPath.includes('portfolio');

    return (
      <div className='view-container header'>
        <h3>
          <p className="small">SW Developer</p>
          Seppo Tompuri
        </h3>

        <div className='navi'>
          <div className='navi_item'>
            <Link to='/about'><button disabled={about}>About</button></Link>
          </div>
          <div className='navi_item'>
            <Link to='/contact'><button disabled={contact}>Contact</button></Link>
          </div>
          <div className='navi_item'>
            <Link to='/portfolio'><button disabled={portfolio}>Portfolio</button></Link>
          </div>
        </div>

        <Login />
      </div>
    );
  }
}

export default Header;
