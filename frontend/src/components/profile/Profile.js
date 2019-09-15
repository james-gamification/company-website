import React, { Component } from 'react';
import { Segment, Image, Header, Divider, Icon, List } from 'semantic-ui-react';
import './Profile.css';

const profileData = {
  name: 'John',
  username: 'john1992',
  github: 'https://github.com/john1992',
  trello: 'https://trello.com/john1992'
};
class Profile extends Component {
  render() {
    return (
      <div>
        <div class="profile-title">
          <Segment inverted>
            <Header as="h1">{profileData.name}</Header>
          </Segment>
        </div>
        <div>
          <div class="profile">
            <Segment inverted>
              <Image
                src="https://react.semantic-ui.com/images/avatar/small/matthew.png"
                size="small"
                centered
              />
              <Divider horizontal>
                <Header as="h4" color="grey">
                  Information
                </Header>
              </Divider>
            </Segment>
            <Segment inverted textAlign="center">
              <div>
                <div class="profile-info">
                  <List centered size="large">
                    <List.Item icon="user" content={profileData.username} />

                    <List.Item
                      icon="github"
                      content={
                        <a href={profileData.github}>{profileData.github}</a>
                      }
                    />
                    <List.Item
                      icon="trello"
                      content={
                        <a href={profileData.trello}>{profileData.trello}</a>
                      }
                    />
                  </List>
                </div>
                <div class="sprint-points">
                  <Header as="h2" icon inverted centered>
                    <Icon name="undo" color="blue" />
                    <Header.Subheader>Sprint Points</Header.Subheader>
                    100
                  </Header>
                </div>
                <div class="total-points">
                  <Header as="h2" icon inverted centered>
                    <Icon name="trophy" color="yellow" />
                    <Header.Subheader>Total Points</Header.Subheader>
                    172
                  </Header>
                </div>
              </div>
            </Segment>
            <Divider horizontal>
              <Header as="h4" color="grey">
                Badges
              </Header>
            </Divider>
            <div class="profile-title">
              <Segment inverted>
                <Header as="h3">You have no badges</Header>
              </Segment>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
