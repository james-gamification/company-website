import React, { Component } from 'react';
import {
  Form,
  Button,
  Message,
  Header,
  Grid,
  Segment
} from 'semantic-ui-react';
import './Login.css';
import Account from '../../services/login/index';

class Login extends Component {
  state = {
    full_name: '',
    username: '',
    password: '',
    confirmPassword: '',
    submittedName: '',
    submittedUsername: '',
    submittedPassword: '',
    loading: false,
    error: false,
    errorMessage: '',
    submitted: false
  };

  handleChange = (name, e) => this.setState({ [name]: e.target.value });

  handleSubmit = () => {
    this.setState({
      loading: true,
      error: false
    });
    const { username, password } = this.state;

    if (password === '' || username === '') {
      this.setState({
        loading: false,
        error: true,
        errorMessage: 'Username or Password must not be empty'
      });
    } else {
      this.setState({
        submittedUsername: username,
        submittedPassword: password
      });
      const form = {
        username: this.state.username,
        password: this.state.password
      };
      Account.login(
        form,
        data => {
          this.setState({ loading: false, submitted: true });
          this.props.authenticate(data);
        },
        error => {
          this.setState({ loading: false, error: true, errorMessage: error });
        }
      );
    }
  };

  render() {
    return (
      <div className="login">
        <Segment inverted>
          <Header as="h1" inverted>
            Login
          </Header>
          <Form
            onSubmit={this.handleSubmit}
            inverted
            loading={this.state.loading}
            error={this.state.error}
          >
            <Form.Field required>
              <label>Username</label>
              <input
                placeholder="Username"
                name="username"
                onChange={e => this.handleChange('username', e)}
              />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={e => this.handleChange('password', e)}
              />
            </Form.Field>
            <Message
              error
              header="Invalid Form"
              content={this.state.errorMessage}
            />
            <Grid>
              <Grid.Column width={4}>
                <Button type="submit">Login</Button>
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                <Header as="h4" textAlign="right" inverted>
                  <Header.Content as="a" href="/signup">
                    Sign Up
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid>
          </Form>
        </Segment>
      </div>
    );
  }
}
export default Login;
