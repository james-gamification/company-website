import React, { Component } from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import Signup from './components/signup/Signup.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: !!window.localStorage.api_key,
      message: ''
    };
  }
  componentDidMount() {
    this.authenticate();
  }

  onUnauthorized = () => {
    this.setState({ message: 'Unathorized access.' });
  };

  onAuthorized = () => {
    this.setState({
      auth: true
    });
  };

  authenticate = status => {
    if (status) {
      this.onAuthorized();
    } else if (window.localStorage.getItem('api_key')) {
      this.onAuthorized();
    } else {
      this.onUnauthorized();
    }
  };

  render() {
    if (this.state.auth) {
      return <Nav />;
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/"
              render={props => (
                <Login {...props} authenticate={this.authenticate} />
              )}
            />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
