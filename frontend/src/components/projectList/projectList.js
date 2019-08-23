import React, { Component } from 'react';
import {
  List,
  Segment,
  Header,
  Dimmer,
  Loader,
  Button
} from 'semantic-ui-react';

import ProjectAPI from '../../services/project/index';
import ProjectForm from '../projectForm/projectForm';
class ProjectList extends Component {
  state = {
    projectList: [],
    loading: true,
    showModal: false,
    error: false,
    errorMessage: ''
  };

  componentDidMount() {
    ProjectAPI.getProjects(
      response => {
        this.setState({
          loading: false,
          projectList: response
        });
      },
      error => {}
    );
  }
  handleClick = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    return (
      <Segment inverted>
        {this.state.showModal === true ? (
          <ProjectForm
            onClose={this.handleCloseModal}
            showModal={this.state.showModal}
          />
        ) : null}
        <Dimmer active={this.state.loading}>
          <Loader active={this.state.loading} />
        </Dimmer>
        <Header as="h1">Projects</Header>
        <Button positive onClick={this.handleClick}>
          Create Project
        </Button>
        <List divided relaxed inverted>
          {this.state.projectList.map(item => (
            <List.Item>
              <List.Icon name="file code" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header
                  as="a"
                  href={'/' + item.owner + '/' + item.project_name}
                >
                  {item.project_name}
                </List.Header>
                <List.Description as="a">Owner: {item.owner}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }
}
export default ProjectList;
