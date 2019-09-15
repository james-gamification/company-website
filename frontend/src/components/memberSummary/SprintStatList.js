import React, { Component } from 'react';
import { List, Segment, Header, Accordion, Icon } from 'semantic-ui-react';

class SprintStatList extends Component {
  state = {
    sprintStatList: this.props.data,
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
      <Segment>
        <Header as="h1">Sprint Stats</Header>
        <Accordion styled>
          {this.state.sprintStatList.map((sprintStat, index) => (
            <div>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                Sprint {sprintStat.sprint_number}
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <List>
                  <List.Item>
                    <List.Description>
                      Commits : {sprintStat.commit_count}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Commit line modified : {sprintStat.commit_lines}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Trello cards assigned : {sprintStat.card_assigned}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Trello cards completed : {sprintStat.card_completed}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Task completion : {sprintStat.task_percentage.toFixed(2)}%
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Meeting attended : {sprintStat.meeting_attended}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Meeting percentage :{' '}
                      {sprintStat.meeting_percentage.toFixed(2)}%
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Code reviews : {sprintStat.review_count}
                    </List.Description>
                  </List.Item>
                  <List.Item>
                    <List.Description>
                      Code review lines of code : {sprintStat.review_lines}
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
export default SprintStatList;
