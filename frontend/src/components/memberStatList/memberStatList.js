import React, { Component } from 'react';
import { List, Segment, Header, Accordion, Icon } from 'semantic-ui-react';

class MemberStatList extends Component {
  state = {
    memberStatList: this.props.member_summary,
    showModal: false,
    loading: true,
    error: false,
    errorMessage: '',
    activeIndex: -1
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Segment inverted>
        <Header as="h1">Member Stats</Header>
        <Accordion styled>
          {this.state.memberStatList.map((memberStat, index) => (
            <div>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                {memberStat.username}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <List>
                  <List.Item>
                    <List.Description>
                      Commits : {memberStat.commit_count}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Commit line modified : {memberStat.commit_lines}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Trello cards assigned : {memberStat.card_assigned}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Trello cards completed : {memberStat.card_completed}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Task completion : {memberStat.task_percentage.toFixed(2)}%
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Meeting attended : {memberStat.meeting_attended}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Meeting percentage :{' '}
                      {memberStat.meeting_percentage.toFixed(2)}%
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Code reviews : {memberStat.review_count}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Code review lines of code : {memberStat.reviews_lines}
                    </List.Description>
                  </List.Item>
                </List>
              </Accordion.Content>
            </div>
          ))}
        </Accordion>
      </Segment>
    );
  }
}
export default MemberStatList;
