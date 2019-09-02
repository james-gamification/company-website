import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment';
import CalendarForm from '../calendarModal/calendarModal';

class AttendanceCalendar extends Component {
  state = {
    project_name: this.props.project_name,
    sprint_number: this.props.sprint_number,
    start_date: moment(this.props.start_date).format(),
    end_date: moment(this.props.end_date).format(),
    date: moment(this.props.start_date).format('YYYY-MM-DD'),
    showModal: false,
    loading: false,
    error: false,
    errorMessage: '',
    submitted: false,
    redirect: false
  };
  componentDidMount() {}
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value, showModal: !this.state.showModal });
    }
  };

  handleCloseModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    var workdays = this.props.sprint_workday.map(workday => {
      return moment(workday.date).format();
    });
    return (
      <div>
        {this.state.showModal === true ? (
          <CalendarForm
            onClose={this.handleCloseModal}
            showModal={this.state.showModal}
            date={this.state.date}
            project_name={this.props.project_name}
            sprint_number={this.props.sprint_number}
            members={this.props.members}
            status={this.props.status}
            workday={this.props.sprint_workday.find(
              workday =>
                this.state.date === moment(workday.date).format('YYYY-MM-DD')
            )}
          />
        ) : null}
        <Header inverted textAlign="center">
          Sprint Calendar
        </Header>
        <Form>
          <DateInput
            inline
            name="date"
            dateFormat="YYYY-MM-DD"
            marked={workdays}
            markColor="blue"
            value={this.state.date}
            onChange={this.handleChange}
            minDate={this.state.start_date}
            maxDate={this.state.end_date}
            clearable
          />
        </Form>
      </div>
    );
  }
}
export default AttendanceCalendar;
