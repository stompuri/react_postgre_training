import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import LoginStore from './stores/LoginStore';
import '../css/App.css';
import Header from './components/Header';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import About from './pages/About';

class App extends Component {
  constructor() {
    super();

    this.state = {
      LoggedIn: LoginStore.isLoggedIn()
    };

    LoginStore.on('change', () => {
      console.log("Got change event from LoginStore");
      this.setState({
        LoggedIn: LoginStore.isLoggedIn()
      });
    });
  }

  pageShell(Page) {
    return (props) => {
      console.log(this.state.LoggedIn);
      return (
      <div className="page">
        <CSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.match.path === '/about' ? 'SlideIn' : 'SlideOut'}>
          <Page LoggedIn={this.state.LoggedIn} {...props} />
        </CSSTransitionGroup>
      </div>
    )};
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route path="/" component={Header} />
          <Route path="/about" exact component={this.pageShell(About)}></Route>
          <Route path="/contact" exact component={this.pageShell(Contact)}></Route>
          <Route path="/portfolio" exact component={this.pageShell(Portfolio)}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
