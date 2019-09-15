import React, { Component } from 'react';
import {
  Form,
  Input,
  Modal,
  Button,
  Message,
  Dimmer,
  Header,
  Icon
} from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import _ from 'lodash';
import ProjectAPI from '../../services/project/index';
import moment from 'moment';
class SprintForm extends Component {
  state = {
    project_name: this.props.project_name,
    sprint_number: this.props.current_sprint + 1,
    task_point: 100,
    meeting_point: 50,
    commit_point: 1,
    review_point: 10,
    datesRange: '',
    start_date: '',
    end_date: '',
    loading: false,
    error: false,
    errorMessage: '',
    submitted: false,
    redirect: false
  };
  componentDidMount() {
    console.log(Number.isInteger(''));
  }

  handleDateChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      console.log(value);
      this.setState({ [name]: value });
    }
  };

  handleChange = (e, { name, value }) =>
    this.setState({ [name]: parseInt(value) });

  handleSubmit = () => {
    console.log('submit');
    this.setState({
      loading: true,
      error: false
    });
    const { datesRange } = this.state;

    if (_.size(datesRange) < 23) {
      console.log('error');
      this.setState({
        loading: false,
        error: true,
        errorMessage: 'Invalid sprint date range'
      });
    } else {
      if (
        Number.isInteger(this.state.task_point) &&
        Number.isInteger(this.state.meeting_point) &&
        Number.isInteger(this.state.commit_point) &&
        Number.isInteger(this.state.review_point)
      ) {
        console.log('pass');
        const splitDate = datesRange.split(' - ');
        this.setState({
          start_date: moment(splitDate[0], 'DD-MM-YYYY').format('YYYY-MM-DD'),
          end_date: moment(splitDate[1], 'DD-MM-YYYY').format('YYYY-MM-DD')
        });
        const form = {
          project_name: this.state.project_name,
          sprint_number: this.state.sprint_number,
          start_date: moment(splitDate[0], 'DD-MM-YYYY').format('YYYY-MM-DD'),
          end_date: moment(splitDate[1], 'DD-MM-YYYY').format('YYYY-MM-DD'),
          task_point: this.state.task_point,
          meeting_point: this.state.meeting_point,
          commit_point: this.state.commit_point,
          review_point: this.state.review_point,
          owner: this.props.owner
        };
        console.log(form);
        ProjectAPI.addSprint(
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
      } else {
        console.log('error');
        this.setState({
          loading: false,
          error: true,
          errorMessage: 'Invalid point input'
        });
      }
    }
  };

  render() {
    return (
      <Modal
        open={this.props.showModal}
        onClose={this.props.onClose}
        size={'tiny'}
        dimmer={'blurring'}
        closeIcon
      >
        <Modal.Header>Create Sprint</Modal.Header>
        <Modal.Content>
          {this.props.create === false ? (
            <Dimmer active>
              <Header as="h2" icon inverted>
                <Icon name="x" />
                There is an ongoing sprint!
              </Header>
            </Dimmer>
          ) : null}
          <Form onSubmit={this.handleSubmit} error={this.state.error}>
            <Form.Field
              control={Input}
              name="project_name"
              label="Sprint Number"
              value={this.state.sprint_number}
            />
            <DatesRangeInput
              label="Sprint Date Range"
              name="datesRange"
              placeholder="From - To"
              value={this.state.datesRange}
              iconPosition="left"
              onChange={this.handleDateChange}
              clearable
            />
            <Form.Field
              control={Input}
              name="task_point"
              label="Task point"
              value={this.state.task_point}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              name="meeting_point"
              label="Meeting Point"
              value={this.state.meeting_point}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              name="commit_point"
              label="Commit Point"
              value={this.state.commit_point}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              name="review_point"
              label="Review Point"
              value={this.state.review_point}
              onChange={this.handleChange}
            />
            <Message
              error
              header="Invalid Form"
              content={this.state.errorMessage}
            />
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}
export default SprintForm;
