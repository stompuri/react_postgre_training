import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/App.css';
import AddItem from './AddItem';
import RemoveItem from './RemoveItem';
import NavigationStore from '../stores/NavigationStore';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      page: NavigationStore.getPage()
    }
  }

  componentWillMount() {
    NavigationStore.on("change", () => {
      this.setState({
        sample_list: NavigationStore.getPage()
      })
    })
  }

  render() {
    const currentPath = window.location.pathname;

    return (
      <div className="header">
        <h1>List with PostgreSQL</h1>
        <AddItem />
        <RemoveItem />

        <div className="navi">
        { !currentPath.includes('about') &&
          <div className="navi_item">
            <br />
            <Link to="/about"><button>About</button></Link>
          </div>
        }

        { currentPath.includes('about') &&
          <div className="navi_item">
            <br />
            <Link to="/about"><button disabled>About</button></Link>
          </div>
        }

        { !currentPath.includes('list') &&
          <div className="navi_item">
            <br />
            <Link to="/list"><button>List</button></Link>
          </div>
        }
        { currentPath.includes('list') &&
          <div className="navi_item">
            <br />
            <Link to="/list"><button disabled>List</button></Link>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default Header;
