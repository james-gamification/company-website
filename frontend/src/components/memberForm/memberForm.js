import React, { Component } from 'react';
import {
  Form,
  Input,
  Modal,
  Button,
  Message,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ProjectAPI from '../../services/project/index';

class MemberForm extends Component {
  state = {
    username: '',
    loading: false,
    error: false,
    errorMessage: '',
    submitted: false,
    redirect: false
  };
  componentDidMount() {}
  handleChange = e => this.setState({ username: e.target.value });

  handleSubmit = () => {
    console.log('submit');
    this.setState({
      loading: true,
      error: false
    });
    const { username } = this.state;

    if (username === '') {
      console.log('error');
      this.setState({
        loading: false,
        error: true,
        errorMessage: 'Username must not be empty'
      });
    } else {
      console.log('pass');
      const form = {
        username: this.state.username,
        project_name: this.props.projectName
      };
      ProjectAPI.addMember(
        form,
        data => {
          this.setState({ loading: false, submitted: true });
          if (data === 'SUCCESS') {
            window.location.reload();
          } else if (data === 'SQL ERROR 1062') {
            this.setState({
              error: true,
              errorMessage: 'User already a member of this project'
            });
          } else if (data === 'SQL ERROR 1452') {
            this.setState({
              error: true,
              errorMessage: 'There is no user with the inputted username'
            });
          }
        },
        error => {
          this.setState({ loading: false, error: true, errorMessage: error });
        }
      );
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <Modal
          open={this.props.showModal}
          onClose={this.props.onClose}
          size={'tiny'}
          closeIcon
        >
          <Dimmer active={this.state.loading}>
            <Loader active={this.state.loading} />
          </Dimmer>
          <Modal.Header>Add Member</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit} error={this.state.error}>
              <Form.Field
                control={Input}
                name="username"
                label="Username"
                placeholder="username"
                onChange={e => this.handleChange(e)}
              />
              <Message error header="Error" content={this.state.errorMessage} />
              <Form.Field control={Button}>Submit</Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      );
    }
  }
}
export default MemberForm;
