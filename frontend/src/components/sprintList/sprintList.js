import React, { Component } from 'react';
import {
  List,
  Segment,
  Header,
  Dimmer,
  Loader,
  Button
} from 'semantic-ui-react';
import moment from 'moment';
import _ from 'lodash';

import ProjectAPI from '../../services/project/index';
import SprintForm from '../sprintForm/sprintForm';

class SprintList extends Component {
  state = {
    sprintList: [],
    showModal: false,
    loading: true,
    error: false,
    errorMessage: '',
    create: true
  };

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    const data = { project_name: match.params.project_name };
    ProjectAPI.getSprints(
      data,
      response => {
        const index = _.findIndex(response, [
          'sprint_number',
          this.props.current_sprint
        ]);
        if (index > -1) {
          if (response[index].status === 'open') {
            this.setState({
              create: false
            });
          }
        }
        this.setState({
          loading: false,
          sprintList: response
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
          <SprintForm
            onClose={this.handleCloseModal}
            showModal={this.state.showModal}
            current_sprint={this.props.current_sprint}
            project_name={this.props.match.params.project_name}
            owner={this.props.owner}
            create={this.state.create}
          />
        ) : null}
        <Dimmer active={this.state.loading}>
          <Loader active={this.state.loading} />
        </Dimmer>
        <Header as="h1">Sprints</Header>
        <Button positive onClick={this.handleClick}>
          Create Sprint
        </Button>
        <List divided relaxed inverted>
          {this.state.sprintList.map(item => (
            <List.Item>
              <List.Icon name="undo" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header
                  as="a"
                  href={
                    '/' +
                    this.props.match.params.username +
                    '/' +
                    this.props.match.params.project_name +
                    '/sprint/' +
                    item.sprint_number
                  }
                >
                  Sprint {item.sprint_number}
                </List.Header>
                <List.Description>
                  {moment(item.start_date).format('dddd, MMMM Do YYYY')} -{' '}
                  {moment(item.end_date).format('dddd, MMMM Do YYYY')}
                </List.Description>
                <List.Description>Status: {item.status}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }
}
export default SprintList;
