import React, { Component } from 'react';
import {
  Form,
  Modal,
  Button,
  Message,
  Dimmer,
  Loader,
  Segment,
  Header
} from 'semantic-ui-react';
import _ from 'lodash';
import ProjectAPI from '../../services/project/index';

class CalendarForm extends Component {
  state = {
    workday: false,
    meeting: JSON.parse(
      '{' +
        this.props.members.map(member => {
          return '"' + member.username + '":false';
        }) +
        '}'
    ),
    mode: 'add',
    loading: false,
    error: false,
    errorMessage: '',
    submitted: false,
    redirect: false
  };
  componentDidMount() {
    if (this.props.workday !== '') {
      this.setState({
        workday: true,
        mode: 'edit'
      });
      var meeting = this.state.meeting;
      this.props.workday.data.meeting.forEach(username => {
        meeting[username] = true;
      });
      this.setState({
        meeting: meeting
      });
    }
  }
  handleChange = e => this.setState({ workday: !this.state.workday });

  handleChangeMeeting = (e, username) => {
    console.log(username);
    this.setState({
      meeting: {
        ...this.state.meeting,
        [username]: !this.state.meeting[username]
      }
    });
  };

  handleSubmit = () => {
    console.log('submit');
    this.setState({
      loading: true,
      error: false
    });
    var data = { meeting: [] };
    _.forEach(this.state.meeting, function(value, key) {
      console.log(key + ' : ' + value);
      if (value === true) {
        data.meeting.push(key);
      }
    });
    var form = {
      project_name: this.props.project_name,
      sprint_number: this.props.sprint_number,
      date: this.props.date,
      data: data
    };
    if (this.state.mode === 'add') {
      ProjectAPI.addWorkday(
        form,
        success => {
          console.log(success);
          this.setState({
            loading: false
          });
          window.location.reload();
        },
        error => {}
      );
    } else if (this.state.mode === 'edit') {
      ProjectAPI.editWorkday(
        form,
        success => {
          console.log(success);
          this.setState({
            loading: false
          });
          window.location.reload();
        },
        error => {}
      );
    }

    console.log(data);
  };

  render() {
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
        <Modal.Header>{this.props.date}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} error={this.state.error}>
            {!this.state.workday && this.props.status === 'closed' ? (
              <Header>This day is not a workday</Header>
            ) : this.state.mode === 'add' ? (
              <Form.Checkbox
                name="workday"
                label="Mark this date as a workday"
                onChange={this.handleChange}
                checked={this.state.workday}
              />
            ) : (
              ''
            )}

            <Header>Scrum Meeting</Header>
            <Segment disabled={!this.state.workday}>
              {this.props.members.map(member => {
                return (
                  <Form.Checkbox
                    name={member.username}
                    label={member.username}
                    disabled={!this.state.workday}
                    checked={this.state.meeting[member.username]}
                    onChange={
                      this.props.status !== 'closed'
                        ? e => this.handleChangeMeeting(e, member.username)
                        : null
                    }
                  />
                );
              })}
            </Segment>
            <Message error header="Error" content={this.state.errorMessage} />
            {this.props.status !== 'closed' ? (
              <Form.Field
                control={Button}
                disabled={!this.state.workday}
                positive
              >
                Submit
              </Form.Field>
            ) : null}
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

CalendarForm.defaultProps = {
  workday: ''
};

export default CalendarForm;
