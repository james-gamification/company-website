import React, { Component } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import { callback } from '../../services/github/auth.js';
import { Redirect } from 'react-router-dom';

class CallbackGithub extends Component {
  state = {
    loading: true,
    error: false,
    errorMessage: '',
    redirect: false
  };
  componentDidMount() {
    callback(
      success => {
        this.setState({
          redirect: true,
          loading: false
        });
      },
      error => {}
    );
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <Segment inverted>
          <Dimmer active={this.state.loading}>
            <Loader active={this.state.loading} />
          </Dimmer>
        </Segment>
      );
    }
  }
}
export default CallbackGithub;
