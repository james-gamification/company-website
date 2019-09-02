import React, { Component } from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { login } from '../../services/github/auth.js';

class SetupGithub extends Component {
  /*
/     Routes
*/
  render() {
    var setup = false;
    if (window.localStorage.getItem('github_username') === 'null') {
      setup = true;
    }
    if (setup) {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name="github" />
            Set up your Github account
          </Header>
          <Button
            primary
            onClick={() => {
              login();
            }}
          >
            Authenticate Github Account
          </Button>
        </Segment>
      );
    } else {
      return (
        <Segment placeholder inverted>
          <Header icon>
            <Icon name="github" />
            Github account has been set up
          </Header>
          <Header>{window.localStorage.getItem('github_username')}</Header>
        </Segment>
      );
    }
  }
}
export default SetupGithub;
