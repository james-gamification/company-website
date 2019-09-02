import React, { Component } from 'react';
import {
  List,
  Segment,
  Header,
  Dimmer,
  Loader,
  Button,
  Grid
} from 'semantic-ui-react';

import ProjectAPI from '../../services/project/index';
import MemberForm from '../memberForm/memberForm';
import MemberSummary from '../memberSummary/MemberSummary';

class MemberList extends Component {
  state = {
    memberList: [],
    showModal: false,
    showStat: false,
    loading: true,
    error: false,
    errorMessage: '',
    selectedUser: ''
  };

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    const data = { project_name: match.params.project_name };
    ProjectAPI.getProjectMembers(
      data,
      response => {
        this.setState({
          loading: false,
          memberList: response
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

  handleClickStat = username => {
    this.setState({
      showStat: !this.state.showStat,
      selectedUser: username
    });
  };

  handleCloseStat = () => {
    this.setState({
      showStat: !this.state.showStat
    });
  };

  render() {
    return (
      <Segment inverted>
        {this.state.showStat === true ? (
          <MemberSummary
            onClose={this.handleCloseStat}
            showModal={this.state.showStat}
            username={this.state.selectedUser}
            data={
              this.props.user_stats[this.state.selectedUser]
                ? this.props.user_stats[this.state.selectedUser]
                : ''
            }
          />
        ) : null}
        {this.state.showModal === true ? (
          <MemberForm
            onClose={this.handleCloseModal}
            showModal={this.state.showModal}
            projectName={this.props.match.params.project_name}
          />
        ) : null}
        <Dimmer active={this.state.loading}>
          <Loader active={this.state.loading} />
        </Dimmer>
        <Header as="h1">Members</Header>
        <Button positive onClick={this.handleClick}>
          Add Members
        </Button>
        <List divided relaxed inverted>
          {this.state.memberList.map(item => (
            <List.Item>
              <Grid columns={2}>
                <Grid.Column width={6}>
                  <List.Content>
                    <List.Header>{item.full_name}</List.Header>
                    <List.List>
                      <List.Item>
                        <List.Icon
                          name="user"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content>
                          <List.Header>{item.username}</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon
                          name="github"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content>
                          <List.Header
                            as="a"
                            href={'https://github.com/' + item.github_username}
                          >
                            {item.github_username}
                          </List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Icon
                          name="trello"
                          size="large"
                          verticalAlign="middle"
                        />
                        <List.Content>
                          <List.Header
                            as="a"
                            href={'https://trello.com/' + item.trello_username}
                          >
                            {item.trello_username}
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    </List.List>
                  </List.Content>
                </Grid.Column>
                <Grid.Column width={4} floated="right">
                  <Button
                    floated="right"
                    onClick={() => {
                      this.handleClickStat(item.username);
                    }}
                  >
                    View Stats
                  </Button>
                </Grid.Column>
              </Grid>
            </List.Item>
          ))}
        </List>
      </Segment>
    );
  }
}
export default MemberList;
