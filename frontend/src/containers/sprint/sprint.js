import React, { Component } from 'react';
import _ from 'lodash';
import {
  Dimmer,
  Loader,
  Header,
  Segment,
  Grid,
  Button
} from 'semantic-ui-react';
import AttendanceCalendar from '../../components/attendanceCalendar/attendanceCalendar';
import ProjectAPI from '../../services/project/index';
import './sprint.css';
import moment from 'moment';

import Leaderboard from '../../components/leaderboard/Leaderboard';
import MemberStatList from '../../components/memberStatList/memberStatList';

class Sprint extends Component {
  state = {
    loading: true,
    error: false,
    sprint: {},
    project_name: this.props.match.params.project_name,
    sprint_number: this.props.match.params.sprint_number
  };
  componentDidMount() {
    const data = {
      project_name: this.state.project_name,
      sprint_number: this.state.sprint_number
    };
    ProjectAPI.getSprintData(
      data,
      response => {
        var rank_count = 1;
        response.member_summary = _.sortBy(response.member_summary, [
          'total_points'
        ]).reverse();
        for (var i = 0; i < response.member_summary.length; i++) {
          if (
            i > 0 &&
            response.member_summary[i].total_points <
              response.member_summary[i - 1].total_points
          ) {
            rank_count++;
          }
          response.member_summary[i].ranking = rank_count;
        }
        console.log(response);

        this.setState({
          loading: false,
          sprint: response
        });
      },
      error => {}
    );
  }

  handleFinalizeSprint = () => {
    console.log('submit');
    this.setState({
      loading: true,
      error: false
    });
    const form = {
      project_name: this.state.project_name,
      sprint_number: this.state.sprint_number,
      member_summary: this.state.sprint.member_summary
    };
    console.log(form);
    ProjectAPI.finalizeSprint(
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
  };

  render() {
    if (this.state.loading) {
      return (
        <Dimmer active={this.state.loading}>
          <Loader active={this.state.loading} />
        </Dimmer>
      );
    } else {
      const props = this.props;
      const sprint = this.state.sprint;
      return (
        <div className="sprint">
          <Segment inverted>
            <Header as="h1" inverted textAlign="center">
              Project {sprint.sprint_data.project_name} / Sprint{' '}
              {sprint.sprint_data.sprint_number}
              <Segment inverted>
                {sprint.sprint_data.status !== 'closed' ? (
                  <Button negative onClick={this.handleFinalizeSprint}>
                    Finalize Sprint
                  </Button>
                ) : null}
              </Segment>
            </Header>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Header as="h2" inverted>
                    Sprint Info
                  </Header>
                  <Header as="h3" inverted>
                    Status
                    <Header.Subheader>
                      {sprint.sprint_data.status}
                    </Header.Subheader>
                  </Header>
                  <Header as="h3" inverted>
                    Start Date
                    <Header.Subheader>
                      {moment(sprint.sprint_data.start_date).format(
                        'dddd, MMMM Do YYYY'
                      )}
                    </Header.Subheader>
                  </Header>
                  <Header as="h3" inverted>
                    End Date
                    <Header.Subheader>
                      {moment(sprint.sprint_data.end_date).format(
                        'dddd, MMMM Do YYYY'
                      )}
                    </Header.Subheader>
                  </Header>
                  <Header as="h3" inverted>
                    Meeting Point Variable
                    <Header.Subheader>
                      {sprint.sprint_data.meeting_point}
                    </Header.Subheader>
                  </Header>
                  <Header as="h3" inverted>
                    Task Point Variable
                    <Header.Subheader>
                      {sprint.sprint_data.task_point}
                    </Header.Subheader>
                  </Header>
                  <Header as="h3" inverted>
                    Commit Point Variable
                    <Header.Subheader>
                      {sprint.sprint_data.commit_point}
                    </Header.Subheader>
                  </Header>
                  <Header as="h3" inverted>
                    Review Point Variable
                    <Header.Subheader>
                      {sprint.sprint_data.review_point}
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <AttendanceCalendar
                    {...props}
                    start_date={sprint.sprint_data.start_date}
                    end_date={sprint.sprint_data.end_date}
                    project_name={sprint.sprint_data.project_name}
                    sprint_number={sprint.sprint_data.sprint_number}
                    sprint_workday={sprint.sprint_workday}
                    members={sprint.members}
                    status={sprint.sprint_data.status}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <MemberStatList member_summary={sprint.member_summary} />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Leaderboard data={sprint.member_summary} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      );
    }
  }
}
export default Sprint;
