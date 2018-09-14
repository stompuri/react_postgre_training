import React, { Component } from 'react';
import '../../css/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import List from './List';
import About from './About';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Route path="/" component={Header} />
          </div>
          <div className="list_container">
            <Route path="/list" component={List} />
          </div>
          <div className="about_container">
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
